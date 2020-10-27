function setup() {
  createCanvas(wC, hC);
  frameRate(f)

  next()
  holding = false
  heldPiece = null
  piece = new Piece()
  board = new Board()

  // noLoop()
}

function draw() {
  background(0);
  if (keyIsDown(DOWN_ARROW) && !piece.checkDownWardsCollision()) piece.update()
  if(!piece.checkDownWardsCollision()) piece.update()
  else {
    if (board.places.some(v => v[2] === 0)) {
      gameOver()
      highscore = max(score, highscore)
      noLoop()
    }
    piece.collideDownWards()
    board.getClearedLines()
    piece = new Piece(nextPieceIndex)
    next()
    holding = false
  }
  piece.show()
  board.show()
  nextPiece.show()
  if(heldPiece) heldPiece.show()
  push()
    fill(255)
    textSize(20)
    text('Next:', 12 * g, 1.5 * g)
    text('Hold:', 12 * g, 12.5 * g)
    stroke(255)
    noFill()
    square(12 * g, 2 * g, 5 * g)
    square(12 * g, 13 * g, 5 * g)
  pop()
  showScore()
}

function keyPressed() {
  piece.receiveInput(key)
}