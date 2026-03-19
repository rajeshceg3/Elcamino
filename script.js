const timelineStages = [...document.querySelectorAll('.timeline-stage')];
const beginButton = document.getElementById('begin-journey');
const soundToggle = document.getElementById('sound-toggle');
const ambientAudio = document.getElementById('ambient-audio');
const intentionForm = document.getElementById('intention-form');
const reflectionCard = document.getElementById('reflection-card');
const companionText = document.getElementById('journey-companion');
const progressBar = document.querySelector('.journey-progress');
const progressFill = document.getElementById('journey-progress-fill');
const visitedCount = document.getElementById('visited-count');
const stampButtons = [...document.querySelectorAll('.stamp-button')];

const reflections = {
  healing:
    'As I walked out of Porto, I let each mile absorb what I could not carry anymore. By the time I reached Santiago, my body was tired, but my spirit felt newly spacious. Healing happened quietly, one honest step at a time.',
  clarity:
    "The Camino gave me clarity by simplifying everything: walk, breathe, notice, rest, repeat. Somewhere between Galicia's forests and village cafés, the next chapter of my life became less frightening and more obvious.",
  connection:
    'I arrived alone, yet never truly walked alone. A shared orange, a kind smile, a whispered “Buen Camino” made me feel deeply seen. Connection on this trail was not loud—it was steady, generous, and real.',
  gratitude:
    'I discovered gratitude in ordinary miracles: dry socks after rain, warm bread at dawn, church bells at sunset, and strangers who became friends. Joy stopped being a destination and became my walking companion.'
};

const companionLines = [
  'Porto is behind us. Keep your pace gentle and curious.',
  'The coast opens up—let wonder do more of the talking.',
  'New country, same heart. Notice what already feels familiar.',
  'The forest teaches rhythm: breathe, step, soften.',
  'Santiago is here. Pause and feel what this walk changed.'
];

const moodByStage = ['default', 'coast', 'coast', 'forest', 'arrival'];
const visitedStages = new Set();
const collectedStamps = new Set();

const updateProgressUI = (stageIndex) => {
  const totalStages = timelineStages.length;
  const percent = Math.round(((stageIndex + 1) / totalStages) * 100);

  progressFill.style.width = `${percent}%`;
  progressBar?.setAttribute('aria-valuenow', String(percent));
  if (companionText) {
    companionText.textContent = companionLines[stageIndex] ?? companionLines[0];
  }

  const mood = moodByStage[stageIndex] ?? 'default';
  if (mood === 'default') {
    document.body.removeAttribute('data-mood');
  } else {
    document.body.setAttribute('data-mood', mood);
  }
};

const updateVisitedUI = () => {
  if (!visitedCount) {
    return;
  }

  visitedCount.textContent = `${visitedStages.size} / ${timelineStages.length}`;
};

const stageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const stage = entry.target;
      const stageIndex = Number(stage.dataset.stage);

      stage.classList.add('is-active');
      visitedStages.add(stageIndex);

      updateVisitedUI();
      updateProgressUI(stageIndex);
    });
  },
  {
    threshold: 0.45
  }
);

timelineStages.forEach((stage) => {
  stageObserver.observe(stage);
  stage.addEventListener('focus', () => {
    const stageIndex = Number(stage.dataset.stage);
    visitedStages.add(stageIndex);
    stage.classList.add('is-active');
    updateVisitedUI();
    updateProgressUI(stageIndex);
  });
});

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

stampButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const hasStamp = collectedStamps.has(index);

    if (hasStamp) {
      collectedStamps.delete(index);
      button.textContent = 'Collect this memory stamp';
      button.setAttribute('aria-pressed', 'false');
      return;
    }

    collectedStamps.add(index);
    button.textContent = 'Stamp collected ✓';
    button.setAttribute('aria-pressed', 'true');
  });
});
