// game board
const game = document.getElementById('game');
let boardSize = document.querySelectorAll('.sizeBtns')
let defaultSize = 16

document.querySelectorAll('.sizeBtns').forEach(btn => {
    btn.addEventListener('click', event => boardResize(event))
})

function board(size) {

    document.querySelector('#game').style.gridTemplateColumns = `repeat(${size}, 1fr)`
    for (let i = 0; i < (size * size); i++) {
        const gameGrid = document.createElement('div');
        gameGrid.id = 'gameGrid';
        game.appendChild(gameGrid);
    }

    return draw()
}

function boardResize(event) {
    while (game.firstChild) {
        game.removeChild(game.lastChild)
    }

    let newSize = event.target.classList.value;
    return board(newSize)
}


// Drawing on board
function draw() {
    let mouseDown = false
    document.body.onmousedown = () => (mouseDown = true)
    document.body.onmouseup = () => (mouseDown = false)


    document.querySelectorAll('#gameGrid').forEach(square => {
        square.addEventListener('mouseover', event => {
            
            let color = document.getElementById('colorPicker').value;

            if (event.type === 'mouseover' && !mouseDown) return;
            square.classList.add('drawn');
            square.style.background = color;    
        });
    });
}

board(defaultSize)
