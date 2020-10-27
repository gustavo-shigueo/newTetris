class Board {
    constructor() {
        this.places = []
        // noLoop()
    }

    show() {
        for (let place of this.places) {
            fill(place[0].color)
            square(place[1], place[2], g)
        }
        for (let row = 0; row < h; row += g)
            for (let col = 0; col < w; col += g) {
                push()
                    noFill()
                    stroke(15)
                    strokeWeight(1)
                    square(col, row, g)
                pop()
                push()
                    stroke(150)
                    strokeWeight(1)
                    line(10 * g, 0, 10 * g, 20 * g)
                pop()
            }
    }

    getClearedLines(numberOfLines = 0, lines = []) {
        for (let row = h + g; row >= 0; row -= g){
            let counter = 0
            for (let place of this.places) {
                if (place[2] === row) counter++
            }
            if (counter === w / g) {
                numberOfLines++
                lines.push(row)
            } 
        }
        if(numberOfLines === 0) return
        lines.reverse()
        for (let i = 0; i < numberOfLines; i++) this.clearLine(lines[i])
        score += Math.pow(numberOfLines, 2)
        return
    }

    clearLine(line = null) {
        this.places = this.places.filter(v => v[2] !== line)
        this.places.filter(v => v[2] < line).forEach(v => v[2] += g)
        return
    }
}