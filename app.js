// const projectiles = document.querySelector('.player-projectile')
let projectileRect;
let mainScreenRect = document.querySelector('.game-screen').getBoundingClientRect();
// projectileRect = projectiles.getBoundingClientRect()
// console.log(projectileRect.x - mainScreenRect.x)
let x; let y;
let startTime; let stopTime;

startTime = Date.now();

const trackAnimatedDiv = () => {
    const projectile1 = document.querySelector('.player-projectile');
    const projectile2 = document.querySelector('.enemy-projectile');
    const projectile1Rect = projectile1.getBoundingClientRect();
    const projectile2Rect = projectile2.getBoundingClientRect();

    x1 = projectile1Rect.x - mainScreenRect.x;
    y1 = projectile1Rect.y - mainScreenRect.y;

    x2 = projectile2Rect.x - mainScreenRect.x;
    y2 = projectile2Rect.y - mainScreenRect.y;
    
    console.log(stopTime-startTime)
    console.log(`Player Position: ${[x1,y1]}\n`,`Enemy Position: ${[x2,y2]}\n`);
    stopTime = Date.now()

    if (stopTime-startTime >= 10000) {
        return 0
    }

    if (Math.abs(y1-y2) <= 10) {
        projectile1.classList +=' kaboom';
        projectile2.classList += ' kaboom';
        console.log("KABOOM");
        return 0
    }
    // Schedule the next frame
    setTimeout (() => {requestAnimationFrame(trackAnimatedDiv)},
    10)

    
  }

trackAnimatedDiv()


// Detect keyPress 
const playerSprite = document.querySelector('.player-sprite')

function moveRight() {
    console.log("Left position",playerSprite.style)
    playerSprite.style.left = '100px'
    playerSprite.style.left = parseInt(playerSprite.style.left) + 20 + 'px'
    
}

document.addEventListener('keydown', (event) => {

    

    if (event.key == "ArrowRight") {
        console.log(event.key)
        moveRight()
    } else {
        console.log('FREEZE')
        console.log(event.key)
    }
    

})


