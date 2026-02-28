const timelineStages = [...document.querySelectorAll('.timeline-stage')];
const beginButton = document.getElementById('begin-journey');
const soundToggle = document.getElementById('sound-toggle');
const ambientAudio = document.getElementById('ambient-audio');
const intentionForm = document.getElementById('intention-form');
const reflectionCard = document.getElementById('reflection-card');

const reflections = {
  healing:
    'As I walked out of Porto, I let each mile absorb what I could not carry anymore. By the time I reached Santiago, my body was tired, but my spirit felt newly spacious. Healing happened quietly, one honest step at a time.',
  clarity:
    'The Camino gave me clarity by simplifying everything: walk, breathe, notice, rest, repeat. Somewhere between Galicia\'s forests and village cafés, the next chapter of my life became less frightening and more obvious.',
  connection:
    'I arrived alone, yet never truly walked alone. A shared orange, a kind smile, a whispered “Buen Camino” made me feel deeply seen. Connection on this trail was not loud—it was steady, generous, and real.',
  gratitude:
    'I discovered gratitude in ordinary miracles: dry socks after rain, warm bread at dawn, church bells at sunset, and strangers who became friends. Joy stopped being a destination and became my walking companion.'
};

const stageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-active');
      }
    });
  },
  {
    threshold: 0.45
  }
);

timelineStages.forEach((stage) => stageObserver.observe(stage));

beginButton?.addEventListener('click', () => {
  document.getElementById('journey-title')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

soundToggle?.addEventListener('click', async () => {
  const isPlaying = !ambientAudio.paused;

  try {
    if (isPlaying) {
      ambientAudio.pause();
      soundToggle.textContent = 'Enable ambient sound';
      soundToggle.setAttribute('aria-pressed', 'false');
      return;
    }

    await ambientAudio.play();
    soundToggle.textContent = 'Pause ambient sound';
    soundToggle.setAttribute('aria-pressed', 'true');
  } catch {
    soundToggle.textContent = 'Audio unavailable in this browser';
    soundToggle.disabled = true;
  }
});

intentionForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(intentionForm);
  const selectedIntention = formData.get('intention');
  const message = reflections[selectedIntention] ?? reflections.gratitude;

  reflectionCard.innerHTML = `
    <h3>Your Camino reflection</h3>
    <p>${message}</p>
  `;
});
