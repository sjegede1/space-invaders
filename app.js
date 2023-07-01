// DOM Elements
const playerSprite = document.createElement("div");
playerSprite.className = "player-sprite";
const playerSpriteImg = document.createElement("img");
playerSpriteImg.className = "player-sprite-img";

let playerPointsDiv = document.querySelector(".player-points");
let playerPoints = 0;

const enemySprite = document.createElement("div");
enemySprite.classList = "enemy-sprite";
const enemySpriteImg = document.createElement("img");
enemySpriteImg.classList = "enemy-sprite-img";

const gameScreen = document.querySelector(".game-screen");
const gameScreenRect = gameScreen.getBoundingClientRect();
let frameRateDelay = 17 * 0;
const projectileDiv = document.createElement("div");
projectileDiv.className = "projectile";

//Buttons
const startGameButton = document.querySelector("#start-game");

let players = [];
let enemies = [];
let playerProjectiles = [];
let enemyProjectiles = [];

let round = 1;
let roundWin = 0;
let gameOver = 0;
let twoPlayerMode = 1;
let bossLevel = 3;

// OBJECTS AND GLOBAL VARIABLES
let keyCodeMap = {
  ArrowRight: { pressed: false },
  ArrowLeft: { pressed: false },
  Shift: { pressed: false },
  Space: { pressed: false },
  KeyD: { pressed: false },
  KeyA: { pressed: false },
};
// Players and characteristics
playerFeatures = {
  "player-1": {
    name: "player-1",
    getHealth: () => {
      return randomNumberBetween(100, 100);
    },
    src: {
      left: "./assets/sprites/players/players-player-1-1.png",
      right: "./assets/sprites/players/players-player-1-25.png",
      idle: "./assets/sprites/players/players-player-1-13.png",
      laser:
        "https://www.pngkit.com/png/full/267-2674448_blast-harrier-laser-laser.png",
    },
    width: 50,
    height: 50,
  },
  "player-2": {
    name: "player-2",
    getHealth: () => {
      return randomNumberBetween(100, 100);
    },
    src: {
      left: "./assets/sprites/players/players-player-2-1.png",
      right: "./assets/sprites/players/players-player-2-25.png",
      idle: "./assets/sprites/players/players-player-2-13.png",
      laser:
        "https://www.pngkit.com/png/full/267-2674448_blast-harrier-laser-laser.png",
    },
    width: 50,
    height: 50,
  },
};

// Enemy Characteristics
//TODO: Build out enemies
enemyFeatures = {
  "enemy-1": {
    name: "enemy-1",
    getHealth: () => {
      return randomNumberBetween(30, 35);
    },
    src: {
      idle: "/assets/sprites/enemy-1/enemy-1-moving-1.png",
      laser: "/assets/sprites/players/players-blast-small-1.png",
    },
    width: 50,
    height: 50,
    periodX: 500,
    periodY: 500,
    power: 5,
    projectileSpeed: 10,
    probability: 0.5,
  },
  "enemy-2": {
    name: "enemy-2",
    getHealth: () => {
      return randomNumberBetween(55, 60);
    },
    src: {
      idle: "/assets/sprites/enemy-2/enemy-2-moving-1.png",
      laser: "/assets/sprites/players/players-blast-small-1.png",
    },
    width: 80,
    height: 80,
    periodX: 1500,
    periodY: 150000,
    power: 10,
    projectileSpeed: 5,
    probability: 0.25,
  },
  "enemy-3": {
    name: "enemy-3",
    getHealth: () => {
      return randomNumberBetween(10, 15);
    },
    src: {
      idle: "/assets/sprites/enemy-3/enemy-3-moving-1.png",
      laser: "/assets/sprites/players/players-blast-small-1.png",
    },
    width: 40,
    height: 40,
    periodX: 1500,
    periodY: 200,
    power: 2,
    projectileSpeed: 20,
    probability: 0.8,
  },
};

