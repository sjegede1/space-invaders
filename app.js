// DOM Elements
const playerSprite = document.querySelector(".player-sprite");
const gameScreen = document.querySelector(".game-screen");
const gameScreenRect = gameScreen.getBoundingClientRect();
let frameRateDelay = 17 * 0;
const projectileDiv = document.createElement("div");
projectileDiv.className = "projectile";
const enemyDiv = document.createElement("div");
enemyDiv.classList = "enemy-sprite";

let enemies = [];
let playerProjectiles = [];
let enemyProjectiles = [];

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
    this.positionY = height;
    this.width = width;
    this.height = height;
    this.projectiles = [];
    this.radius = 30;
  }

  checkBoundaries = () => {
    let currentPosition = playerSprite.getBoundingClientRect();
    this.positionX = currentPosition.x - gameScreenRect.x;
    this.positionY =
      gameScreenRect.y + gameScreenRect.height - currentPosition.y;
    // Check Left and Right
    if (this.positionX < 0) {
      playerSprite.style.left = "1px";
      console.log("Left Boundary");
      return false;
    } else if (this.positionX > gameScreenRect.width - this.width) {
      playerSprite.style.left = `${gameScreenRect.width - this.width - 1}px`;
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
      projectile.init();
      projectile.fire();
      keyCodeMap.Space.pressed = 0;
      playerProjectiles.push(projectile);
      console.log("FIRE!!");
    }
  };

  update = () => {
    //Log all changes in the character
    this.move();
    this.shoot();
  };
}

// Enemy Class
class Enemy {
  constructor() {
    this.health = 100;
    this.speed = 5; // Number of pixels we move on each press
    this.div = enemyDiv.cloneNode();
    this.width;
    this.height;
    this.projectiles = [];
    this.positionX = 0;
    this.positionY = 0;
    this.radius;
    this.start = new Date(); //start of enemy creation
  }
  init = () => {
    gameScreen.append(this.div);
    enemies.push(this);
    let { width, height } = this.div.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.radius = Math.hypot(this.width / 2, this.height / 2);
  };

  checkBoundaries = () => {};

  move = () => {
    let Amp = 0.5 * (gameScreenRect.width - this.width);
    let freq = 1 / 1000;
    let currentTime = new Date() - this.start;
    this.positionX = -Amp * Math.cos(freq * currentTime) + Amp;

    this.div.style.left = `${this.positionX}px`;
  };

  shoot = () => {
    let projectile = new Projectile(this);

    if (keyCodeMap.Shift.pressed) {
      projectile.init();
      projectile.fire();
      keyCodeMap.Shift.pressed = 0;
      enemyProjectiles.push(projectile);
      console.log("FIRE!!");
    }

    projectile.init();
    projectile.fire();
    enemyProjectiles.push(projectile);
    console.log("FIRE!!");
  };

  update = () => {
    //Log all changes in the character
    this.move();
    // this.shoot()
  };
}

// Projectile Class
class Projectile {
  constructor(Player) {
    this.player = Player;
    this.speed = 5;
    this.div = projectileDiv.cloneNode();
    this.positionX = this.player.positionX;
    this.positionY = this.player.positionY;
    this.width;
    this.height;
    this.radius = Math.hypot(this.width / 2, this.height / 2);
  }

  init = () => {
    gameScreen.append(this.div);
    let { width, height } = this.div.getBoundingClientRect();
    this.width = width;
    this.height = height;
    if (this.player instanceof Enemy) {
      this.div.classList += " enemy";
      this.positionY += this.player.height;
    }
  };

  fire = () => {
    if (this.player instanceof Player) {
      this.div.style.left = `${
        this.positionX + this.player.width / 2 - this.width / 2
      }px`;
      this.div.style.bottom = `${this.positionY}px`;
      // this.div.classList.toggle("projectile-shoot")
    } else {
      this.div.style.left = `${
        this.positionX + this.player.width / 2 - this.width / 2
      }px`;
      this.div.style.top = `${this.positionY + this.player.height}px`;
    }
  };
}

// Run game and initiate classes
let player = new Player();

//FUNCTIONS
// Function to move the bullets
const moveProjectiles = (projectile,index,array) => {
  projectile.positionY += projectile.speed;
  if (projectile.player instanceof Player) {
    projectile.div.style.bottom = `${projectile.positionY}px`;
  } else {
    projectile.div.style.top = `${projectile.positionY}px`;
  }

  if (projectile.positionY > (gameScreenRect.height - projectile.height)) {
    console.log("LASER END");
    projectile.div.remove();
    array.splice(index,1)
  }
};

//Fire the weapons periodically
setInterval(() => {
  enemies.forEach((enemy) => {
    enemy.shoot();
    setTimeout(enemy.shoot,50);
    setTimeout(enemy.shoot,80);
  });
}, 500);

//animate the whole game
const runGame = () => {
  //Animate Player1
  player.update();
  enemies.forEach((enemy) => enemy.update());

  //Move Projectiles
  playerProjectiles.forEach(moveProjectiles);
  enemyProjectiles.forEach(moveProjectiles);

  //Delete

  requestAnimationFrame(runGame);
};

//Run the game animation
runGame();
