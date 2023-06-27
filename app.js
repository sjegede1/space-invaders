// DOM Elements
const goodGuy = document.querySelector(".player-sprite");
const goodGuyPew = document.querySelector('.player-projectile')

// Objects and Global Variables
keyCodeMap = {
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  Shift: { pressed: false },
  Space: { pressed: false },
};

// Event Listeners
document.addEventListener('keydown', (event) => {
    console.log(event)
    //I'm using the one statement istead of multiple
    switch (event.key) {
        case "ArrowRight":
            console.log(event.key, ' KEYDOWN');
            keyCodeMap[event.key].pressed = 1;
            break;
        case "ArrowLeft":
            console.log(event.key, ' KEYDOWN');
            keyCodeMap[event.key].pressed = 1;
            break;
        case "Shift":
            console.log(event.key, ' KEYDOWN');
            keyCodeMap[event.key].pressed = 1;
            break;
        case " ":
            console.log(event.code, ' KEYDOWN');
            keyCodeMap[event.code].pressed = 1;
            break;
        default:
            console.log(event.key, ' KEYDOWN Not configured')
    }
})

document.addEventListener('keyup', (event) => {
    // console.log(event.key, ' KEYDOWN');
    // keyCodeMap[event.key].pressed = 0;
    switch (event.key) {
        case "ArrowRight":
            console.log(event.key, ' KEYUP');
            keyCodeMap[event.key].pressed = 0;
            break;
        case "ArrowLeft":
            console.log(event.key, ' KEYUP');
            keyCodeMap[event.key].pressed = 0;
            break;
        case "Shift":
            console.log(event.key, ' KEYUP');
            keyCodeMap[event.key].pressed = 0;
            break;
        case " ":
            console.log(event.code, ' KEYUP');
            keyCodeMap[event.code].pressed = 0;
            break;
        default:
            console.log(event.key, ' KEYDOWN Not configured')
    }
})

// Player Class
class Player {
  constructor() {
    this.health = 100;
    this.speed = 5; // Number of pixels we move on each press
    this.positionX = 0;
    this.projectile = new Projectile(this,{});
  }
  move = () => {
    if (keyCodeMap.ArrowRight.pressed && keyCodeMap.ArrowLeft.pressed) {
      console.log("RIGHT+LEFT");
      return {};
    } else if (keyCodeMap.ArrowRight.pressed) {
      this.positionX += this.speed;
      goodGuy.style.left = this.positionX + "px";
    } else if (keyCodeMap.ArrowLeft.pressed) {
      this.positionX -= this.speed;
      goodGuy.style.left = this.positionX + "px";
    }
  };

  update = () => {
    //Log all changes in the character
    this.move();
    this.projectile.fire()
  };
}

// Projectile Class
class Projectile {
    constructor(user,projectileType) {
        //User is either the enemy or the player that is firing the weapon 
        this.user = user;
        this.projectileType = projectileType; //this tells you the projectile damage and image and animation, speed. This will be an object
        this.isFired = false;
        this.speed = 1; // Use from object later
        this.positionX = 0;
    }
    
    getUserPosition = () => {
        return this.user.positionX
    }
    fire = () => {
        this.positionX = this.getUserPosition();
        if (keyCodeMap.Space.pressed) {
            console.log("I'M FIRING MY LASER")
            console.log(goodGuyPew)
            goodGuyPew.style.left = this.positionX + 'px';
        }
    }
}


let player = new Player();

const runGame = () => {
  player.update();
  console.log("running");
  requestAnimationFrame(runGame);
};

runGame();
