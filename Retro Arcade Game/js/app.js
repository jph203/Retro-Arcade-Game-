// Global Variables
let score = 0;
let totalLives = 10;

// Enemies the player must avoid during the game
    function Enemy(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

// Update the enemy objects position and a delta between ticks
Enemy.prototype.update = function(dt) {
    let scoreValue = document.querySelector('.scoreValue');
    let lives = document.querySelector('.livesValue');
    // Multiplying any movement by the dt perameter ensures the game runs at the same speed
    this.x += this.speed * dt;
  
    // Bugs move at random speeds
    if (this.x >= 505) {
      this.x = -20;
      this.speed = 125 + Math.floor(Math.random() * 200 + 1);
    }

// Handles player collision detection and updates score || source https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
if (this.x < player.x + 65 &&
    this.x + 78 > player.x &&
    this.y < player.y + 40 &&
    70 + this.y > player.y) {
      score -= 25;
      scoreValue.innerText = score;
      totalLives--
      lives.innerText = totalLives;
      if (totalLives === 0) {
        gameOver();
      }
      setTimeout(() => {
        player.reset();
      }, -10)
    }
  };

  // Puts enemy on the screen
  Enemy.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

// Creates a player class with a function
    function Player(x, y,) {
        this.x = x
        this.y = y
        this.sprite = 'images/char-boy.png';
    }

// Keeps player in bounds, resets and gives score of 50 
Player.prototype.update = function(dt) {
    let scoreValue = document.querySelector('.scoreValue');

if (this.x > 405) {
    this.x = 405;
}

if (this.x < -2) {
    this.x = -2;
}

if (this.y > 405) {
    this.y = 405;
}

if (this.y < -8) {
    this.y = -8;
    setTimeout(() => {
        player.reset();
    }, 25);
    score += 200;
    scoreValue.innerText = score;
  }
};

// Puts player in the starting point
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

  // Parameters for the (e) arrow keys
  Player.prototype.handleInput = function(move) {
        if (move == 'left') {
            this.x -= 90
        } else if (move == 'right') {
            this.x += 90
        } else if (move == 'up') {
            this.y -= 90
        } else if (move == 'down') {
            this.y += 90
        }  
};  

// Resets the player position when called
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 420;
};

// Creates all enemy objects into an array
const allEnemies = [
    new Enemy(-100, 225, 100),
    new Enemy(-100, 60, 150), 
    new Enemy(-100, 145, 125)
   ];

// Creates a new player
const player = new Player(203, 405);   

// This listens to key presses to move the player
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Game Over function is called when 0 lives are left - resets all variables
function gameOver() {
    const restart = document.querySelector('#clickRestart');
    const modal = document.querySelector('.gameRestart');
    let lives = document.querySelector('.livesValue');
    let scoreValue = document.querySelector('.scoreValue');
    let finalLives = document.getElementById('finalLives');
    let finalScore = document.getElementById('finalScore');
  
    modal.classList.add('visible');
    finalLives.innerText = totalLives;
    finalScore.innerText = score;
    restart.addEventListener('click', () => {
      player.reset();
      score = 0;
      totalLives = 10;
      scoreValue.innerText = score;
      lives.innerText = totalLives;
      modal.classList.remove('visible');
    })
  }
