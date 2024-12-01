import { emojiList } from './emojiList.js';

let numTries = 0;
let openCards = [];

function getEmojis(emojiList) {
  const emojis = [];
  while (emojis.length < 16) {
    const randomEmoji = emojiList[Math.floor(Math.random()*emojiList.length)];
    if (randomEmoji && !emojis.includes(randomEmoji)) {
      emojis.push(randomEmoji);
      emojis.push(randomEmoji);
    }
  }
  return emojis;
}

function shuffleEmojis(emojis) {
  // percorre array na ordem inversa
  for (let i = emojis.length-1; i > 0; i--) {
    // sorteia posição aleatória entre 0 e i
    const j = Math.floor(Math.random() * (i+1));
    // troca os valores entre posição i e posição j
    const temp = emojis[j];
    emojis[j] = emojis[i];
    emojis[i] = temp;
  }
}

function checkPair() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards.forEach(openCard => {
      openCard.classList.add('match');
    });
  } else {
    openCards.forEach(openCard => {
      openCard.classList.remove('open');
    });
  }
  numTries++;
  openCards = [];

  if (document.querySelectorAll('.match').length === emojis.length) {
    alert(`Parabéns! Você conseguiu em ${numTries} tentativas.`);
  }
}

// seleciona 8 pares de emojis aleatórios
const emojis = getEmojis(emojiList);

// embaralha a lista selecionada
shuffleEmojis(emojis);

// cria um card para cada emoji
emojis.forEach(emoji => {
  document.getElementById('game').innerHTML += `
    <div class="card">
      <div class="front">${emoji}</div>
      <div class="back"></div>
    </div>
  `;
});

// adiciona click event para cada card
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('open')) {
      if (openCards.length < 2) {
        card.classList.add('open');
        openCards.push(card);
      }
      // compara os dois cards selecionados 
      if (openCards.length == 2) {
        setTimeout(checkPair, 500);
      }
    }
  });
});

// adiciona click event para reiniciar o jogo
document.getElementById('reset-button').addEventListener('click', () => window.location.reload());