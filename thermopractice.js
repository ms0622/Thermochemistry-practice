const pen = canvas.getContext('2d')

const cr = Math.PI * 2
const quarterCr = Math.PI / 2
const eighthCr = Math.PI / 4

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
  }, {
    q: '10.00 Cal = ___ J',
    a: '41860'
  }, {
    q: '10.0 J = ___ cal',
    a: '2.39'
  }, {
    q: 'Calculate the ΔH in J when 0.444 mol of steam at 180°C is cooled to ice at -5.0°C',
    a: '-22000'
  }, {
    q: `12.0 g of benzene decomposes into hydrogen gas and carbon. If the temperature of 128mL of the surrounding water decreases from 298K to 291K,
    what was the change in heat for the system? (Answer in J)`,
    a: '3750'
  }, {
    q: 'Calculate the ΔH<sub>rxn</sub> for the combustion of propanol(C<sub>3</sub>H<sub>8</sub>). (Answer in \\({kJ \\over mol}\\))',
    a: '-2054'
  }
]

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

const animations = [{
  chem1: 'Cl', chem2: 'Cl',
  startAngle: 0,
  startX: 1,
  startY: 1,
  steps: 0
},{
  chem1: 'H', chem2: 'H',
  startAngle: 0,
  startX: 6,
  startY: 1,
  steps: 0
},{
  chem1: 'H', chem2: 'Cl',
  startAngle: eighthCr,
  startX: 3,
  startY: 3,
  steps: 0
},{
  chem1: 'Cl', chem2: 'Cl',
  startAngle: quarterCr,
  startX: 7,
  startY: 3,
  steps: 0
},{
  chem1: 'H', chem2: 'Cl',
  startAngle: eighthCr, endAngle: eighthCr,
  startX: 3, endX: 9,
  startY: 3, endY: 8,
  steps: 100
},{
  chem1: 'Cl', chem2: 'Cl',
  startAngle: quarterCr, endAngle: eighthCr,
  startX: 7, endX: 9,
  startY: 3, endY: 3,
  steps: 100
},{
  chem1: 'Cl', chem2: 'Cl',
  startAngle: 0, endAngle: quarterCr,
  startX: 1, endX: 1,
  startY: 1, endY: 2,
  steps: 100
},{
  chem1: 'H', chem2: 'H',
  startAngle: 0, endAngle: quarterCr,
  startX: 6, endX: 6,
  startY: 1, endY: 2,
  steps: 50
},{
  chem1: 'Cl', chem2: 'Cl',
  startAngle: quarterCr, endAngle: quarterCr,
  startX: 1, endX: 3,
  startY: 2, endY: 2,
  steps: 50
},{
  chem1: 'H', chem2: 'H',
  startAngle: quarterCr, endAngle: quarterCr,
  startX: 6, endX: 4,
  startY: 2, endY: 2,
  steps: 50
},{
  chem1: 'Cl', chem2: 'H',
  startAngle: 0, endAngle: 0,
  startX: 3, endX: 3,
  startY: 2, endY: 1.7,
  steps: 25,
  drawBonds: true
},{
  chem1: 'Cl', chem2: 'H',
  startAngle: 0, endAngle: 0,
  startX: 3, endX: 3,
  startY: 3, endY: 3.27,
  steps: 25
},{
  chem1: 'Cl', chem2: 'H',
  startAngle: 0, endAngle: 0,
  startX: 3, endX: 3,
  startY: 1.7, endY: 1,
  steps: 100
},{
  chem1: 'Cl', chem2: 'H',
  startAngle: 0, endAngle: 0,
  startX: 3, endX: 3,
  startY: 3.27, endY: 4,
  steps: 100
}]

const scenes = [
  [
    {animation: animations[0], startStep: 0},
    {animation: animations[1], startStep: 0},
    {animation: animations[2], startStep: 0},
    {animation: animations[3], startStep: 0}
  ],[
    {animation: animations[0], startStep: 0},
    {animation: animations[1], startStep: 0},
    {animation: animations[4], startStep: 0},
    {animation: animations[5], startStep: 0}
  ],[
    {animation: animations[6], startStep: 0},
    {animation: animations[7], startStep: 25}
  ],[
    {animation: animations[8], startStep: 0},
    {animation: animations[9], startStep: 0}
  ],[
    {animation: animations[10], startStep: 0},
    {animation: animations[11], startStep: 0}
  ],[
    {animation: animations[12], startStep: 0},
    {animation: animations[13], startStep: 0}
  ]
]

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
  currentSceneNum++
  goalSceneNum++
  if (questions[currentQuestionNum]) {
    answerButton.disabled = false
    askQuestion()
  }
}

function askQuestion() {
  answerBlock.innerHTML = ''
  const question = questions[currentQuestionNum]
  questionField.innerHTML = question.q
  if (window.MathJax) MathJax.Hub.Queue(["Typeset", MathJax.Hub])
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
    input.onkeydown = e => {
      if (e.keyCode == 13) checkAnswer()
    }
    answerBlock.append(input)
  }
}

function nextState() {
  showMessage('Correct!')
  animate()
}

function showMessage(text) {
  alert(text)
}

function redoState() {
  if (document.querySelector('#answerField')) {
    showMessage("That's not correct. Make sure to use the right number of sig-figs, or recheck your math")
  } else {
    showMessage("That's not correct; try another choice")
  }
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