import './style.css';
import {
  CHAPTER,
  VOCAB,
  primaryDe,
  answersMatch,
  shuffle,
} from './vocab.js';

const STORAGE_KEY = 'greenwich-vocab-stats';

const app = document.querySelector('#app');

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { quizzes: 0, best: 0 };
  } catch {
    return { quizzes: 0, best: 0 };
  }
}

function saveStats(stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text.replace(/\.\.\./g, ''));
  utter.lang = 'en-GB';
  utter.rate = 0.9;
  const voices = window.speechSynthesis.getVoices();
  const gb = voices.find((v) => v.lang.startsWith('en-GB')) || voices.find((v) => v.lang.startsWith('en'));
  if (gb) utter.voice = gb;
  window.speechSynthesis.speak(utter);
}

if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHome() {
  const stats = loadStats();
  app.innerHTML = `
    <header class="hero">
      <p class="chapter-pill">${escapeHtml(CHAPTER.subtitle)} · S. ${CHAPTER.page}</p>
      <h1 class="brand">Greenwich<span>Vocab</span></h1>
      <p class="tagline">Lerne die Vokabeln aus „${escapeHtml(CHAPTER.title)}“ spielerisch – Karteikarten, Quiz & Tippen.</p>
    </header>
    <nav class="mode-list" aria-label="Lernmodi">
      <button class="mode-btn" data-mode="cards" type="button">
        <span class="mode-icon" aria-hidden="true">🃏</span>
        <strong>Karteikarten</strong>
        <small>Umdrehen und mit Aussprache üben</small>
      </button>
      <button class="mode-btn" data-mode="quiz" type="button">
        <span class="mode-icon" aria-hidden="true">🎯</span>
        <strong>Quiz</strong>
        <small>4 Antworten – was heißt das auf Englisch?</small>
      </button>
      <button class="mode-btn" data-mode="type" type="button">
        <span class="mode-icon" aria-hidden="true">✍️</span>
        <strong>Tippen</strong>
        <small>Schreib die englische Vokabel selbst</small>
      </button>
    </nav>
    <p class="stats-home">
      ${VOCAB.length} Vokabeln
      ${stats.quizzes ? `· ${stats.quizzes} Quiz gespielt · Bestes Ergebnis: ${stats.best}/${VOCAB.length}` : '· Noch kein Quiz gespielt'}
    </p>
  `;

  app.querySelectorAll('[data-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode === 'cards') startCards();
      if (mode === 'quiz') startQuiz();
      if (mode === 'type') startType();
    });
  });
}

function topbar(title, index, total) {
  return `
    <div class="topbar">
      <button class="back-btn" type="button" data-home>← Menü</button>
      <span class="progress-label">${escapeHtml(title)} · ${index + 1}/${total}</span>
    </div>
    <div class="progress-track" aria-hidden="true">
      <div class="progress-fill" style="width:${((index + 1) / total) * 100}%"></div>
    </div>
  `;
}

function bindHome() {
  app.querySelector('[data-home]')?.addEventListener('click', renderHome);
}

/* —— Karteikarten —— */
function startCards() {
  const deck = shuffle(VOCAB);
  let i = 0;
  let flipped = false;

  function paint() {
    const item = deck[i];
    flipped = false;
    app.innerHTML = `
      ${topbar('Karten', i, deck.length)}
      <div class="card-stage">
        <div class="flash-card" role="button" tabindex="0" aria-label="Karte umdrehen">
          <div class="face front">
            <span class="face-label">Deutsch</span>
            <p class="face-main">${escapeHtml(primaryDe(item.de))}</p>
            <p class="hint-flip">Tippe zum Umdrehen</p>
          </div>
          <div class="face back">
            <span class="face-label">English</span>
            <p class="face-main">${escapeHtml(item.en)}</p>
            <p class="phonetic">[${escapeHtml(item.phonetic)}]</p>
            ${item.example ? `<p class="example">${escapeHtml(item.example)}</p>` : ''}
            ${item.tip ? `<p class="tip">💡 ${escapeHtml(item.tip)}</p>` : ''}
          </div>
        </div>
      </div>
      <div class="card-actions">
        <button class="btn btn-speak" type="button" data-speak>🔊 Anhören</button>
        <button class="btn btn-secondary" type="button" data-flip>Umdrehen</button>
        <button class="btn btn-primary" type="button" data-next>${i < deck.length - 1 ? 'Weiter →' : 'Fertig ✓'}</button>
      </div>
    `;

    const card = app.querySelector('.flash-card');
    const flip = () => {
      flipped = !flipped;
      card.classList.toggle('flipped', flipped);
    };

    card.addEventListener('click', flip);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      }
    });
    app.querySelector('[data-flip]').addEventListener('click', flip);
    app.querySelector('[data-speak]').addEventListener('click', () => speak(item.en));
    app.querySelector('[data-next]').addEventListener('click', () => {
      if (i < deck.length - 1) {
        i += 1;
        paint();
      } else {
        showDoneCards();
      }
    });
    bindHome();
  }

  function showDoneCards() {
    app.innerHTML = `
      <div class="result">
        <div class="star-burst" aria-hidden="true">⭐ 🌳 ⭐</div>
        <h2 class="brand" style="font-size:2rem">Alle Karten geschafft!</h2>
        <p>Du hast alle ${deck.length} Vokabeln angesehen. Super!</p>
        <div class="card-actions">
          <button class="btn btn-primary" type="button" data-again>Nochmal</button>
          <button class="btn btn-secondary" type="button" data-home>Zum Menü</button>
        </div>
      </div>
    `;
    app.querySelector('[data-again]').addEventListener('click', startCards);
    bindHome();
  }

  paint();
}

