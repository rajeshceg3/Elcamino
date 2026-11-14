# Explicit Camino waymarker

Controls-only change. The scene geometry, camera values, OrbitControls, soundscape and motion behavior are unchanged. Collect memory remains the primary scene action. Journey opens a native dialog for place choices, diary, reflection, previous/next and view settings. Both native selects are replaced with explicit buttons/radios. No timer, hover zone, persistent pin or animated hint remains.

The existing twenty-state suite still covers all five places, both UI themes and both motion states, real drag, settled reset, arrow/Home keys, four intentions, diary, persistence, silent audio start and runtime errors. It now opens the explicit disclosure rather than forcing a persistent pin. It also checks Escape/focus return, no selects, chapter touch target height and dialog horizontal fit.

Local checks on 14 November 2026: build; 20 states at 320 and 390px; 20 states at 1280px with TEST_DPR=0.5 to reduce software-rendering cost (CSS width unchanged); audio structural tests. Entry/Journey/reflection pixels inspected at 320, 390 and 1280px at normal screenshot scale. Final chapter layout is one readable column. Production verification and deployment remain pending.

Run: npm run build; WIDTH=390 node verification/check.cjs; WIDTH=1280 TEST_DPR=0.5 node verification/check.cjs; node verification/audio-structure.cjs.
