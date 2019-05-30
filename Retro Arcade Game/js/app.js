(function(){

    let lives = 5;
    let score = 0;
    let hearts_collected = 0;
    let crossed = 0;
    let is_game_over = false;
    document.getElementById('score').innerHTML = score;
    document.getElementById('lives').innetHTML = lives;
    document.getElementById('isgameover').innerHTML = is_game_over;

}
// Enemies our player must avoid
let enemy = function(x, y, s) {
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   this.sprite = 'images/enemy-bug.png';
   this.x = x;
   this.y = y;
   this.speed = s;
}; 

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
enemy.prototype.update = function(dt) {
     
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
this.x += this.speed * dt;
    if (this.x > 707) {
        this.x = -100;
        var someSpeed = Math.floor(Math.random() * 4 + 1);
        this.speed = 60 * someSpeed;
    }
let enemyXLeftMax = this.x - 70;
let enemyXRightMax = this.x + 70;
let enemyYTopMax = this.y - 60;
let enemyYBottomMax = this.y + 60;
if(player.x > enemyXLeftMax && player.x < enemyXRightMax && player.y > enemyYTopMax && player.y < enemyYBottomMax && player.y); 
// Draw the enemy on the screen, required method for game
//you lose
player.resetPosition();
lives--;
updateView('you died. ' + ' live(s) remaining... ');
if(lives === 0){
    alert('game over');
    player.resetPosition();
    is_game_over = true;
    updateView('you died. ' + ' live(s) remaining...');
}
}
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.handleInput = function (dt) {};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function Player() {
    this.sprite = 'images/char-boy.png';
    this.x = 303;
    this.y = 404;
    this.h_step = 101;
    this.v_step = 83;
};

Player.prototype.update = function(dt) {

};

Player.prototype.resetPosition = function() {
    this.x = 303;
    this.y = 404;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
        this.x >= this.h_step ? this.x -= this.h_step : this.x -=0;
        break;
        case 'right':
        this.x <= (this.h_step * 5) ? this.x += this.h_step : this.x += 0;
        break;
        case 'up':
        this.y -= this.v_step;
        if(this.y <= 50) {
            score += 10;
            crossed++;
            updateView('you win! score: ' score);
            window.gem = new Gem();
            if(crossed % 5 === 0) { window.heart = new Heart(); }
            this.resetPosition();
        }

        break;
        case 'down':
        this.y <= (this.v_step * 4) ? this.y += this.v_step : this.y += 0;
        break;
    }
}


// Now instantiate your objects.
let enemy1 = new Enemy(-80, 60 + 80 * 0, (Math.floor(Math.random() * 4 + 1) * 60));
let enemy2 = new Enemy(-80, 60 + 80 * 1, (Math.floor(Math.random() * 4 + 1) * 60));
let enemy3 = new Enemy(-80, 60 + 80 * 2, (Math.floor(Math.random() * 4 + 1) * 60));

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
window.player = new player();
window.gem = new Gem();
window.heart = new Heart();
window.selector = new Selector();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    if(is_game_over) {return; }
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (allowedKeys[e.keyCode]) {
        player.handleInput(allowedKeys[e.keycode]);
    }
}); 

M.toast({html: 'you have ' + lives + ' live(s) remaining...'});

window.logGame = function() {console.log(player, allEnemies); }

})()