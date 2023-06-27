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

const registerKeyPressed = (event) => {
    switch (event.key) {
        case 'ArrowRight':
            // Move Right stops us from moving left
            keyCodeMap['ArrowRight'].pressed = true;
            keyCodeMap['ArrowLeft'].pressed = false;
            move(1)
            console.log('Move Right KEYDOWN')
            break;
        case 'ArrowLeft':
            keyCodeMap['ArrowLeft'].pressed = true;
            keyCodeMap['ArrowRight'].pressed = false;
            move(0)
            console.log('Move Left KEYDOWN')
            break;
        case 'Shift':
            keyCodeMap[event.key].pressed = true;
            // Continue moving if already moving
            if (keyCodeMap.ArrowRight.pressed) {
                console.log("Shift+ArrowRight KEYDOWN");
                move(1);
            } else if (keyCodeMap.ArrowLeft.pressed) {
                console.log("Shift+ArrowLeft KEYDOWN");
                move(0);
            } else {
                console.log("Shift KEYDOWN")
            }
            break;
        default:
            console.log(event.key, " KEYDOWN not configured")
    }
}


// Keyboard event listeners
keyCodeMap = {
    ArrowRight: {pressed: false, move() {move(1)}},
    ArrowLeft:  {pressed: false, move() {move(0)}},
    Shift:      {pressed: false},
}

// // STRATEGY 1 - move left and right on press (This works perfectly)
// document.addEventListener('keydown', (event) => {
//     switch (event.key) {
//         case 'ArrowRight':
//             keyCodeMap[event.key].pressed = true;
//             move(1)
//             console.log('Move Right')
//             break;
//         case 'ArrowLeft':
//             keyCodeMap[event.key].pressed = true;
//             move(0)
//             console.log('Move Left')
//             break;
//     }
// })

// STRATEGY 2 - on key press check what has been pressed and use combo of conditions to create events
// STEP 1: register key press
document.addEventListener('keydown', (event) => {
    registerKeyPressed(event)
    if (keyCodeMap.ArrowRight.pressed && keyCodeMap.Shift.pressed) {
        console.log('SHIFT and RIGHT')
    }
})
document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            keyCodeMap[event.key].pressed = false;
            console.log('Move Right KEYUP')
            break;
        case 'ArrowLeft':
            keyCodeMap[event.key].pressed = false;
            console.log('Move Left KEYUP')
            break;
        case 'Shift':
            keyCodeMap[event.key].pressed = false;
            console.log('Shift KEYUP')
            break;
        default:
            console.log(event.key," KEYUP not configured")
    }
})



