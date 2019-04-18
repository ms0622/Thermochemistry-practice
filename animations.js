const quarterCr = Math.PI / 2
const eighthCr = Math.PI / 4

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

export { scenes, animations }