# El Camino

Five freely orbitable low-poly scenes inspired by Porto, the Portuguese Atlantic coast, Tui, paths toward Pontevedra and Santiago de Compostela. An illustrated companion, not a navigation map or an exact architectural reconstruction.

## Run

Node 22+, `npm ci`, `npm run dev`. Production: `npm run build`, output `dist`. No API keys, paid services or external audio requests.

Drag to explore 360 degrees, scroll to zoom, arrow keys to orbit, Home or Reset view to return to each scene's composed view. Motion and sound are separate opt-ins; reduced motion starts paused and sound always starts off. Each chapter has a quiet soundscape synthesized in the browser for its place on the walk: Douro river water, gulls and a distant tram bell for Porto; open Atlantic surf and dune wind for the boardwalk; the Mino running faster and a far cathedral bell for Tui; pine-canopy wind and cuckoos toward Pontevedra; a quiet square and the big bell far above for Santiago. No voice, no song, no melody, no samples; scene changes crossfade the soundscape; Sound off closes the audio context. Memory stamps and visited places persist only in the current browser. Read the diary and choose one of four reflections.

The inherited first-person diary is explicitly fictional. These scenes mix coastal and inland inspirations, not a single waymarked itinerary. The coastal route enters Galicia at A Guarda; Tui is on the inland Portuguese Way. Both meet at Redondela. No fixed 260 km / 14 day claim is retained. Original static files are preserved in `legacy/`.

## Sources

- https://www.caminodesantiago.gal/en/make-plans/the-ways/portuguese-way
- https://www.caminodesantiago.gal/en/make-plans/the-ways/portuguese-coastal-way
- https://www.santiagoturismo.com/videoguias/fachada-de-la-catedral
- https://www.visitportugal.com/en/print/sugestao/73735
- https://tui.gal/en/turismo/vive-e-conoce/santa-maria-cathedral

## Verification

`npm test` runs the Chromium UI matrix at WIDTH (default 390), with CHROME optionally pointing to a browser binary. Five scenes x two themes x two motion settings, actual pointer drag and settled Reset, keyboard, diary, four intention reflections, memory collection persistence, no horizontal overflow, minimum 14px visible UI labels and silent start. Local 390 and 1440 matrices pass. Contrast evidence in `verification/contrast.json`: 465 visible UI text samples across 32 screenshots, minimum 7.69:1 measured from rendered glyph masks and underlying backdrop pixels, excluding scene geometry. Real screenshots inspected at phone and desktop.

Audio: structural checks (seamless loops, no clipping, quiet-ambient loudness, no DC offset) run in `npm test`; `npm run audio:preview` renders per-chapter WAV previews offline. Actual post-gain browser output captured per chapter, silent before opt-in, context closed on off, replay checked. Human listening is still unsigned; no claim of listened quality is made.

Cloudflare Pages target: GitHub-connected, `npm run build`, `dist`, free tier. Prior Vercel URL retained unchanged: https://elcamino-r1ne8t725-rajeshceg3s-projects.vercel.app/
