const all_btn = document.querySelectorAll('.button');
let win = document.querySelector('.win');
let lose = document.querySelector('.lose');
let tie = document.querySelector('.tie');
let reset = document.querySelector('.reset');
let message = document.querySelector('.message');

// Load score from localStorage or set a default score object if not found
let score = JSON.parse(localStorage.getItem('score'))

win.innerHTML = score.win;
lose.innerHTML = score.lose;
tie.innerHTML = score.tie;

all_btn.forEach(button => {
  button.addEventListener('click', () => {
    let computer_move = Math.random();
    let player_move = '';
    let result = '';

    // Determine computer's move
    if (computer_move < 1 / 3) {
      computer_move = 'ROCK';
    } else if (computer_move < 2 / 3) {
      computer_move = 'PAPER';
    } else {
      computer_move = 'SCISSORS';
    }

    // Determine player's move
    if (button.classList.contains('Rock')) {
      player_move = 'ROCK';
    } else if (button.classList.contains('Paper')) {
      player_move = 'PAPER';
    } else if (button.classList.contains('Scissors')) {
      player_move = 'SCISSORS';
    }

    // Compare moves and determine result
    if (computer_move === player_move) {
      result = 'You tied';
    } else if ((computer_move === 'ROCK' && player_move === 'PAPER') ||
               (computer_move === 'PAPER' && player_move === 'SCISSORS') ||
               (computer_move === 'SCISSORS' && player_move === 'ROCK')) {
      result = 'You win';
    } else {
      result = 'You lose';
    }

    // Update score based on result
    if (result === 'You win') {
      score.win += 1;
      win.innerHTML = score.win;
    } else if (result === 'You lose') {
      score.lose += 1;
      lose.innerHTML = score.lose;
    } else if (result === 'You tied') {
      score.tie += 1;
      tie.innerHTML = score.tie;
    }

    // Display the result message
    message.innerHTML = `You just played ${player_move} and computer played ${computer_move}. ${result}`;

    // Save updated score to localStorage
    localStorage.setItem('score', JSON.stringify(score));
  });
});

// Reset the game and the score
reset.addEventListener('click', () => {
  score = { win: 0, lose: 0, tie: 0 };  // Reset score object
  win.innerHTML = 0;
  lose.innerHTML = 0;
  tie.innerHTML = 0;
  message.innerHTML = '';

  // Save the reset score to localStorage
  localStorage.setItem('score', JSON.stringify(score));
});
