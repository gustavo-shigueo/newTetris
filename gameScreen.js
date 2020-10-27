// ? Choose next piece
function next() {
    nextPieceIndex = floor(random(0, 7))
    if (nextPieceIndex === 7) nextPieceIndex = 6
    let pos
    switch (nextPieceIndex) {
        case 0:
            pos = [1.5, 1.5]
            break
        case 1:
        case 2:
        case 3:
        case 6:
            pos = [1, 0.5]
            break
        case 4:
            pos = [1.5, 1]
            break
        case 5:
            pos = [0.5, 1]
            break
    }
    nextPiece = new Piece(nextPieceIndex, (12 + pos[0]) * g, (2 + pos[1]) * g)
}

// ? Handle held piece
function held() {
    let pos
    switch (heldPieceIndex) {
        case 0:
            pos = [1.5, 12.5]
            break
        case 1:
        case 2:
        case 3:
        case 6:
            pos = [1, 11.5]
            break
        case 4:
            pos = [1.5, 12]
            break
        case 5:
            pos = [0.5, 12]
            break
    }
    if(!heldPiece) {
        piece = new Piece(nextPieceIndex)
        next()
    } else piece = new Piece(heldPiece.pieceIndex)
    heldPiece = new Piece(heldPieceIndex, (12 + pos[0]) * g, (2 + pos[1]) * g)
}

function showScore() {
    scoreCounter.innerText = `Score: ${score}`
    highScoreCounter.innerText = `Highscore: ${highscore}`
}

function gameOver() {
    gameOverScreen.setAttribute('data-gameover-screen', 'show')
}

function restartGame() {
    gameOverScreen.setAttribute('data-gameover-screen', 'hide')
    setup()
    loop()
    score = 0
    showScore()
}

restartBtn.addEventListener('click', restartGame)