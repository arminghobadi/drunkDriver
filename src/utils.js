export const generateEmptyCell = () => 
({ 
  type: 'empty',
  backgroundColor: 'white',
  shorthand: ' ',
  isObstacle: false
})

export const generateEmptyRow = (width) => 
  Array(width).fill(null).map(_ => generateEmptyCell())

export const generateCarCell = () => ({
  type: 'car',
  backgroundColor: 'black',
  shorthand: 'c',
  isObstacle: false
})

export const generateHouseCell = () => ({
  type: 'house',
  backgroundColor: 'blue',
  shorthand: 'h',
  isObstacle: true
})