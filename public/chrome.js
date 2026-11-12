/* Quiet chrome: the walk leads, controls visit when called and retire when left.
   Shared contract: greet ~2.6s, retire; wake on edge hover, hint tab, keyboard
   focus, or the pin (persisted). Escape retires. */
(function () {
  const PIN_KEY = 'camino-chrome-pin';
  const TOP_ZONE = 96;
  const BOTTOM_ZONE = 150;
  const RETIRE_MS = 2600;

  const header = document.querySelector('header');
  const hint = document.getElementById('chrome-hint');
  const pinBtn = document.getElementById('pin-controls');
  if (!header || !hint || !pinBtn) return;

  let pinned = false;
  try { pinned = localStorage.getItem(PIN_KEY) === '1'; } catch (e) {}
  let focusWithin = false;
  let retireTimer = null;
  let wakeState = true; // greeting on entry

  function apply() {
    document.body.classList.add('quiet-ready');
    const on = pinned || wakeState;
    document.body.classList.toggle('chrome-on', on);
    hint.hidden = on;
    pinBtn.setAttribute('aria-pressed', String(pinned));
  }

  function retireSoon() {
    clearTimeout(retireTimer);
    retireTimer = setTimeout(() => {
      if (!focusWithin) { wakeState = false; apply(); }
    }, RETIRE_MS);
  }

  function wake() {
    wakeState = true;
    apply();
    retireSoon();
  }

  function onPointerMove(e) {
    if (e.pointerType === 'touch') return;
    if (e.clientY < TOP_ZONE || e.clientY > window.innerHeight - BOTTOM_ZONE) wake();
  }

  function onKey(e) {
    if (e.key === 'Escape') { focusWithin = false; wakeState = false; apply(); }
  }

  function onFocusIn(e) {
    if (header.contains(e.target)) {
      focusWithin = true;
      clearTimeout(retireTimer);
      wakeState = true;
      apply();
    }
  }

  function onFocusOut(e) {
    if (header.contains(e.relatedTarget)) return;
    focusWithin = false;
    retireSoon();
  }

  pinBtn.addEventListener('click', () => {
    pinned = !pinned;
    try { pinned ? localStorage.setItem(PIN_KEY, '1') : localStorage.removeItem(PIN_KEY); } catch (e) {}
    if (pinned) wakeState = true;
    apply();
    if (!pinned) retireSoon();
  });

  hint.addEventListener('click', wake);

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('keydown', onKey);
  document.addEventListener('focusin', onFocusIn);
  document.addEventListener('focusout', onFocusOut);

  apply();
  retireSoon(); // greeting: controls visit on arrival, then step aside
})();
