export interface HeaderScrollState {
  floating: boolean
  visible: boolean
  anchorY: number
}

export function createHeaderScrollState(y: number): HeaderScrollState {
  return { floating: y > 24, visible: true, anchorY: Math.max(0, y) }
}

/** Track travel from a turning point, rather than the sign of each wheel event. */
export function advanceHeaderScroll(state: HeaderScrollState, position: number): HeaderScrollState {
  const y = Math.max(0, position)
  const floating = state.floating ? y > 8 : y > 24
  if (y <= 350) return { floating, visible: true, anchorY: y }
  if (state.visible) {
    const anchorY = Math.min(state.anchorY, y)
    return y - anchorY >= 24
      ? { floating, visible: false, anchorY: y }
      : { floating, visible: true, anchorY }
  }
  const anchorY = Math.max(state.anchorY, y)
  return anchorY - y >= 8
    ? { floating, visible: true, anchorY: y }
    : { floating, visible: false, anchorY }
}

export function setupHeaderScroll(header: HTMLElement): () => void {
  const position = () =>
    Math.min(
      Math.max(0, window.scrollY),
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
    )
  let state = createHeaderScrollState(position())
  function apply() {
    if (header.classList.contains('not-top') !== state.floating) {
      header.classList.toggle('not-top', state.floating)
    }
    const show = String(state.visible)
    if (header.dataset.show !== show) header.dataset.show = show
  }
  function onScroll() {
    state = advanceHeaderScroll(state, position())
    apply()
  }
  apply()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
