import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { access, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { basename, dirname, join, relative, resolve } from 'node:path'
import { promisify } from 'node:util'
import sharp from 'sharp'

const execFileAsync = promisify(execFile)
const repoRoot = process.cwd()
const defaultTargets = ['src/content/blog']
const tempRoot = join(repoRoot, 'node_modules', '.cache', 'mermaid-to-jpg')

const defaultConfig = {
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'base',
  themeVariables: {
    background: '#ffffff',
    mainBkg: '#f8fafc',
    secondBkg: '#eef2f7',
    tertiaryColor: '#e2e8f0',
    primaryColor: '#eaf4fb',
    primaryTextColor: '#0f172a',
    primaryBorderColor: '#5d879d',
    secondaryColor: '#f1f5f9',
    secondaryTextColor: '#0f172a',
    secondaryBorderColor: '#94a3b8',
    tertiaryTextColor: '#0f172a',
    tertiaryBorderColor: '#cbd5e1',
    lineColor: '#475569',
    textColor: '#0f172a',
    nodeTextColor: '#0f172a',
    clusterBkg: '#f8fafc',
    clusterBorder: '#cbd5e1',
    edgeLabelBackground: '#ffffff',
    fontFamily: 'Arial, Helvetica, sans-serif'
  }
}

const usage = `Usage:
  npm run mermaid:convert
  node scripts/convert-mermaid-to-jpg.mjs [paths...]

Options:
  --check      Fail if Mermaid code fences remain.
  --dry-run    Print planned conversions without writing files.
  --scale N    Puppeteer scale factor for the rendered PNG. Default: 2.

Environment:
  MERMAID_CHROME_PATH or PUPPETEER_EXECUTABLE_PATH can point to Chrome/Chromium.
`

const parseArgs = (argv) => {
  const options = {
    check: false,
    dryRun: false,
    scale: 2,
    targets: []
  }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--help' || arg === '-h') {
      console.log(usage)
      process.exit(0)
    } else if (arg === '--check') {
      options.check = true
    } else if (arg === '--dry-run') {
      options.dryRun = true
    } else if (arg === '--scale') {
      const value = Number(argv[index + 1])
      if (!Number.isFinite(value) || value <= 0) {
        throw new Error('--scale must be a positive number')
      }
      options.scale = value
      index += 1
    } else if (arg.startsWith('--')) {
      throw new Error(`Unknown option: ${arg}`)
    } else {
      options.targets.push(arg)
    }
  }

  if (options.targets.length === 0) options.targets = defaultTargets
  return options
}

const collectMarkdownFiles = async (target) => {
  const absolute = resolve(repoRoot, target)
  const entryStat = await stat(absolute)

  if (entryStat.isFile()) {
    return /\.(md|mdx)$/i.test(absolute) ? [absolute] : []
  }

  const entries = await readdir(absolute, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(absolute, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectMarkdownFiles(path)))
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      files.push(path)
    }
  }

  return files
}

