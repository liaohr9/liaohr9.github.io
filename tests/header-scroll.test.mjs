import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import ts from 'typescript'

const text = await readFile(
  new URL('../packages/pure/libs/liquid-glass/header-scroll.ts', import.meta.url),
  'utf8'
)
const js = ts.transpileModule(text, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }
}).outputText
const { createHeaderScrollState, advanceHeaderScroll } = await import(
  `data:text/javascript;base64,${Buffer.from(js).toString('base64')}`
)

test('slow upward scroll reveals once and ignores equal positions and tiny reverse jitter', () => {
  let s = advanceHeaderScroll(createHeaderScrollState(600), 650)
  assert.equal(s.visible, false)
  for (const y of [649, 649, 649.5, 648, 648, 647, 646, 645, 644, 643, 642])
    s = advanceHeaderScroll(s, y)
  assert.equal(s.visible, true)
  for (const y of [642, 642.5, 642, 641.5, 641.5, 641, 641.5, 641]) {
    s = advanceHeaderScroll(s, y)
    assert.equal(s.visible, true)
  }
})

test('deliberate downward movement hides and deliberate upward movement reveals', () => {
  let s = createHeaderScrollState(600)
  s = advanceHeaderScroll(s, 623)
  assert.equal(s.visible, true)
  s = advanceHeaderScroll(s, 624)
  assert.equal(s.visible, false)
  s = advanceHeaderScroll(s, 617)
  assert.equal(s.visible, false)
  s = advanceHeaderScroll(s, 616)
  assert.equal(s.visible, true)
})

test('floating surface has separate entry and exit thresholds near the top', () => {
  let s = createHeaderScrollState(0)
  for (const y of [20, 21, 24]) {
    s = advanceHeaderScroll(s, y)
    assert.equal(s.floating, false)
  }
  s = advanceHeaderScroll(s, 25)
  assert.equal(s.floating, true)
  for (const y of [24, 20, 15, 9]) {
    s = advanceHeaderScroll(s, y)
    assert.equal(s.floating, true)
  }
  s = advanceHeaderScroll(s, 8)
  assert.equal(s.floating, false)
  s = advanceHeaderScroll(s, -5)
  assert.equal(s.visible, true)
})
