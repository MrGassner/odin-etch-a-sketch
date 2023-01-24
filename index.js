// game board
const game = document.getElementById('game');
let boardSize = document.querySelectorAll('.sizeBtns')
let defaultSize = 16

document.querySelectorAll('.sizeBtn').forEach(btn => {
    btn.addEventListener('click', event => boardResize(event))
})

document.querySelector('#sizeRange').addEventListener('change', event => {
    const sliderBtn = document.querySelector('.sliderBtn');
    let sliderVal = event.target.value;
    
    sliderBtn.textContent = `${sliderVal} x ${sliderVal}`;
    sliderBtn.id = `${sliderVal}`;
    sliderBtn.click()
})

function board(size) {

    document.querySelector('#game').style.gridTemplateColumns = `repeat(${size}, 1fr)`
    for (let i = 0; i < (size * size); i++) {
        const gameGrid = document.createElement('div');
        gameGrid.id = 'gameGrid';
        game.appendChild(gameGrid);
    }

    return draw('default')
}

function boardResize(event) {
    while (game.firstChild) {
        game.removeChild(game.lastChild)
    }

    let newSize = event.target.id;
    return board(newSize)
}


// Drawing on board
function draw() {

    let colorChoice = 'Default'
    let mouseOn = false

    document.querySelectorAll('.clrBtn').forEach(btn => {
        btn.addEventListener('click', event => {
             colorChoice = event.target.textContent
        });
    });  

    document.querySelector('#game').addEventListener('click', () => {
        mouseOn === false ? mouseOn = true : mouseOn = false;
    });

    document.querySelectorAll('#gameGrid').forEach(square => {
        square.addEventListener('mouseover', event => {

            if (event.type === 'mouseover' && !mouseOn) return;

            if (colorChoice === 'Default') {
                let colorDraw = document.getElementById('colorPicker').value;            
                square.classList.add('drawn');
                square.style.background = colorDraw;
                square.style.filter = 'brightness(100%)'
            }  

            if (colorChoice === 'Rainbow') {
                let maxVal = 0xFFFFFF; // 16777215
                let randomNumber = Math.random() * maxVal; 
                randomNumber = Math.floor(randomNumber);
                randomNumber = randomNumber.toString(16);
                let randColor = randomNumber.padStart(6, 0);   
                let colorDraw = `#${randColor.toUpperCase()}`
                
                square.classList.add('drawn');
                square.style.background = colorDraw;
                square.style.filter = 'brightness(100%)'
            }

            if (colorChoice === 'Dark Scale') {

                if (square.classList.value !== 'drawn') {
                    square.classList.add('drawn');
                    square.style.background = 'white';
                }

                let defBrightness = square.style.filter.split(/[()]/)

                if (defBrightness.length === 1) {
                    square.style.filter = 'brightness(100%)'

                } else{
                   square.style.filter = `brightness(${parseInt(parseInt(defBrightness[1]) * 0.95)}%)`
                } 
            }
        });
    });
}

board(defaultSize);