const findMermaidFences = (markdown) => {
  const newline = markdown.includes('\r\n') ? '\r\n' : '\n'
  const lines = markdown.split(/\r?\n/)
  const fences = []
  let offset = 0

  for (let index = 0; index < lines.length; index += 1) {
    const lineStart = offset
    const line = lines[index]
    const opening = line.match(/^(```+|~~~+)mermaid(?:\s.*)?$/i)
    offset += line.length + (index === lines.length - 1 ? 0 : newline.length)
    if (!opening) continue

    const fence = opening[1]
    const start = lineStart
    const body = []
    let closeEnd = offset
    index += 1

    for (; index < lines.length; index += 1) {
      const current = lines[index]
      offset += current.length + (index === lines.length - 1 ? 0 : newline.length)
      if (current.trim() === fence) {
        closeEnd = offset
        break
      }
      body.push(current)
      closeEnd = offset
    }

    const source = body.join('\n').trim()
    if (source) fences.push({ start, end: closeEnd, source })
  }

  return fences
}

const sanitizeForMermaidCli = (source) =>
  source.replace(/\|([^|\n]*\([^|\n]*\)[^|\n]*)\|/g, (_, label) => {
    const cleaned = label.replace(/[()]/g, ' ').replace(/\s+/g, ' ').trim()
    return `|${cleaned}|`
  })

const pathExists = async (path) => {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

const findChrome = async () => {
  const explicit = process.env.MERMAID_CHROME_PATH || process.env.PUPPETEER_EXECUTABLE_PATH
  if (explicit && existsSync(explicit)) return explicit

  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/snap/bin/chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ]

  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate
  }

  const cacheRoot = join(homedir(), '.cache', 'puppeteer', 'chrome-headless-shell')
  if (!(await pathExists(cacheRoot))) return undefined

  const matches = []
  const walk = async (dir) => {
    const entries = await readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        await walk(path)
      } else if (entry.name === 'chrome-headless-shell' || entry.name === 'chrome-headless-shell.exe') {
        matches.push(path)
      }
    }
  }

  await walk(cacheRoot)
  matches.sort()
  return matches.at(-1)
}

const nextDiagramNumber = async (attDir) => {
  if (!(await pathExists(attDir))) return 1
  const entries = await readdir(attDir)
  const numbers = entries
    .map((entry) => entry.match(/^diagram-(\d+)\.jpg$/i)?.[1])
    .filter(Boolean)
    .map(Number)

  return numbers.length ? Math.max(...numbers) + 1 : 1
}

const renderMermaidToJpg = async ({ source, outputPath, baseName, scale, chromePath }) => {
  const inputPath = join(tempRoot, `${baseName}.mmd`)
  const configPath = join(tempRoot, `${baseName}.json`)
  const puppeteerConfigPath = join(tempRoot, `${baseName}.puppeteer.json`)
  const pngPath = join(tempRoot, `${baseName}.png`)

  await writeFile(configPath, `${JSON.stringify(defaultConfig, null, 2)}\n`)

  const npmArgs = [
    'exec',
    '--yes',
    '--package=@mermaid-js/mermaid-cli',
    '--',
    'mmdc',
    '--input',
    inputPath,
    '--output',
    pngPath,
    '--outputFormat',
    'png',
    '--configFile',
    configPath,
    '--backgroundColor',
    'white',
    '--scale',
    String(scale),
    '--quiet'
  ]

  if (chromePath) {
    await writeFile(
      puppeteerConfigPath,
      `${JSON.stringify({ executablePath: chromePath, args: ['--no-sandbox'] }, null, 2)}\n`
    )
    npmArgs.push('--puppeteerConfigFile', puppeteerConfigPath)
  }

  let lastError
  for (const candidate of [source, sanitizeForMermaidCli(source)]) {
    await writeFile(inputPath, `${candidate.trim()}\n`)
    try {
      await execFileAsync('npm', npmArgs, {
        cwd: repoRoot,
        maxBuffer: 1024 * 1024 * 16
      })
      await sharp(pngPath)
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 92, mozjpeg: true })
        .toFile(outputPath)
      return
    } catch (error) {
      lastError = error
    }
  }

  throw lastError
}

const main = async () => {
  const options = parseArgs(process.argv.slice(2))
  const markdownFiles = (await Promise.all(options.targets.map(collectMarkdownFiles))).flat().sort()
  const filesWithFences = []

  for (const file of markdownFiles) {
    const markdown = await readFile(file, 'utf8')
    const fences = findMermaidFences(markdown)
    if (fences.length) filesWithFences.push({ file, markdown, fences })
  }

  if (!filesWithFences.length) {
    console.log('No Mermaid code fences found.')
    return
  }

  if (options.check) {
    for (const { file, fences } of filesWithFences) {
      console.error(`${relative(repoRoot, file)}: ${fences.length} Mermaid fence(s)`)
    }
    process.exitCode = 1
    return
  }

  if (options.dryRun) {
    for (const { file, fences } of filesWithFences) {
      console.log(`${relative(repoRoot, file)}: would convert ${fences.length} Mermaid fence(s)`)
    }
    return
  }

  const chromePath = await findChrome()
  if (chromePath) {
    console.log(`Using browser: ${chromePath}`)
  } else {
    console.warn('No local Chrome/Chromium path found; Mermaid CLI will try its default browser lookup.')
  }

  await rm(tempRoot, { force: true, recursive: true })
  await mkdir(tempRoot, { recursive: true })

  let converted = 0
  try {
    for (const { file, markdown, fences } of filesWithFences) {
      const postDir = dirname(file)
      const attDir = join(postDir, 'att')
      await mkdir(attDir, { recursive: true })

      let nextNumber = await nextDiagramNumber(attDir)
      const replacements = []

      for (const fence of fences) {
        const labelNumber = String(nextNumber).padStart(2, '0')
        const imageName = `diagram-${labelNumber}.jpg`
        const outputPath = join(attDir, imageName)
        const baseName = `${basename(postDir).replace(/[^a-z0-9]+/gi, '-') || 'diagram'}-${labelNumber}`

        await renderMermaidToJpg({
          source: fence.source,
          outputPath,
          baseName,
          scale: options.scale,
          chromePath
        })

        replacements.push({
          start: fence.start,
          end: fence.end,
          text: `![Diagram ${labelNumber}](att/${imageName})`
        })
        nextNumber += 1
        converted += 1
        console.log(`${relative(repoRoot, outputPath)}`)
      }

      let nextMarkdown = ''
      let cursor = 0
      for (const replacement of replacements) {
        nextMarkdown += markdown.slice(cursor, replacement.start)
        nextMarkdown += replacement.text
        cursor = replacement.end
      }
      nextMarkdown += markdown.slice(cursor)

      await writeFile(file, nextMarkdown)
    }
  } finally {
    await rm(tempRoot, { force: true, recursive: true })
  }

  console.log(`Converted ${converted} Mermaid diagram(s) to JPG attachments.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
