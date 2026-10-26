const terms = [
  { id: 1, text: 'Testes', match: 'Produce sperm and male sex hormones, especially testosterone.' },
  { id: 2, text: 'Scrotum', match: 'Holds and protects the testes outside the body to regulate temperature.' },
  { id: 3, text: 'Seminiferous tubules', match: 'Tiny tubes inside the testes where sperm are produced.' },
  { id: 4, text: 'Epididymis', match: 'Stores and matures sperm before they are released.' },
  { id: 5, text: 'Vas deferens', match: 'Carries sperm from the epididymis toward the urethra.' },
  { id: 6, text: 'Seminal vesicles', match: 'Produce a fluid that nourishes sperm and helps form semen.' },
  { id: 7, text: 'Prostate gland', match: 'Adds fluid to semen and helps protect sperm.' },
  { id: 8, text: 'Bulbourethral glands', match: 'Secrete a lubricating fluid that helps sperm move through the urethra.' },
  { id: 9, text: 'Urethra', match: 'Carries both urine and semen, though not at the same time.' },
  { id: 10, text: 'Penis', match: 'Male organ used for sexual intercourse and sperm delivery.' },
  { id: 11, text: 'Glans penis', match: 'The sensitive rounded tip of the penis.' },
  { id: 12, text: 'Prepuce', match: 'The foreskin covering the glans penis.' },
  { id: 13, text: 'Sperm', match: 'Male reproductive cells capable of fertilizing an egg.' },
  { id: 14, text: 'Spermatogenesis', match: 'The process of sperm production in the testes.' },
  { id: 15, text: 'Testosterone', match: 'The main male sex hormone responsible for sperm production and male traits.' }
];

const termsColumn = document.getElementById('termsColumn');
const definitionsColumn = document.getElementById('definitionsColumn');
const matchCount = document.getElementById('matchCount');
const gameStatus = document.getElementById('gameStatus');
const resetGameBtn = document.getElementById('resetGame');

let selectedTerm = null;
let matchedPairs = 0;

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderGame() {
  const shuffledTerms = shuffleArray(terms);
  const shuffledDefinitions = shuffleArray(terms);

  termsColumn.innerHTML = '';
  definitionsColumn.innerHTML = '';

  shuffledTerms.forEach((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'game-item';
    button.textContent = item.text;
    button.dataset.id = String(item.id);
    button.addEventListener('click', () => selectTerm(item.id, button));
    termsColumn.appendChild(button);
  });

  shuffledDefinitions.forEach((item) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'game-item';
    button.textContent = item.match;
    button.dataset.id = String(item.id);
    button.addEventListener('click', () => selectDefinition(item.id, button));
    definitionsColumn.appendChild(button);
  });

  matchCount.textContent = String(matchedPairs);
  gameStatus.textContent = 'Choose a term first';
  selectedTerm = null;
  document.querySelectorAll('.game-item').forEach((item) => item.classList.remove('selected', 'matched'));
}

function markMatched(termId, defId) {
  const termButtons = document.querySelectorAll('[data-id="' + termId + '"]');
  termButtons.forEach((button) => {
    button.classList.add('matched');
    button.disabled = true;
  });

  const defButtons = document.querySelectorAll('[data-id="' + defId + '"]');
  defButtons.forEach((button) => {
    button.classList.add('matched');
    button.disabled = true;
  });
}

function selectTerm(termId, button) {
  if (button.classList.contains('matched')) return;

  document.querySelectorAll('#termsColumn .game-item').forEach((item) => {
    item.classList.remove('selected');
  });

  selectedTerm = termId;
  button.classList.add('selected');
  gameStatus.textContent = 'Now select the correct definition';
}

function selectDefinition(definitionId, button) {
  if (!selectedTerm) {
    gameStatus.textContent = 'Choose a term first';
    return;
  }

  const matchingTerm = terms.find((item) => item.id === selectedTerm);
  const selectedDefinition = terms.find((item) => item.id === definitionId);

  if (!matchingTerm || !selectedDefinition) return;

  if (matchingTerm.match === selectedDefinition.match) {
    matchedPairs += 1;
    matchCount.textContent = String(matchedPairs);
    markMatched(selectedTerm, definitionId);
    gameStatus.textContent = 'Correct match!';

    if (matchedPairs === terms.length) {
      gameStatus.textContent = 'You completed the full male reproductive system match game!';
    }
  } else {
    button.classList.add('selected');
    gameStatus.textContent = 'Not quite, try again';
    setTimeout(() => {
      button.classList.remove('selected');
      document.querySelectorAll('#termsColumn .game-item').forEach((item) => item.classList.remove('selected'));
      selectedTerm = null;
      gameStatus.textContent = 'Choose a term first';
    }, 500);
  }

  selectedTerm = null;
}

resetGameBtn.addEventListener('click', () => {
  matchedPairs = 0;
  renderGame();
});

renderGame();

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = 'Sent!';
  button.disabled = true;
});
