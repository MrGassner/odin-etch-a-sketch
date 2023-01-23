const game = document.getElementById('game')
let gameSize = 16



for (let i = 0; i < (gameSize * gameSize); i++) {

    const gameGrid = document.createElement('div');
    gameGrid.id = 'gameGrid'
    game.appendChild(gameGrid);
}

document.querySelectorAll('#gameGrid').forEach(square => {
    square.addEventListener('mouseover', () => {
        square.classList.add('drawn')
    })
})

