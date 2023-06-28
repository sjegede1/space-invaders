// DOM Elements
const playerSprite = document.querySelector(".player-sprite");
const gameScreen = document.querySelector(".game-screen");
const gameScreenRect = gameScreen.getBoundingClientRect();
let frameRateDelay = 17 * 0;
const projectileDiv = document.createElement('div')
projectileDiv.className = "projectile"


// Objects and Global Variables
keyCodeMap = {
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  Shift: { pressed: false },
  Space: { pressed: false },
};

// Event Listeners
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      console.log(event.key, " KEYDOWN");
      keyCodeMap[event.key].pressed = 1;
      break;
    case "ArrowLeft":
      console.log(event.key, " KEYDOWN");
      keyCodeMap[event.key].pressed = 1;
      break;
    case "Shift":
      console.log(event.key, " KEYDOWN");
      keyCodeMap[event.key].pressed = 1;
      break;
    case " ":
      console.log(event.code, " KEYDOWN");
      keyCodeMap[event.code].pressed = 1;
      break;
    default:
      console.log(event.key, " KEYDOWN Not configured");
  }
});

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowRight":
      console.log(event.key, " KEYUP");
      keyCodeMap[event.key].pressed = 0;
      break;
    case "ArrowLeft":
      console.log(event.key, " KEYUP");
      keyCodeMap[event.key].pressed = 0;
      break;
    case "Shift":
      console.log(event.key, " KEYUP");
      keyCodeMap[event.key].pressed = 0;
      break;
    case " ":
      console.log(event.code, " KEYUP");
      keyCodeMap[event.code].pressed = 0;
      break;
    default:
      console.log(event.key, " KEYDOWN Not configured");
  }
});

// Player Class
class Player {
  constructor() {
    this.health = 100;
    this.speed = 5; // Number of pixels we move on each press
    let { width, height } = playerSprite.getBoundingClientRect();
    this.positionX = 0;
    this.positionY =  height;
    this.width = width;
    this.height = height;
    this.projectiles = [];
    this.radius = 30;
  }

  checkBoundaries = () => {
    let currentPosition = playerSprite.getBoundingClientRect();
    this.positionX = currentPosition.x - gameScreenRect.x;
    // Check Left and Right
    if (this.positionX < 0) {
      playerSprite.style.left = "1px";
      console.log("Left Boundary");
      return false;
    } else if (this.positionX > gameScreenRect.width - this.width) {
      playerSprite.style.left = `${gameScreenRect.width - this.width -1}px`;
      console.log("Right Boundary");
      return false;
    }
    return true;
  };

  move = () => {
    if (!this.checkBoundaries()) {
      console.log("STOP");
      return {};
    }

    if (keyCodeMap.ArrowRight.pressed && keyCodeMap.ArrowLeft.pressed) {
      console.log("RIGHT+LEFT");
      return {};
    } else if (keyCodeMap.ArrowRight.pressed) {
      this.positionX += this.speed;
      playerSprite.style.left = this.positionX + "px";
    } else if (keyCodeMap.ArrowLeft.pressed) {
      this.positionX -= this.speed;
      playerSprite.style.left = `${this.positionX}px`;
    }
  };

  shoot = () => {
    let projectile = new Projectile(this);
    if (keyCodeMap.Space.pressed) {
        projectile.fire()
        keyCodeMap.Space.pressed = 0;
        console.log('FIRE!!')
    }
    
  }

  update = () => {
    //Log all changes in the character
    this.move();
    this.shoot()
  };

}

// Projectile Class
class Projectile {
    constructor(Player) {
        this.player = Player;
        this.speed = 5;
        this.radius = 20;
        this.div = projectileDiv.cloneNode()
        this.positionX = this.player.positionX
        this.positionY = this.player.positionY
    }

    fire = () => {
        this.div.style.left = `${this.positionX}px`
        this.div.style.bottom = `${this.positionY}px`
        gameScreen.append(this.div)
        this.div.classList.toggle("projectile-shoot")
    }
}

let player = new Player();

const runGame = () => {
  player.update();
  requestAnimationFrame(runGame);
};

runGame();
