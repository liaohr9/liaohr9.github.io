# Shuding shader on the site navigation

Based on Shu Ding's Liquid Glass shader, under the adjacent MIT LICENSE:
https://github.com/shuding/liquid-glass/blob/a2d2e847f793430e3409a52927af815a23f4d372/liquid-glass.js

The original rounded-rect SDF/smoothstep fragment and shared map normalization
are retained. The canonical300x200 PNG matches the author's original byte for
byte, including its raw scale48.700230958000276. Its display region stretches
to the navbar; SVG uses valid color-interpolation-filters/result attributes.

Current user-requested readability tuning:
- Applied displacement is half the raw scale:24.350115479.
-5px frost, brightness1.03, saturation1.05; no contrast boost.
- Light-mode white tint60%; dark-mode slate tint75% with near-white lettering.
- Replaced the heavy black inner shadow with a subtle rim and soft outer shadow.
-56px floating capsule; real navigation text/buttons stay outside the shader.

Map creation runs once. ResizeObserver coalesces geometry-only updates into one
requestAnimationFrame while keeping the active shader; it never clears the
material between sizes. There are no photo copies or perpetual animation loops.
Header height stays56px even at the top. header-scroll.ts uses turning-point
travel thresholds (up8px/show, down24px/hide), ignores equal positions and tiny
reverse jitter, clamps overscroll, and removes its passive listener on disconnect. Narrow-screen
navigation and the borderless theme button are retained.

Desktop Chromium gets SVG backdrop refraction. WebKit/Firefox and coarse-pointer
devices use CSS fallback. Reduced transparency/increased contrast use a solid
surface. The full MIT notice also ships at /licenses/liquid-glass.txt.
