const pen = canvas.getContext('2d')

const cr = Math.PI * 2
const quarterCr = Math.PI / 2
const eighthCr = Math.PI / 4

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

const questions = [
  {
    q: `A heated copper penny with a mass of 3.0g at a temperature of 150&deg;C is dropped into a cup of 25ml of water at 25&deg;C.

    When the penny is left in the water, what is the final temperature of both the water and the penny? (answer in &deg;C)
    `,
    a: '26',
    hint: 'mc(T<sub>f</sub> - T<sub>i</sub>)<sub>Cu</sub> = -mc(T<sub>f</sub> - T<sub>i</sub>)<sub>Water</sub>'
  }, {
    q: 'When water is frozen and becomes ice, it is a(n) ________ reaction.',
    a: 'exothermic',
    choices: [
      'programmable',
      'endothermic',
      'thermodynamic',
      'exothermic',
      'questionable'
    ],
    hint: 'Ice has lesss energy than water.'
  }, {
    q: 'Which will burn your hand more, water at 100&deg;C or steam at 100&deg;C?',
    a: 'Steam',
    choices: [
      'They both burn equally',
      'Maybe they burn you but my hand is indestructible',
      'Liquid water',
      'Steam',
      "Plot twist: they don't"
    ],
    hint: 'Plot twist: they will'
  }, {
    q: '10.00 Cal = ___ J',
    a: '41860',
    hint: '1000cal = 1Cal'
  }, {
    q: '10.0 J = ___ cal',
    a: '2.39',
    hint: '4.186J = 1cal'
  }, {
    q: 'Calculate the &Delta;H in J when 0.444 mol of steam at 180&deg;C is cooled to ice at -5.0&deg;C',
    a: '-22000',
    hint: '<img src="cooling-curve.png">'
  }, {
    q: `12.0 g of benzene decomposes into hydrogen gas and carbon. If the temperature of 128mL of the surrounding water decreases from 298K to 291K,
    what was the change in heat for the system? (Answer in J)`,
    a: '3750',
    hint: 'q<sub>water</sub> = 128g * 4.186 \\({J \\over g&deg;C}\\) * -7&deg;C'
  }, {
    q: 'Calculate the &Delta;H<sub>rxn</sub> for the combustion of propanol(C<sub>3</sub>H<sub>8</sub>). (Answer in \\({kJ \\over mol}\\))',
    a: '-2054',
    hint: `<pre>
                                   H     H
    H H H       O=O                |     |
    | | |       O=O      O=C=O     O-H   O-H
  H-C-C-C-H  +  O=O  ->  O=C=O  + 
    | | |       O=O      O=C=O     O-H   O-H
    H H H       O=O                |     |
                                   H     H
</pre>`
  }, {
    q: `Calculate the &Delta;H of 2C<sub>(s)</sub>+H<sub>2(g)</sub> -> C<sub>2</sub>H<sub>2(g)</sub> given the following step reactions:

1) C<sub>(s)</sub> + O<sub>2(g)</sub> -> CO<sub>2(g)</sub> &Delta;H = -393.5kJ
2) H<sub>2(g)</sub> + &frac12;O<sub>2(g)</sub> -> H<sub>2</sub>O<sub>(l)</sub> &Delta;H = -285.8kJ
3) C<sub>2</sub>H<sub>2(g)</sub> + \\({5 \\over 2}\\) O<sub>2(g)</sub> -> 2CO<sub>2(g)</sub> + H<sub>2</sub>O<sub>(l)</sub> &Delta;H = -1299.8kJ
    
    Answer in kJ`,
    a: '227.0',
    hint: `
1) 2*[C<sub>(s)</sub> + O<sub>2(g)</sub> -> CO<sub>2(g)</sub>] &Delta;H = 2*(-393.5kJ)
2) Unchanged
3) flip it [C<sub>2</sub>H<sub>2(g)</sub> + \\({5 \\over 2}\\) O<sub>2(g)</sub> -> 2CO<sub>2(g)</sub> + H<sub>2</sub>O<sub>(l)</sub>] &Delta;H = -(-1299.8kJ)
`
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