/* —— Quiz —— */
function startQuiz() {
  const deck = shuffle(VOCAB);
  let i = 0;
  let score = 0;
  let answered = false;

  function wrongChoices(correct) {
    const others = shuffle(VOCAB.filter((v) => v.id !== correct.id)).slice(0, 3);
    return shuffle([correct, ...others]);
  }

  function paint() {
    const item = deck[i];
    answered = false;
    const options = wrongChoices(item);

    app.innerHTML = `
      ${topbar('Quiz', i, deck.length)}
      <div class="quiz-prompt">
        <span class="face-label">Was heißt das auf Englisch?</span>
        <p class="face-main">${escapeHtml(primaryDe(item.de))}</p>
        <button class="btn btn-ghost" type="button" data-hint style="margin-top:0.75rem">🔊 Hinweis anhören</button>
      </div>
      <div class="choices">
        ${options
          .map(
            (opt) => `
          <button class="choice" type="button" data-id="${opt.id}">
            ${escapeHtml(opt.en)}
          </button>`
          )
          .join('')}
      </div>
      <p class="feedback" aria-live="polite"></p>
      <div class="card-actions" style="opacity:0;pointer-events:none" data-next-wrap>
        <button class="btn btn-primary" type="button" data-next>${i < deck.length - 1 ? 'Weiter →' : 'Ergebnis ansehen'}</button>
      </div>
    `;

    const feedback = app.querySelector('.feedback');
    const nextWrap = app.querySelector('[data-next-wrap]');

    app.querySelector('[data-hint]').addEventListener('click', () => speak(item.en));

    app.querySelectorAll('.choice').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const id = Number(btn.dataset.id);
        const correct = id === item.id;
        if (correct) score += 1;

        app.querySelectorAll('.choice').forEach((c) => {
          c.disabled = true;
          if (Number(c.dataset.id) === item.id) c.classList.add('correct');
          else if (c === btn && !correct) c.classList.add('wrong');
        });

        feedback.textContent = correct
          ? 'Richtig! Toll gemacht 🎉'
          : `Fast! Richtig ist: ${item.en}`;
        feedback.className = `feedback ${correct ? 'ok' : 'bad'}`;
        nextWrap.style.opacity = '1';
        nextWrap.style.pointerEvents = 'auto';
        if (correct) speak(item.en);
      });
    });

    app.querySelector('[data-next]').addEventListener('click', () => {
      if (i < deck.length - 1) {
        i += 1;
        paint();
      } else {
        finishQuiz(score, deck.length);
      }
    });
    bindHome();
  }

  paint();
}

