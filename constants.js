const g = 30
const wC = 19 * g
const hC = 20 * g
const w = 10 * g
const h = 20 * g
const f = 8

const scoreCounter = document.querySelector('#score')
const highScoreCounter = document.querySelector('#highscore')

const gameOverScreen = document.querySelector('.gameover-screen')
const restartBtn = document.querySelector('.gameover-btn')

let score = 0
let highscore = 0

let holding = false
let nextPieceIndex
let heldPieceIndex

const pieces = [

    {
        color: '#FCFF4D',
        matrix: [
            [1, 1],
            [1, 1]
        ]
    },

    {
        color: '#E30013',
        matrix: [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ]
    },

    {
        color: '#5EFF4A',
        matrix: [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ]
    },

    {
        color: '#F924FE',
        matrix: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ]
    },

    {
        color: '#0050FF',
        matrix: [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 0]
        ]
    },

    {
        color: '#F7871A',
        matrix: [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 1]
        ]
    },

    {
        color: '#69FFFE',
        matrix: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    }
]