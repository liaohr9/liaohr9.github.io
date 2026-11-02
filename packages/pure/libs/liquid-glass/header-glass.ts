/**
 * Shu Ding's original map/scale math applied to this header (MIT, see LICENSE).
 * https://github.com/shuding/liquid-glass
 * A static map bends the live backdrop; no photo copies, scroll loop or RGB passes.
 */
const SVG_NS = 'http://www.w3.org/2000/svg'
let nextId = 0

function smoothStep(a: number, b: number, value: number): number {
  const t = Math.max(0, Math.min(1, (value - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function roundedRectSDF(x: number, y: number): number {
  // The rounded-lens profile from shuding/liquid-glass's example fragment.
  const qx = Math.abs(x) - 0.3 + 0.6
  const qy = Math.abs(y) - 0.2 + 0.6
  return (
    Math.min(Math.max(qx, qy), 0) + Math.sqrt(Math.max(qx, 0) ** 2 + Math.max(qy, 0) ** 2) - 0.6
  )
}

export function renderOriginalLensMap(
  width: number,
  height: number
): { url: string; scale: number } | undefined {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) return
  const offsets = new Float64Array(width * height * 2)
  const data = new Uint8ClampedArray(width * height * 4)
  let maxScale = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ix = x / width - 0.5
      const iy = y / height - 0.5
      const displacement = smoothStep(0.8, 0, roundedRectSDF(ix, iy) - 0.15)
      const scaled = smoothStep(0, 1, displacement)
      const dx = (ix * scaled + 0.5) * width - x
      const dy = (iy * scaled + 0.5) * height - y
      const index = (y * width + x) * 2
      offsets[index] = dx
      offsets[index + 1] = dy
      maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy))
    }
  }
  // Keep the author's shared normalization and scale; no per-axis normalization
  // or artificial strength cap. This is the original updateShader() calculation.
  maxScale *= 0.5
  for (let pixel = 0; pixel < width * height; pixel++) {
    data[pixel * 4] = (offsets[pixel * 2] / maxScale + 0.5) * 255
    data[pixel * 4 + 1] = (offsets[pixel * 2 + 1] / maxScale + 0.5) * 255
    data[pixel * 4 + 2] = 0
    data[pixel * 4 + 3] = 255
  }
  context.putImageData(new ImageData(data, width, height), 0, 0)
  return { url: canvas.toDataURL(), scale: maxScale }
}

export function setupHeaderGlass(header: HTMLElement): () => void {
  const surface = header.querySelector<HTMLElement>('.header-glass-optics')
  if (!surface) return () => {}
  const reduce = matchMedia('(prefers-reduced-transparency: reduce)')
  const contrast = matchMedia('(prefers-contrast: more)')
  const coarse = matchMedia('(pointer: coarse)')
  // WebKit silently ignores SVG backdrop filters. Do not emulate them with photos.
  const supported =
    /Chrome\/|Chromium\/|Edg\//.test(navigator.userAgent) &&
    !/CriOS\//.test(navigator.userAgent) &&
    CSS.supports('backdrop-filter', 'url(#glass)')
  if (!supported) {
    header.dataset.glassEngine = 'css-fallback'
    return () => header.removeAttribute('data-glass-engine')
  }

  const id = `header-lens-${++nextId}`
  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('width', '0')
  svg.setAttribute('height', '0')
  svg.setAttribute('aria-hidden', 'true')
  svg.style.cssText = 'position:absolute;pointer-events:none;overflow:hidden'
  const defs = document.createElementNS(SVG_NS, 'defs')
  const filter = document.createElementNS(SVG_NS, 'filter')
  filter.id = `${id}_filter`
  filter.setAttribute('filterUnits', 'userSpaceOnUse')
  // Valid SVG spelling preserves the intended neutral displacement over photos.
  filter.setAttribute('color-interpolation-filters', 'sRGB')
  filter.setAttribute('x', '0')
  filter.setAttribute('y', '0')
  const image = document.createElementNS(SVG_NS, 'feImage')
  image.setAttribute('result', `${id}_map`)
  image.setAttribute('preserveAspectRatio', 'none')
  const displace = document.createElementNS(SVG_NS, 'feDisplacementMap')
  displace.setAttribute('in', 'SourceGraphic')
  displace.setAttribute('in2', `${id}_map`)
  displace.setAttribute('xChannelSelector', 'R')
  displace.setAttribute('yChannelSelector', 'G')
  filter.append(image, displace)
  defs.append(filter)
  svg.append(defs)

  let frame = 0
  let previousSize = ''
  let originalMap: ReturnType<typeof renderOriginalLensMap>
  let disposed = false

  const refresh = () => {
    frame = 0
    if (disposed) return
    if (reduce.matches || contrast.matches || coarse.matches) {
      surface.style.backdropFilter = ''
      header.dataset.glassEngine = 'css-fallback'
      return
    }
    const width = Math.max(1, Math.round(surface.offsetWidth))
    const height = Math.max(1, Math.round(surface.offsetHeight))
    // Bound generation and filter work, even on unusually large/custom headers.
    if (width * height > 160000) return
    if (!originalMap) {
      originalMap = renderOriginalLensMap(300, 200)
      if (!originalMap) return
      image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', originalMap.url)
      // User-tuned readability: retain the original map, use half its distortion.
      displace.setAttribute('scale', String(originalMap.scale * 0.5))
    }
    const size = `${width}x${height}`
    if (size !== previousSize) {
      filter.setAttribute('width', String(width))
      filter.setAttribute('height', String(height))
      image.setAttribute('x', '0')
      image.setAttribute('y', '0')
      image.setAttribute('width', String(width))
      image.setAttribute('height', String(height))
      previousSize = size
    }
    if (!svg.isConnected) document.body.append(svg)
    const activeFilter = `url(#${id}_filter) blur(5px) brightness(1.03) saturate(1.05)`
    if (surface.style.backdropFilter !== activeFilter) surface.style.backdropFilter = activeFilter
    if (header.dataset.glassEngine !== 'author-refraction')
      header.dataset.glassEngine = 'author-refraction'
  }

  function schedule() {
    // The optical PNG is cached. Only update its geometry, without clearing the
    // active shader or temporarily switching to a different material mid-scroll.
    if (!frame && !disposed) frame = requestAnimationFrame(refresh)
  }
  const observer = new ResizeObserver(schedule)
  observer.observe(surface)
  reduce.addEventListener('change', schedule)
  contrast.addEventListener('change', schedule)
  coarse.addEventListener('change', schedule)
  schedule()

  return () => {
    disposed = true
    cancelAnimationFrame(frame)
    observer.disconnect()
    reduce.removeEventListener('change', schedule)
    contrast.removeEventListener('change', schedule)
    coarse.removeEventListener('change', schedule)
    svg.remove()
    surface.style.backdropFilter = ''
    header.removeAttribute('data-glass-engine')
  }
}
