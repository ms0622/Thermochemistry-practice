const pen = canvas.getContext('2d')
const cr = Math.PI * 2
const scale = 50

const chemicals = {
    Cl: {
        color: '#007700'
    },
    H: {
        color: 'white'
    }
}

const questions = [
    {
        q: `A heated copper penny with a mass of 3.0g at a temperature of 150°C is dropped into a cup of 25ml of water at 25°C.

    When the penny is left in the water, what is the final temperature of both the water and the penny? (answer in °C)
    `,
        a: '26'
    }, {
        q: 'When water is frozen and becomes ice, it is a(n) ________ reaction.',
        a: 'exothermic',
        choices: [
            'programmable',
            'endothermic',
            'thermodynamic',
            'exothermic',
            'questionable'
        ]
    }, {
        q: 'Which will burn your hand more, water at 100°C or steam at 100°C?',
        a: 'Steam',
        choices: [
            'They both burn equally',
            'Maybe they burn you but my hand is indestructible',
            'Liquid water',
            'Steam',
            "Plot twist: they don't"
        ]
    }
]

let currentQuestionNum = 0

const animationStates = {
    findHydrogen: {},
    correctOrientation: {},
    activationEnergy: {},
    productFormation: {},
    continuingProductForm: {}
}

function draw() {
    pen.save()
    const x = currentAnimation.x * scale * 2
    const y = currentAnimation.y * scale * 2
    const { chem1, chem2, angle } = currentAnimation

    pen.beginPath()
    pen.fillStyle = chemicals[chem1].color
    const radius = scale
    pen.moveTo(x + radius, y)
    pen.arc(x, y, radius, 0, cr)
    pen.fill()
    pen.stroke()

    pen.beginPath()
    pen.translate(x, y)
    pen.rotate(angle)
    pen.moveTo(radius * 3, 0)
    pen.fillStyle = chemicals[chem2].color
    pen.arc(radius * 2, 0, radius, 0, cr)
    pen.fill()
    pen.stroke()
    pen.restore()
}

const animations = [{
    chem1: 'Cl',
    chem2: 'H',
    startAngle: 0,
    endAngle: Math.PI / 2,
    startX: 1,
    startY: 1,
    endX: 5,
    endY: 4,
    steps: 100
}]

let currentAnimation = animations[0]

let rotationSpeed
let xSpeed
let ySpeed
let step

function animate() {
    step = 0
    rotationSpeed = (currentAnimation.endAngle - currentAnimation.startAngle) / currentAnimation.steps
    xSpeed = (currentAnimation.endX - currentAnimation.startX) / currentAnimation.steps
    ySpeed = (currentAnimation.endY - currentAnimation.startY) / currentAnimation.steps

    currentAnimation.x = currentAnimation.startX
    currentAnimation.y = currentAnimation.startY
    currentAnimation.angle = currentAnimation.startAngle

    drawFrames()
}

function drawFrames() {
    pen.clearRect(0, 0, canvas.width, canvas.height)
    draw()
    currentAnimation.x += xSpeed
    currentAnimation.y += ySpeed
    currentAnimation.angle += rotationSpeed
    if (step++ < currentAnimation.steps) requestAnimationFrame(drawFrames)
    else nextQuestion()
}

function checkAnswer() {
    answerButton.disabled = true
    const answerNode = document.querySelector('#answerField') || document.querySelector('input:checked')
    const answer = answerNode.value.trim()
    if (answer == questions[currentQuestionNum].a) {
        nextState()
    } else {
        redoState()
    }
}

function nextQuestion() {
    currentQuestionNum++
    if (questions[currentQuestionNum]) {
        answerButton.disabled = false
        askQuestion()
    }
}

function askQuestion() {
    answerBlock.innerHTML = ''
    const question = questions[currentQuestionNum]
    questionField.innerText = question.q
    if (question.choices) {
        question.choices.forEach((q, index) => {
            const div = document.createElement('div')
            answerBlock.append(div)

            const option = document.createElement('input')
            option.type = 'radio'
            option.name = 'option'
            option.value = q
            option.id = `choice${index}`
            div.append(option)

            const label = document.createElement('label')
            label.for = option.id
            label.innerText = q
            div.append(label)
        })
    } else {
        const input = document.createElement('input')
        input.id = 'answerField'
        answerBlock.append(input)
    }
}

function nextState() {
    showMessage('Correct!')
    animate()
}

function showMessage(text) {
    message.innerText = text
    setTimeout(() => message.innerText = '', 2000)
}

function redoState() {
    if (document.querySelector('#answerField')) {
        showMessage("That's not correct. Make sure to use the right number of sig-figs, or recheck your math")
    } else {
        showMessage("That's not correct; try another choice")
    }
    answerButton.disabled = false
}

askQuestion()