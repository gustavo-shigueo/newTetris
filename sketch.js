// ? Setting default start values
function setup() {
  createCanvas(widthCanvas, heigthCanvas);
  frameRate(framerate)

  next()
  holding = false
  heldPiece = null
  piece = new Piece()
  board = new Board()
}

// ? Runs every frame
function draw() {
  background(0);
  if (keyIsDown(DOWN_ARROW) && !piece.checkDownWardsCollision()) piece.update()
  if(!piece.checkDownWardsCollision()) piece.update()
  else {
    piece.collideDownWards()
    board.getClearedLines()
    if (board.usedPlaces.some(place => place[2] === 0)) {
      gameOver()
      highscore = max(score, highscore)
      noLoop()
    }
    else {
      piece = new Piece(nextPieceIndex)
      next()
    }
    holding = false
  }
  piece.show()
  board.show()
  nextPiece.show()
  if(heldPiece) heldPiece.show()
  push()
    fill(255)
    textSize(20)
    text('Next:', 12 * gridSize, 1.5 * gridSize)
    text('Hold:', 12 * gridSize, 12.5 * gridSize)
    stroke(255)
    noFill()
    square(12 * gridSize, 2 * gridSize, 5 * gridSize)
    square(12 * gridSize, 13 * gridSize, 5 * gridSize)
  pop()
  showScore()
}

function keyPressed() {
  piece.receiveInput(key)
}