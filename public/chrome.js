/* A deliberate waymarker. Nothing opens on a timer, hover or scroll. */
(() => {
  const open = document.getElementById('journey-open');
  const panel = document.getElementById('journey-panel');
  open.addEventListener('click', () => { panel.showModal(); document.getElementById('journey-close').focus(); });
  document.getElementById('journey-close').addEventListener('click', () => panel.close());
  panel.addEventListener('close', () => open.focus());
})();
