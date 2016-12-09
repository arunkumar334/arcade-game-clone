// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //to make enemy start from outside of the boundary
    this.x = -50; 
    // choosing random value between 1 to 3(that is from 83 or 166 or 249), negative sign (-30) is to set the bug in middle of the tile
    this.y = 83 * (Math.floor((Math.random() * 3) + 1)) - 30; 
    //choosing random speed between 1 to 5(101 or 202 or ...or 505)
    this.speed = 101 * Math.floor(Math.random() * 5 + 1); 

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var score = 0;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);
//if enemy goes outside canvas, it gets deleted from its array and new enemy is pushed in the array
    if (this.x > 505) {
        var findIndex = allEnemies.indexOf(this);//find the position of current enemy in the array
        allEnemies.splice(findIndex, 1);//removing it from array
        allEnemies.push(new Enemy());//adding new enemy to the array
    }
//checking for collision
    var collisionDistance = this.x - player.x;
    if (this.y === player.y && collisionDistance > -61 && collisionDistance < 50) {
        score--; //score is decreased by one on every collision
        player.reset();//on collision, player goes to starting tile
    }
//printing the score in the screen
    document.getElementById("score").innerHTML = score;//current score is displayed

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
   //setting initial position of player
    this.x = 202;
    this.y = 415 - 30; //-30 is to put the player in the middle of the tile
    this.sprite = 'images/char-boy.png';

};

// Update the player's position, required method for the game
Player.prototype.update = function(dt) {
    //position is reset when player reach the water level. 
    if (this.y < 53) {
        score++;//score increased by one when player reaches water level
        this.reset();
    }
    document.getElementById("score").innerHTML = score;//score is displayed
};

// Draw the player on the screen, required method for the game
Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//function to reset the player's position to the starting point
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 415 - 30;
};

Player.prototype.handleInput = function(keyCode) {
    //move the player according to the key pressed and player stays within boundary

       if (keyCode === 'up') {
        this.y = this.y - 83;
    }
    else if (keyCode === 'down' && this.y < 415 - 30) {
        this.y = this.y + 83;
    }
    else if (keyCode === 'left' && this.x > 0) {
        this.x = this.x - 101;
    }
    else if (keyCode === 'right' && this.x < 404) {
        this.x = this.x + 101;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
totalEnemies = 3;
for (i = 0; i < totalEnemies; i++) {
        allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
