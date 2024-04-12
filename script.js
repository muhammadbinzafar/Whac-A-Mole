let balance = 0;
let moleInterval;
let timerInterval;
let timeLeft = 30;

// Function to handle mole click/tap
function handleMoleClick(event) {
  const mole = event.target;
  if (!mole.classList.contains('active')) return;
  
  mole.classList.remove('active');
  mole.classList.add('whacked');
  
  balance++;
  document.getElementById('balance').textContent = balance;
}

// Detect if the device is a mobile device
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

document.querySelectorAll('.mole').forEach(mole => {
  // Add mousedown event listener for both laptop/desktop and mobile devices
  mole.addEventListener(isMobileDevice() ? 'touchstart' : 'mousedown', handleMoleClick);
});

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timeLeft').textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      clearInterval(moleInterval);
      endGame();
    }
  }, 390);
}

function startGame() {
  moleInterval = setInterval(() => {
    document.querySelectorAll('.mole').forEach(item => {
      item.classList.remove('active', 'whacked');
    });

    let randomIndex = Math.floor(Math.random() * 9);
    document.querySelectorAll('.mole')[randomIndex].classList.add('active');
  }, 1000);
}

function endGame() {
  document.getElementById('gameOverScreen').style.display = 'block';
  document.getElementById('earnings').textContent = `$${balance}`;
}

function restartGame() {
  clearInterval(timerInterval);
  clearInterval(moleInterval);
  balance = 0;
  timeLeft = 30;
  document.getElementById('timeLeft').textContent = timeLeft;
  document.getElementById('balance').textContent = balance;
  document.getElementById('gameOverScreen').style.display = 'none';
  startGame();
  startTimer();
}

document.getElementById('restartBtn').addEventListener('click', restartGame);
document.getElementById('restartGameBtn').addEventListener('click', restartGame);

// Start the game initially
document.addEventListener('DOMContentLoaded', function() {
  const initialScreen = document.getElementById('initialScreen');
  const container = document.querySelector('.container');
  const startBtn = document.getElementById('startBtn');

  startBtn.addEventListener('click', function() {
    initialScreen.style.display = 'none'; // Hide initial screen
    container.style.display = 'block'; // Show game container
    startGame(); // Start the game
    startTimer(); // Start the timer
 });
 
});