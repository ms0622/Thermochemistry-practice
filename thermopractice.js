import questions from './questions.js'
import { animations, scenes } from './animations.js'

const pen = canvas.getContext('2d')
const cr = Math.PI * 2
const scale = 50
const stopGame = false

const chemicals = {
  Cl: {
    color: '#007700'
  },
  H: {
    color: 'white'
  }
}

let currentQuestionNum = -1

const animationStates = {
  findHydrogen: {},
  correctOrientation: {},
  activationEnergy: {},
  productFormation: {},
  continuingProductForm: {}
}

function draw(animation) {
  pen.save()
  const x = animation.x * scale * 2
  const y = animation.y * scale * 2
  const { chem1, chem2, angle } = animation

  pen.beginPath()
  pen.fillStyle = chemicals[chem1].color
  const radius = scale
  pen.moveTo(x + radius, y)
  pen.arc(x, y, radius, 0, cr)
  pen.fill()
  pen.stroke()

  if (animation.drawBonds) {
    pen.fillStyle = 'black'
    for (let i = 0; i < 5; i++) {
      pen.fillRect(x, 7 + y + radius + i * 10, 5, 5)
      pen.fillRect(x + 2 * radius, 7 + y + radius + i * 10, 5, 5)
    }
  }

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

let currentSceneNum = 0
let goalSceneNum = 0

let step

function animate() {
  const currentScene = scenes[currentSceneNum]
  step = 0
  currentScene.forEach(element => {
    const animation = element.animation
    animation.rotationSpeed = (animation.endAngle - animation.startAngle) / animation.steps
    animation.xSpeed = (animation.endX - animation.startX) / animation.steps
    animation.ySpeed = (animation.endY - animation.startY) / animation.steps

    animation.x = animation.startX
    animation.y = animation.startY
    animation.angle = animation.startAngle
  })

  drawFrames()
}

function drawFrames() {
  const currentScene = scenes[currentSceneNum]
  pen.clearRect(0, 0, canvas.width, canvas.height)

  const finalStep = currentScene.reduce((a, b) => Math.max(a, b.startStep + b.animation.steps), 0)

  currentScene.forEach(element => {
    const animation = element.animation
    draw(animation)
    if (step >= element.startStep && step < element.startStep + animation.steps) {
      animation.x += animation.xSpeed
      animation.y += animation.ySpeed
      animation.angle += animation.rotationSpeed
    }
  })
  if (step++ < finalStep) requestAnimationFrame(drawFrames)
  else nextScene()
}

function nextScene() {
  if (currentSceneNum < goalSceneNum) {
    currentSceneNum++
    animate()
  } else {
    nextQuestion()
  }
}

function checkAnswer() {
  if (stopGame) return

  const answerNode = document.querySelector('#answerField') || document.querySelector('input:checked')
  if (answerNode == null || !answerNode.value.length) return

  const correctAnswer = questions[currentQuestionNum].a
  answerButton.disabled = true

  const answer = answerNode.value.trim()
  if (answer == correctAnswer) {
    nextState()
  } else {
    redoState(correctAnswer)
  }
}

function nextQuestion() {
  currentQuestionNum++
  currentSceneNum++
  goalSceneNum++

  if(currentSceneNum >= scenes.length) { winGame() }
  else if (currentQuestionNum >= questions.length) { loseGame() }
  else {
    if (questions[currentQuestionNum]) {
      answerButton.disabled = false
      hintButton.disabled = false
      askQuestion()
    }
  }
}

function askQuestion() {
  answerBlock.innerHTML = ''
  const question = questions[currentQuestionNum]
  questionField.innerHTML = question.q
  requeue()
  if (question.choices) {
    question.choices.forEach((q, index) => {
      const div = document.createElement('div')
      answerBlock.appendChild(div)

      const option = document.createElement('input')
      option.type = 'radio'
      option.name = 'option'
      option.value = q
      option.id = `choice${index}`
      div.appendChild(option)

      const label = document.createElement('label')
      label.for = option.id
      label.innerText = q
      div.appendChild(label)
    })
  } else {
    const input = document.createElement('input')
    input.id = 'answerField'
    input.onkeydown = e => {
      if (e.keyCode == 13) checkAnswer()
    }
    answerBlock.appendChild(input)
  }
}

function nextState() {
  showMessage('Correct!')
  animate()
}

function showMessage(text) {
  alert(text)
}

function redoState(answer) {
  showMessage(`Sorry, the correct answer was ${answer}`)
  answerButton.disabled = false
  currentSceneNum = 0
  goalSceneNum--
  animate()
}

shuffleQuestions()
animate()

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

function startGame() {
  message.style.display = 'none'
  intro.style.display = 'none'
}

function winGame() {
  message.style.display = 'block'
  win.style.display = 'block'
  stopGame = true
}

function loseGame() {
  message.style.display = 'block'
  lose.style.display = 'block'
}

document.querySelector('#startGameButton').onclick = startGame
document.querySelector('#answerButton').onclick = checkAnswer
document.querySelector('#hintButton').onclick = showHint


function showHint() {
  hintButton.disabled = true
  hintButton.disabled = true
  const question = questions[currentQuestionNum]
  questionField.innerHTML = question.q + '<p>' + question.hint + '</p>'
  requeue()
}

function requeue() {
  if (window.MathJax) {
    setTimeout(() => {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub])
    }, 100)
  }
}