function finishQuiz(score, total) {
  const stats = loadStats();
  stats.quizzes += 1;
  stats.best = Math.max(stats.best, score);
  saveStats(stats);

  const pct = Math.round((score / total) * 100);
  let msg = 'Weiter üben – du schaffst das!';
  if (pct >= 90) msg = 'Wahnsinn – fast perfekt!';
  else if (pct >= 70) msg = 'Super Job!';
  else if (pct >= 50) msg = 'Gut gemacht – noch eine Runde?';

  app.innerHTML = `
    <div class="result">
      <div class="star-burst" aria-hidden="true">${pct >= 70 ? '⭐ 🏆 ⭐' : '🌳 ⚽ 🌳'}</div>
      <h2 class="brand" style="font-size:2rem">Quiz fertig!</h2>
      <p class="result-score">${score}/${total}</p>
      <p>${escapeHtml(msg)}</p>
      <div class="card-actions">
        <button class="btn btn-primary" type="button" data-again>Nochmal quizzen</button>
        <button class="btn btn-secondary" type="button" data-home>Zum Menü</button>
      </div>
    </div>
  `;
  app.querySelector('[data-again]').addEventListener('click', startQuiz);
  bindHome();
}

/* —— Tippen —— */
function startType() {
  const deck = shuffle(VOCAB);
  let i = 0;
  let score = 0;
  let checked = false;

  function paint() {
    const item = deck[i];
    checked = false;

    app.innerHTML = `
      ${topbar('Tippen', i, deck.length)}
      <div class="quiz-prompt">
        <span class="face-label">Schreib auf Englisch</span>
        <p class="face-main">${escapeHtml(primaryDe(item.de))}</p>
        ${item.example ? `<p class="example" style="margin-top:0.75rem">Beispiel: ${escapeHtml(item.example)}</p>` : ''}
      </div>
      <form class="type-form">
        <label class="visually-hidden" for="answer" style="position:absolute;left:-9999px">Antwort</label>
        <input class="type-input" id="answer" name="answer" autocomplete="off" spellcheck="false"
          placeholder="z. B. Hello." autofocus />
        <div class="card-actions">
          <button class="btn btn-speak" type="button" data-speak>🔊 Anhören</button>
          <button class="btn btn-primary" type="submit" data-check>Prüfen</button>
        </div>
      </form>
      <p class="feedback" aria-live="polite"></p>
      <div class="card-actions" style="display:none" data-next-wrap>
        <button class="btn btn-primary" type="button" data-next>${i < deck.length - 1 ? 'Weiter →' : 'Ergebnis ansehen'}</button>
      </div>
    `;

    const input = app.querySelector('#answer');
    const feedback = app.querySelector('.feedback');
    const nextWrap = app.querySelector('[data-next-wrap]');
    const form = app.querySelector('.type-form');

    app.querySelector('[data-speak]').addEventListener('click', () => speak(item.en));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (checked) return;
      const value = input.value.trim();
      if (!value) {
        feedback.textContent = 'Schreib erst etwas hin.';
        feedback.className = 'feedback bad';
        return;
      }
      checked = true;
      const ok = answersMatch(value, item.en) || answersMatch(value, primaryDe(item.en));
      // Also accept without punctuation / ellipsis variants
      const ok2 =
        ok ||
        answersMatch(value, item.en.replace(/\.\.\./g, '')) ||
        answersMatch(value.replace(/\.\.\./g, ''), item.en);

      if (ok2) {
        score += 1;
        feedback.textContent = 'Richtig! 🎉';
        feedback.className = 'feedback ok';
        speak(item.en);
      } else {
        feedback.textContent = `Leider nein. Richtig: ${item.en}`;
        feedback.className = 'feedback bad';
        input.value = item.en;
      }
      input.disabled = true;
      app.querySelector('[data-check]').disabled = true;
      nextWrap.style.display = 'flex';
    });

    app.querySelector('[data-next]').addEventListener('click', () => {
      if (i < deck.length - 1) {
        i += 1;
        paint();
      } else {
        finishType(score, deck.length);
      }
    });
    bindHome();
    setTimeout(() => input.focus(), 50);
  }

  paint();
}

function finishType(score, total) {
  app.innerHTML = `
    <div class="result">
      <div class="star-burst" aria-hidden="true">✍️ ⭐ ✍️</div>
      <h2 class="brand" style="font-size:2rem">Tippen geschafft!</h2>
      <p class="result-score">${score}/${total}</p>
      <p>${score === total ? 'Perfekt geschrieben!' : 'Übe die schwierigen nochmal mit den Karteikarten.'}</p>
      <div class="card-actions">
        <button class="btn btn-primary" type="button" data-again>Nochmal tippen</button>
        <button class="btn btn-secondary" type="button" data-home>Zum Menü</button>
      </div>
    </div>
  `;
  app.querySelector('[data-again]').addEventListener('click', startType);
  bindHome();
}

renderHome();
