// DOM Elements
const playerSprite = document.createElement('div');
playerSprite.className = "player-sprite";
const playerSpriteImg = document.createElement("img");
playerSpriteImg.className = "player-sprite-img"

const gameScreen = document.querySelector(".game-screen");
const gameScreenRect = gameScreen.getBoundingClientRect();
let frameRateDelay = 17 * 0;
const projectileDiv = document.createElement("div");
projectileDiv.className = "projectile";
const enemyDiv = document.createElement("div");
enemyDiv.classList = "enemy-sprite";

let players = []
let enemies = [];
let playerProjectiles = [];
let enemyProjectiles = [];

// OBJECTS AND GLOBAL VARIABLES
let keyCodeMap = {
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  Shift: { pressed: false },
  Space: { pressed: false },
  KeyD: {pressed: false},
  KeyA: {pressed: false},
};
// Players and characteristics
playerFeatures = [
    {
        name: "player1",
        getHealth: () => {return randomNumberBetween(100,100)},
        src: {left:"./assets/sprites/players/players-player-1-1.png",right:"./assets/sprites/players/players-player-1-25.png",idle:"./assets/sprites/players/players-player-1-13.png"},
        width: 50,
        height: 50,
    },
    {
        name: "player2",
        getHealth: () => {return randomNumberBetween(100,100)},
        src: {left:"./assets/sprites/players/players-player-2-1.png",right:"./assets/sprites/players/players-player-2-25.png",idle:"./assets/sprites/players/players-player-2-13.png"},
        width: 50,
        height: 50,
    }
]

// Enemy Characteristics
//TODO: Build out enemies
enemyFeatures = [
  {
    name: "enemy-1",
    getHealth: () => {return randomNumberBetween(100,100)},
    src: {},
    width: 50,
    height: 50,
  },
]


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
    case "a":
    case "A":
      console.log(event.code, " KEYDOWN");
      keyCodeMap[event.code].pressed = 1;
      break;
    case "d":
    case "D":
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
    case "a":
    case "A":
        console.log(event.code, " KEYUP");
        keyCodeMap[event.code].pressed = 0;
        break;
    case "d":
    case "D":
        console.log(event.code, " KEYUP");
        keyCodeMap[event.code].pressed = 0;
        break;
    default:
      console.log(event.key, " KEYUP Not configured");
  }
});

// Player Class
class Player {
  constructor(playerFeatures) {
    let {name,getHealth, src, width,height} = playerFeatures;
    this.name = name;
    this.src = src;
    this.health = getHealth();
    this.speed = 5; // Number of pixels we move on each press
    this.div = playerSprite.cloneNode();
    gameScreen.append(this.div)
    this.div.append(playerSpriteImg.cloneNode())
    this.div.querySelector('img').src = this.src.idle
    // let { width, height } = this.div.getBoundingClientRect();
    this.positionX = 0;
    this.positionY = height;
    this.width = width;
    this.height = height;
    this.projectiles = [];
    this.radius = Math.min(this.width / 2, this.height / 2);
    players.push(this)
  }

  checkBoundaries = () => {
    let currentPosition = this.div.getBoundingClientRect();
    this.positionX = currentPosition.x - gameScreenRect.x;
    this.positionY =
      gameScreenRect.y + gameScreenRect.height - currentPosition.y;
    // Check Left and Right
    if (this.positionX < 0) {
      this.div.style.left = "1px";
      console.log("Left Boundary");
      return false;
    } else if (this.positionX > gameScreenRect.width - this.width) {
      this.div.style.left = `${gameScreenRect.width - this.width - 1}px`;
      console.log("Right Boundary");
      return false;
    }
    return true;
  };

