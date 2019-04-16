const pen = canvas.getContext('2d')
const cr = Math.PI * 2
const scale = 50

const chemicals = {
    Cl: {
        color: '#007700',
        size: 1
    },
    H: {
        color: 'white',
        size: 1
    }
}

const questions = [
    `A heated copper penny with a mass of 3.0g at a temperature of 150°C is dropped into a cup of 25ml of water at 25°C.

    When the penny is left in the water, what is the final temperature of both the water and the penny?
    `
]

const animationStates = {
    findHydrogen: {},
    correctOrientation: {},
    activationEnergy: {},
    productFormation: {},
    continuingProductForm: {}
}

function draw(chemical, x, y) {
    x *= scale * 2
    y *= scale * 2
    pen.beginPath()
    pen.fillStyle = chemicals[chemical].color
    const radius = scale * chemicals[chemical].size
    pen.moveTo(x + radius, y)
    pen.arc(x, y, radius, 0, cr)
    pen.fill()
    pen.stroke()
}

draw('Cl', 1, 1)
draw('H', 2, 1)

function askQuestion(question, correctAnswer) {

}

questionField.innerHTML = questions[0]