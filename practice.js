// DOM Elements
const goodGuy = document.querySelector('.player-sprite');
console.log('PRACTICE JS')
let goodGuyPosX = 0;


// Functions
// isMoving 1 - move right; 2 - move left
const move = (isMoving) => {
    if (isMoving==1) {
        goodGuyPosX += 5;
        goodGuy.style.left = goodGuyPosX + 'px'
        console.log(goodGuyPosX)
    } else if (isMoving==2) {
        goodGuyPosX -= 5;
        goodGuy.style.left = goodGuyPosX + 'px'
        console.log(goodGuyPosX)
    }
}

// Keyboard event listeners
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            console.log('TO THE RIGHT!!')
            move(1)
            break;
        case 'ArrowLeft':
            console.log('TO THE RIGHT!!')
            move(2)
            break;
        default:
            console.log(event.key)
    }
});


