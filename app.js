// DOM Elements
const goodGuy = document.querySelector('.player-sprite');
let goodGuyPosX = 0;

// Functions
const move = (direction) => {
    // direction -> 1: move right; 0: move left
    switch (direction) {
        case 0:
            goodGuyPosX -= 5;
            goodGuy.style.left = goodGuyPosX + 'px'
            break;
        case 1:
            goodGuyPosX += 5;
            goodGuy.style.left = goodGuyPosX + 'px'
            break;
        default:
            console.log('Button Untracked')

    }
}


// Keyboard event listeners
keyCodeMap = {
    ArrowRight: {pressed: false, move() {move(1)}},
    ArrowLeft:  {pressed: true, move() {move(0)}}
}

// STRATEGY 1 - move left and right on press (This works perfectly)
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keyCodeMap[event.key].pressed = true;
            move(1)
            console.log('Move Right')
            break;
        case 'ArrowLeft':
            keyCodeMap[event.key].pressed = true;
            move(0)
            console.log('Move Left')
            break;
    }
})