// Weapons Characteristics
projectileFeatures = {
  laser: {},
  blast: {},
  "large-blast": {},
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
    let { name, getHealth, src, width, height } = playerFeatures;
    this.name = name;
    this.src = src;
    this.health = getHealth();
    this.speed = 10; // Number of pixels we move on each press
    this.div = playerSprite.cloneNode();
    this.div.append(playerSpriteImg.cloneNode());
    gameScreen.append(this.div);
    this.div.querySelector("img").src = this.src.idle;
    // let { width, height } = this.div.getBoundingClientRect();
    this.positionX = 0;
    this.positionY = height;
    this.width = width;
    this.div.style.width = `${this.width}px`;
    this.height = height;
    this.div.style.height = `${this.width}px`;
    this.projectiles = [];
    this.radius = Math.min(this.width / 2, this.height / 2);
    players.push(this);
    this.projectileSpeed = 10;
    this.power = 10;
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

    if (this.name == "player-1") {
      if (keyCodeMap.ArrowRight.pressed && keyCodeMap.ArrowLeft.pressed) {
        console.log("RIGHT+LEFT");
        return {};
      } else if (keyCodeMap.ArrowRight.pressed) {
        this.positionX += this.speed;
        this.div.style.left = this.positionX + "px";
        this.div.querySelector("img").src = this.src.right;
      } else if (keyCodeMap.ArrowLeft.pressed) {
        this.positionX -= this.speed;
        this.div.style.left = `${this.positionX}px`;
        this.div.querySelector("img").src = this.src.left;
      } else {
        this.reset();
      }
    } else if (this.name == "player-2") {
      if (keyCodeMap.KeyD.pressed && keyCodeMap.KeyA.pressed) {
        console.log(" RIGHT+LEFT Player2");
        return {};
      } else if (keyCodeMap.KeyD.pressed) {
        this.positionX += this.speed;
        this.div.style.left = this.positionX + "px";
        this.div.querySelector("img").src = this.src.right;
      } else if (keyCodeMap.KeyA.pressed) {
        this.positionX -= this.speed;
        this.div.style.left = `${this.positionX}px`;
        this.div.querySelector("img").src = this.src.left;
      } else {
        this.reset();
      }
    }
  };

  reset = () => {
    this.div.querySelector("img").src = this.src.idle;
  };

  shoot = () => {
    let projectile = new Projectile(this);

    if (keyCodeMap.Space.pressed && this.name == "player-1") {
      projectile.init();
      projectile.fire();
      keyCodeMap.Space.pressed = 0;
      playerProjectiles.push(projectile);
      console.log("FIRE!!");
    } else if (keyCodeMap.Shift.pressed && this.name == "player-2") {
      projectile.init();
      projectile.fire();
      keyCodeMap.Shift.pressed = 0;
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
  constructor(enemyFeatures) {
    let {
      name,
      getHealth,
      src,
      width,
      height,
      periodX,
      periodY,
      power,
      projectileSpeed,
      probability,
    } = enemyFeatures;
    this.name = name;
    this.health = getHealth();
    this.div = enemySprite.cloneNode();
    // this.div.append(document.createElement("h3"));
    this.div.append(enemySpriteImg.cloneNode());
    gameScreen.append(this.div);
    this.div.querySelector("img").src = src.idle;
    this.width = width;
    this.div.style.width = `${this.width}px`;
    this.height = height;
    this.div.style.height = `${this.height}px`;
    this.projectiles = [];
    this.positionX = 0;
    this.positionY = 0;
    this.start = new Date(); //start of enemy creation
    this.periodX = periodX;
    this.periodY = periodY;
    gameScreen.append(this.div);
    enemies.push(this);
    this.radius = Math.min(this.width / 2, this.height / 2);
    this.power = power;
    this.projectileSpeed = projectileSpeed;
    this.probability = probability;
    this.src = src;
  }

  move = () => {
    let Amp = 0.5 * (gameScreenRect.width - this.width);
    let freqX = 1 / this.periodX;
    let freqY = 1 / this.periodY;
    let currentTime = new Date() - this.start;
    this.positionX = -Amp * Math.cos(freqX * currentTime) + Amp;
    this.positionY = -Amp * 0.2 * Math.sin(freqY * currentTime) + Amp * 0.2;

    this.div.style.left = `${this.positionX}px`;
    this.div.style.top = `${this.positionY}px`;
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
    this.speed = this.player.projectileSpeed;
    this.div = projectileDiv.cloneNode();
    this.div.append(document.createElement("img"));
    this.div.querySelector("img").src = this.player.src.laser;
    this.positionX = this.player.positionX;
    this.positionY = this.player.positionY;
    this.width;
    this.height;
    this.radius;
    this.power = this.player.power;
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
const randomNumberBetween = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

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

// Check for projectile collision
const projectileCollision = (projectiles, players) => {
  projectiles.forEach((projectile, projectileIndex, projectilesArray) => {
    players.forEach((player) => {
      if (checkCollision(projectile, player)) {
        // projectile.div.style.backgroundColor = "red";
        player.health -= projectile.power;
        console.log("OUCH!", player.name, "Health is", player.health);
        projectile.div.remove();
        projectilesArray.splice(projectileIndex, 1);
        player.div.querySelector("img").style.filter = "invert(100%)";
        setTimeout(() => {
          player.div.querySelector("img").style.filter = "invert(0%)";
        }, 100);
      }
    });
  });
};

// Explosion function
const explode = (player) => {
  player.div.querySelector("img").src =
    "https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif";
  setTimeout(() => {
    player.div.remove();
  }, 500);
};

// Collate points
const addPoints = (player) => {
  if (player instanceof Enemy) {
    playerPoints += enemyFeatures[player.name].getHealth();
  }
};

// Player/Enemy death
const playerDeath = (players) => {
  players.forEach((player, playerIndex, playersArray) => {
    if (player.health <= 0) {
      addPoints(player);
      explode(player);
      playersArray.splice(playerIndex, 1);
    }
  });
};

// GAME FLOW CONTROL
// new Player(playerFeatures['player-1'])

const twoPlayer = () => {
  document.querySelector(".player-two").classList.toggle("unclickable");
  if (twoPlayerMode) {
    twoPlayerMode = 0;
    console.log("1 player mode");
  } else {
    twoPlayerMode = 1;
    console.log("2 player mode");
  }
};

const startGame = () => {
  new Player(playerFeatures["player-1"]);
  twoPlayerMode ? new Player(playerFeatures["player-2"]) : {};
  document.querySelector("#two-player").disabled = 1;

  if (round == 1) {
    startGameButton.disabled = 1;
    startGameButton.innerHTML = "Next Round"
  }

  // Generate new enemies every few seconds
  let generateEnemies = setInterval(() => {
    if (round % bossLevel) {
      regularGame();
    } else {
      bossLevel();
    }

    if (playerPoints >= 50) {
      clearInterval(generateEnemies)
      //TODO: Create some function to advance to  next round
      nextRound()
    }

  }, 3000/(1 + round/10));

  
};

//TODO: Finsihe this function
const nextRound = () => {
  round += 1;
  enemies.forEach(explode)
  players.forEach(explode)

  enemies = []; players = [];
  console.log("NEXT ROUND!")

  playerPoints = 0;
  startGameButton.disabled = 0;

  // Instead of alert use something else.
  alert(`Move to Round ${round}`)
}

const regularGame = () => {
  for (enemyType in enemyFeatures) {
    if (
      Math.random() <= enemyFeatures[enemyType].probability &&
      enemies.length < 6
    ) {
      new Enemy(enemyFeatures[enemyType]);
    }
  }
};

const bossRound = () => {
  console.log("Boss Level!!");
  // TODO: Make Bosses
};

//Enemies Fire the weapons periodically
setInterval(() => {
  enemies.forEach((enemy) => {
    enemy.shoot();
  });
}, 1000);

// Animate the whole game
let gameAnim;
const runGame = () => {
  //Animate Player1
  players.forEach((player) => player.update());
  enemies.forEach((enemy) => enemy.update());

  // Move Projectiles
  playerProjectiles.forEach(moveProjectiles);
  enemyProjectiles.forEach(moveProjectiles);

  // Check Collision
  // Enemy projectiles hit player
  projectileCollision(enemyProjectiles, players);
  // Player projectiles hit enemy
  projectileCollision(playerProjectiles, enemies);

  //Create Health bar for Players
  players.forEach((player, playerIndex) => {
    let healthDivs = document.querySelectorAll(".player-health");
    healthDivs[playerIndex].innerHTML = player.health;
  });

  // Enemy health update
  // enemies.forEach((enemy) => {
  //   enemy.div.querySelector("h3").innerText = enemy.health;
  // });

  //Total Points
  playerPointsDiv.innerHTML = playerPoints;

  //Player/ Enemy Dies
  playerDeath(enemies);
  playerDeath(players);

  gameAnim =  requestAnimationFrame(runGame);
};

//Run the game animation
runGame();

// TODO:
// Create basic game flow
