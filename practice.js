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

// OBJECTS AND GLOBAL VARIABLES
keyCodeMap = {
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  Shift: { pressed: false },
  Space: { pressed: false },
};
// Enemy Types and characteristics
enemiesFeatures = [
    {
        health: [10,15],
        period: [500,700],
        src: [],
        width: 20,
        height: 20,
    },
    {

    }
]

// Power ups for Player


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
    this.speed = 15; // Number of pixels we move on each press
    let { width, height } = playerSprite.getBoundingClientRect();
    this.positionX = 0;
    this.positionY = height;
    this.width = width;
    this.height = height;
    this.projectiles = [];
    this.radius = Math.min(this.width / 2, this.height / 2);
    this.div = playerSprite;
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
    this.div = enemyDiv.cloneNode();
    this.width;
    this.height;
    this.projectiles = [];
    this.positionX = 0;
    this.positionY = 0;
    this.radius;
    this.start = new Date(); //start of enemy creation
    this.period = 150;
  }

  init = () => {
    gameScreen.append(this.div);
    enemies.push(this);
    let { width, height } = this.div.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.radius = Math.min(this.width / 2, this.height / 2);
  };

  move = () => {
    let Amp = 0.5 * (gameScreenRect.width - this.width);
    let freq = 1 / this.period;
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
      console.log("ENEMY FIRE!! Shift KeyPRess");
    }
    


    projectile.init();
    projectile.fire();
    enemyProjectiles.push(projectile);
    // console.log("FIRE!! ");
  };

  update = () => {
    //Log all changes in the character
    this.move();
  };
}

// Projectile Class
class Projectile {
  constructor(Player) {
    this.player = Player;
    this.speed = 100;
    this.div = projectileDiv.cloneNode();
    this.positionX = this.player.positionX;
    this.positionY = this.player.positionY;
    this.width;
    this.height;
    this.radius;
  } 

  init = () => {
    gameScreen.append(this.div);
    let { width, height } = this.div.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.radius = Math.min(this.width / 2, this.height / 2);
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
//Functions to randomly generate numbers
const randomNumberBetween = (min,max) => {
    return Math.floor(min + Math.random()*(max-min))
}

// Check for collision

const checkCollision = (projectile, player) => {
  let projectileRect = projectile.div.getBoundingClientRect();
  let playerRect = player.div.getBoundingClientRect();
  let dx;
  let dy;

  if (player instanceof Player) {
    [playerPosition, projectilePosition] = [
      {
        x: playerRect.x + 0.5 * playerRect.width,
        y: playerRect.y + 0.5 * playerRect.height,
      },
      {
        x: projectileRect.x + 0.5 * projectileRect.width,
        y: projectileRect.y + 0.5 * projectileRect.height,
      },
    ];
    dx = Math.abs(projectilePosition.x - playerPosition.x);
    dy = Math.abs(projectilePosition.y - playerPosition.y);
  } else if (player instanceof Enemy) {
    [playerPosition, projectilePosition] = [
      {
        x: playerRect.x + 0.5 * playerRect.width,
        y: playerRect.y + 0.5 * playerRect.height,
      },
      {
        x: projectileRect.x + 0.5 * projectileRect.width,
        y: projectileRect.y + 0.5 * projectileRect.height,
      },
    ];
    dx = Math.abs(projectilePosition.x - playerPosition.x);
    dy = Math.abs(projectilePosition.y - playerPosition.y);
  }

  return Math.hypot(dx, dy) < projectile.radius + player.radius;
};

// Function to move the bullets
const moveProjectiles = (projectile, index, array) => {
  projectile.positionY += projectile.speed;
  if (projectile.player instanceof Player) {
    projectile.div.style.bottom = `${projectile.positionY}px`;
  } else {
    projectile.div.style.top = `${projectile.positionY}px`;
  }

  if (projectile.positionY > gameScreenRect.height - projectile.height) {
    projectile.div.remove();
    array.splice(index, 1);
  }
};

//Fire the weapons periodically
setInterval(() => {
  enemies.forEach((enemy) => {
    enemy.shoot();
  });
}, 1000);

//animate the whole game
const runGame = () => {
  //Animate Player1
  player.update();
  enemies.forEach((enemy) => enemy.update());

  // zMove Projectiles
  playerProjectiles.forEach(moveProjectiles);
  enemyProjectiles.forEach(moveProjectiles);

  // Check Collision
  // Enemy projectiles hit player
  enemyProjectiles.forEach((projectile) => {
    if (checkCollision(projectile, player)) {
      projectile.div.style.backgroundColor = "red";
    }
  });
  // Player projectiles hit Enemy
  playerProjectiles.forEach((projectile) => {
    enemies.forEach((enemy) => {
      if (checkCollision(projectile, enemy)) {
        projectile.div.style.backgroundColor = "green";
      }
    });
  });                      

  requestAnimationFrame(runGame);
};

//Run the game animation
runGame();
