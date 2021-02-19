const gridSize     = 30           // ? Size (pixels) of a square in the grid
const widthCanvas  = 19 * gridSize
const heigthCanvas = 20 * gridSize
const widthBoard   = 10 * gridSize
const heightBoard  = 20 * gridSize
const framerate    = 30
const velocity     = gridSize / 5 // ? Must be an integer submultiple of gridSize

const scoreCounter = document.querySelector('#score')
const highScoreCounter = document.querySelector('#highscore')

const gameOverScreen = document.querySelector('.gameover-screen')
const restartBtn = document.querySelector('.gameover-btn')

let score = 0
let highscore = 0

let holding = false
let nextPieceIndex
let heldPieceIndex

let buffer = 10

// ? pIndex and name properties are not actually used anywhere,
// ? they here only to make it easier to know a piece's shape without looking at the matrix and 
// ? relate each piece with its index in the pieces array
const pieces = [
	{
		pIndex: 0,
		name: 'O',
		color: '#FCFF4D',
		matrix: [
			[1, 1],
			[1, 1]
		]
	},

	{
		pIndex: 1,
		name: 'Z',
		color: '#E30013',
		matrix: [
			[0, 0, 0],
			[1, 1, 0],
			[0, 1, 1]
		]
	},

	{
		pIndex: 2,
		name: 'S',
		color: '#5EFF4A',
		matrix: [
			[0, 0, 0],
			[0, 1, 1],
			[1, 1, 0]
		]
	},

	{
		pIndex: 3,
		name: 'T',
		color: '#F924FE',
		matrix: [
			[0, 0, 0],
			[1, 1, 1],
			[0, 1, 0]
		]
	},

	{
		pIndex: 4,
		name: 'J',
		color: '#0050FF',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0]
		]
	},

	{
		pIndex: 5,
		name: 'L',
		color: '#F7871A',
		matrix: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1]
		]
	},

	{
		pIndex: 6,
		name: 'I',
		color: '#69FFFE',
		matrix: [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0]
		]
	}
]