class Board {
	constructor() {
		// ? Keeps track of which places in the grid are used, it stores each one as an array
		// ? with the following structure [piece object, x position, y position] 
		// ? The piece object comes from the pieces array in global.js
		this.usedPlaces = []
	}

	show() {
		for (let place of this.usedPlaces) {
			fill(place[0].color)
			square(place[1], place[2], gridSize)
		}
		for (let row = 0; row < heightBoard; row += gridSize)
			for (let col = 0; col < widthBoard; col += gridSize) {
				push()
					noFill()
					stroke(15)
					strokeWeight(1)
					square(col, row, gridSize)
				pop()
				push()
					stroke(150)
					strokeWeight(1)
					line(10 * gridSize, 0, 10 * gridSize, 20 * gridSize)
				pop()
			}
	}

	getClearedLines(numberOfLines = 0, lines = []) {
		for (let row = heightBoard + gridSize; row >= 0; row -= gridSize){
			// ? Counts how many places are used in the current row
			const counter = this.usedPlaces.filter(place => place[2] === row).length

			// ? Checks if the entire row is used
			if (counter === widthBoard / gridSize) {
				numberOfLines++
				lines.unshift(row)
			} 
		}
		if(numberOfLines === 0) return

		// ? Removes each line in the lines array one by one
		for (let i = 0; i < numberOfLines; i++) this.clearLine(lines[i])
		score += Math.pow(numberOfLines, 2)
		return
	}

	clearLine(line = null) {
		// ? Removes the line (all items this.usedPlaces where this.usedPlaces[2] is equal to line)
		this.usedPlaces = this.usedPlaces.filter(place => place[2] !== line)

		// ? Shifts down the lines above the one removed
		this.usedPlaces.filter(place => place[2] < line).forEach(place => place[2] += gridSize)
		return
	}
}