  move = () => {
    if (!this.checkBoundaries()) {
      return {};
    }

    if (this.name == "player1") {
        if (keyCodeMap.ArrowRight.pressed && keyCodeMap.ArrowLeft.pressed) {
            console.log("RIGHT+LEFT");
            return {};
          } else if (keyCodeMap.ArrowRight.pressed) {
            this.positionX += this.speed;
            this.div.style.left = this.positionX + "px";
            this.div.querySelector('img').src = this.src.right
          } else if (keyCodeMap.ArrowLeft.pressed) {
            this.positionX -= this.speed;
            this.div.style.left = `${this.positionX}px`;
            this.div.querySelector('img').src = this.src.left
          } else {
              this.reset()
          }
    } else if (this.name == "player2") {
        if (keyCodeMap.KeyD.pressed && keyCodeMap.KeyA.pressed) {
            console.log(" RIGHT+LEFT Player2");
            return {};
          } else if (keyCodeMap.KeyD.pressed) {
            this.positionX += this.speed;
            this.div.style.left = this.positionX + "px";
            this.div.querySelector('img').src = this.src.right
          } else if (keyCodeMap.KeyA.pressed) {
            this.positionX -= this.speed;
            this.div.style.left = `${this.positionX}px`;
            this.div.querySelector('img').src = this.src.left
          } else {
              this.reset()
          }
    }
    
  };

  reset = () => {
    this.div.querySelector('img').src = this.src.idle
  }

  shoot = () => {
    let projectile = new Projectile(this);

    if (keyCodeMap.Space.pressed && this.name == "player1") {
      projectile.init();
      projectile.fire();
      keyCodeMap.Space.pressed = 0;
      playerProjectiles.push(projectile);
      console.log("FIRE!!");
    } else if (keyCodeMap.Shift.pressed && this.name == "player2") {
        projectile.init();
        projectile.fire();
        keyCodeMap.Shift.pressed = 0;
        playerProjectiles.push(projectile);
        console.log("FIRE!!");
  };
}

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
    // this.width;
    // this.height;
    this.projectiles = [];
    this.positionX = 0;
    this.positionY = 0;
    // this.radius;
    this.start = new Date(); //start of enemy creation
    this.period = 150;
    gameScreen.append(this.div);
    enemies.push(this);
    let { width, height } = this.div.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.radius = Math.min(this.width / 2, this.height / 2);
  }

//   init = () => {
//     gameScreen.append(this.div);
//     enemies.push(this);
//     let { width, height } = this.div.getBoundingClientRect();
//     this.width = width;
//     this.height = height;
//     this.radius = Math.min(this.width / 2, this.height / 2);
//   };

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
    this.speed = 1;
    this.div = projectileDiv.cloneNode();
    this.positionX = this.player.positionX;
    this.positionY = this.player.positionY;
    this.width;
    this.height;
    this.radius;
    this.power = 5;
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



//FUNCTIONS
//Functions to randomly generate numbers
const randomNumberBetween = (min,max) => {
    return Math.floor(min + Math.random()*(max-min))
}

// Run game and initiate classes
let player = new Player(playerFeatures[0]);

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

// Check for 

//Enemies Fire the weapons periodically
setInterval(() => {
  enemies.forEach((enemy) => {
    enemy.shoot();
  });
}, 1000);

//animate the whole game
const runGame = () => {
  //Animate Player1
  players.forEach((player) => player.update());
  enemies.forEach((enemy) => enemy.update());

  // zMove Projectiles
  playerProjectiles.forEach(moveProjectiles);
  enemyProjectiles.forEach(moveProjectiles);

  // Check Collision
  //TODO: Abstract this to a function that takes args (projectiles,players/enemies)
  // Enemy projectiles hit player
  enemyProjectiles.forEach((projectile,projectileIndex,projectilesArray) => {
    players.forEach((player) => {
      if (checkCollision(projectile, player)) {
        projectile.div.style.backgroundColor = "red";
        player.health -= projectile.power;
        console.log("OUCH!",player.name,"Health is",player.health)
        projectile.div.remove();
        projectilesArray.splice(projectileIndex,1)
      }
    }
    )});
  // Player projectiles hit Enemy
  playerProjectiles.forEach((projectile,projectileIndex,projectilesArray) => {
    enemies.forEach((enemy) => {
      if (checkCollision(projectile, enemy)) {
        projectile.div.style.backgroundColor = "green";
        enemy.health -= projectile.power;
        console.log("GOT 'EM! ENEMY Health is",enemy.health)
        projectile.div.remove();
        projectilesArray.splice(projectileIndex,1)
      }
    });
  });                      

  requestAnimationFrame(runGame);
};

//Run the game animation
runGame();

//TODO: Build add animations and images for each enemy
// Create animation for destruction and explosion
// Create basic game flow
