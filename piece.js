class Piece {
    constructor(pieceIndex = nextPieceIndex, x, y) {
        this.x = x || (w - 2 * g) / 2
        this.y = y || -4 * g
        this.pieceIndex = pieceIndex !== null ? pieceIndex : floor(random(0, 7))
        if (this.pieceIndex === 7) this.pieceIndex = 6
        this.piece = pieces[this.pieceIndex]
        this.matrix = this.piece.matrix
        this.len = this.matrix.length
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
                if (this.matrix[row][col]) square(this.x + col * g, this.y + row * g, g)
    }
    
    update() {
        this.y += g
        return
    }

    checkDownWardsCollision() {
        for (let row = 0; row < this.len; row++) {
            if (this.matrix[row].some(v => v === 1) && this.y + row * g >= h - g)
                return true
            for (let col = 0; col < this.len; col++)
                if (board.places.some(
                    v => v[1] === this.x + col * g && v[2] === this.y + (row + 1) * g
                ) && this.matrix[row][col]) return true
        }
        return
    }

    collideDownWards() {
        for (let row = 0; row < this.len; row++)
            for (let col = 0; col < this.len; col++) 
                if (this.matrix[row][col] && !board.places.some(v => v[1] === this.x + col * g && v[2] === this.y + row * g))
                    board.places.push([pieces[this.pieceIndex], this.x + col * g, this.y + row * g])
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
                if (movement === 'left' && this.matrix[row][col] && (this.x + col * g === 0 || board.places.some(v => v[1] === this.x + (col - 1) * g && v[2] === this.y + row * g))) return
                if (movement === 'right')
                    if (this.matrix[row][col] && (this.x + col * g === w - g || board.places.some(v => v[1] === this.x + (col + 1) * g && v[2] === this.y + row * g))) return
            }
        return true
    }

    move(movement) {
        if (movement === 'left') this.x -= g
        if (movement === 'right') this.x += g
    }

    rotate() {
        let rotatedMatrix = []
        for (let row = 0; row < this.len; row++) {
            rotatedMatrix.push(Array(this.len))
            let k = this.len - 1
            for (let col = 0; col < this.len; col++) {
                rotatedMatrix[row][col] = this.matrix[k][row]
                k--
            }
        }
        for (let row = 0; row < this.len; row++)
            for (let col = 0; col < this.len; col++) {
                if (rotatedMatrix[row][col]){
                    // ? Checks if rotation causes the piece to collide with other pieces or the floor
                    if (this.y + row * g === h - 2 * g || board.places.some(v => v[1] === this.x + col * g && v[2] === this.y + (row - 1) * g)) return 
                    if (this.x + col * g <= 0) this.x = 0
                    else if (this.x + col * g >= w - g) this.x = w - rotatedMatrix.length * g
                }
            }
        // ? Rotation didn't cause problems
        this.y -= g
        return this.matrix = rotatedMatrix
    }

    hold() {
        heldPieceIndex = this.pieceIndex
        if (holding) return
        held()
        holding = true
    }
}