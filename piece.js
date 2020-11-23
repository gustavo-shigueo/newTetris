class Piece {
	constructor(pieceIndex = nextPieceIndex, x, y) {
		// ? Position of the current piece
		this.x = x ?? (widthBoard - 2 * gridSize) / 2
		this.y = y ?? -4 * gridSize

		// ? Type of piece (check pieces in constants.js for reference)
		this.pieceIndex = pieceIndex ?? pieces.indexOf(random(pieces))
		this.piece = pieces[this.pieceIndex]

		// ? Shortcut variables to avoid typing 'this.piece.matrix' and 'this.piece.matrix.length' all over the file
		this.matrix = this.piece.matrix
		this.len = this.matrix.length

		// ? Input filter
		this.acceptedMoves = {
			'ArrowLeft': 'left',
			'ArrowRight': 'right',
			'ArrowUp': 'up',
			' ': 'spacebar',
			'c': 'hold'
		}
	}

	show() {
		fill(this.piece.color)
		for (let row = 0; row < this.len; row++)
			for (let col = 0; col < this.len; col++)
				if (this.matrix[row][col]) square(this.x + col * gridSize, this.y + row * gridSize, gridSize)
	}

	update() {
		this.y += gridSize
		return
	}

	checkDownWardsCollision() {
		for (let row = 0; row < this.len; row++) {
			// ? Conditional to check if any rows of the matrix that contain a value of 1 have reached the bottom of the board
			if (this.matrix[row].some(square => !!square) && this.y + row * gridSize >= heightBoard - gridSize)
				return true
			for (let col = 0; col < this.len; col++){
				const collisionIsHappening = board.usedPlaces.some(
					place => place[1] === this.x + col * gridSize && // ? Checks if your piece has the same x value as any particular place
					place[2] === this.y + (row + 1) * gridSize       // ? and is directly above that place
				)
				if (collisionIsHappening && this.matrix[row][col]) return true
			}
		}
		return
	}

	collideDownWards() {
		for (let row = 0; row < this.len; row++)
			for (let col = 0; col < this.len; col++) 
				if (this.matrix[row][col])
					// ? Adds the current matrix[row][col] to boards.usedPlaces
					board.usedPlaces.push([
						pieces[this.pieceIndex], // ? Allows the board object apply the right color
						this.x + col * gridSize, // ? X position
						this.y + row * gridSize  // ? Y position
					])
		return true
	}

	receiveInput(key) {
		if (!this.acceptedMoves[key]) return
		let movement = this.acceptedMoves[key]
		switch (movement) {
			case 'right':
			case 'left':
				if (this.possibleToMove(movement)) this.move(movement)
				break
			case 'up':
				this.rotate()
				break
			case 'spacebar':
				while (!this.checkDownWardsCollision()) draw()
				break
			case 'hold':
				this.hold()
				break
			default: return
		}
	}

	possibleToMove(movement) {
		for (let row = 0; row < this.len; row++)
			for (let col = 0; col < this.len; col++) {
				if (!this.matrix[row][col]) continue
				const direction = movement === 'right' ? 1 : -1
				const moveIsBlocked = board.usedPlaces.some(
					place => place[1] === this.x + (col + direction) * gridSize && place[2] === this.y + row * gridSize
				)
				const moveHitsWall = this.x + col * gridSize === (movement === 'right' ? widthBoard - gridSize : 0)
				if (moveHitsWall || moveIsBlocked) return
			}
		return true
	}

	move(movement) {
		if (movement === 'left') this.x -= gridSize
		if (movement === 'right') this.x += gridSize
	}

	rotate() {
		let rotatedMatrix = []
		
		// ? Adds a copy this.matrix rotated 90 degrees to the right to rotatedMatrix
		// ? This process does not affect this.matrix
		for (let row = 0; row < this.len; row++) {
			rotatedMatrix.push(Array(this.len))
			let k = this.len - 1
			for (let col = 0; col < this.len; col++) {
					rotatedMatrix[row][col] = this.matrix[k][row]
					k--
			}
		}

		// ? Checks if rotatedMatrix is in a valid position
		for (let row = 0; row < this.len; row++)
			for (let col = 0; col < this.len; col++) {
				// ? Only run the tests below if rotatedMatrix is truthy
				if (!rotatedMatrix[row][col]) continue

				// ? Checks if rotation causes the piece to collide with other pieces or the floor
				const isGoingThroughFloor = this.y + row * gridSize === heightBoard - 2 * gridSize
				const isGoingThroughPlace = board.usedPlaces.some(
					place => place[1] === this.x + col * gridSize && place[2] === this.y + (row - 1) * gridSize
				)

				// ? If any of the tests return true, abort the rotation
				if (isGoingThroughFloor || isGoingThroughPlace) return

				// ? Prevents rotation from causing the piece to go through walls
				if (this.x + col * gridSize <= 0) this.x = 0
				else if (this.x + col * gridSize >= widthBoard - gridSize) this.x = widthBoard - rotatedMatrix.length * gridSize
			}

		// ? Rotation didn't cause problems
		this.y -= gridSize
		return this.matrix = rotatedMatrix
	}

	hold() {
		if (holding) return
		heldPieceIndex = this.pieceIndex
		held()
		holding = true
	}
}