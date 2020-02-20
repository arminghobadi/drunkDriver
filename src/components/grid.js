export class Grid {
  constructor({ width = 10, height = 20, restartHandler } = {}) {
    this.width = width
    this.height = height
    this.grid = Array(this.height).fill(null).map(i => Array(this.width).fill(null).map(i => ' '))
    this.currCarPos = 4
    this.drawCar(this.currCarPos)
    this.nextRow = Array(this.width).fill(null).map(i => ' ')
    this.rowQueue = []
    this.numCycles = 0
    this.restartHandler = restartHandler
  }

  generateEmptyRow() {
    return Array(this.width).fill(null).map(i => ' ')
  }

  drawCar(startX) {
    // x 
    //xxx
    // x 
    //x x
    if (startX + 3 > this.width || startX < 0) return this.grid
    // debugger
    if (startX !== this.currCarPos) {
      this.grid[16][this.currCarPos + 1] = ' '
      this.grid[17][this.currCarPos + 1] = ' '
      this.grid[17][this.currCarPos] = ' '
      this.grid[17][this.currCarPos + 2] = ' '
      this.grid[18][this.currCarPos + 1] = ' '
      // this.grid[18][startX + 1] = ' '
      this.grid[19][this.currCarPos] = ' '
      this.grid[19][this.currCarPos + 2] = ' '
    }
    

    this.currCarPos = startX
    const possibleCollisionZones = [this.grid[16][startX + 1], this.grid[17][startX + 1], this.grid[17][startX], this.grid[17][startX + 2],
    this.grid[18][startX + 1], this.grid[19][startX], this.grid[19][startX + 2]].filter(i => i !== ' ')
    if (possibleCollisionZones.length) {
      alert('you lost!'); 
      this.restartHandler(); 
      this.grid = Array(this.height).fill(null).map(i => Array(this.width).fill(null).map(i => ' '))
      this.drawCar(this.currCarPos)
      this.rowQueue = []
      this.numCycles = 0
      return this.grid
    }
    this.grid[16][startX + 1] = 'c'
    this.grid[17][startX + 1] = 'c'
    this.grid[17][startX] = 'c'
    this.grid[17][startX + 2] = 'c'
    this.grid[18][startX + 1] = 'c'
    // this.grid[18][startX + 1] = 'c'
    this.grid[19][startX] = 'c'
    this.grid[19][startX + 2] = 'c'
    console.log(this.grid)
    return this.grid
  }

  drawHouse(startX, startY) {
    // x 
    //xxx
    //xxx
    if (startX < 0 || startX-3 > this.width) return this.grid
    if (startY === -3) return this.grid
    
    if (startY === -2) {
      
      this.grid[0][startX] = 'h'
      this.grid[0][startX+1] = 'h'
      this.grid[0][startX+2] = 'h'
      this.nextRow = [...this.grid[0]]
      this.rowQueue.push([...this.nextRow])
      this.nextRow[startX] = ' '
      this.nextRow[startX + 1] = 'h'
      this.nextRow[startX + 2] = ' '
      
      this.rowQueue.push([...this.nextRow])
      

      return this.grid
    }
    if (startY === -1) {
      this.grid[0][startX] = 'h'
      this.grid[0][startX+1] = 'h'
      this.grid[0][startX+2] = 'h'
      this.grid[1][startX] = 'h'
      this.grid[1][startX+1] = 'h'
      this.grid[1][startX+2] = 'h'

      this.nextRow[startX] = ' '
      this.nextRow[startX + 1] = 'h'
      this.nextRow[startX + 2] = ' '

      return this.grid
    }
    
    this.grid[startY][startX+1] = 'h'
    this.grid[startY+1][startX] = 'h'
    this.grid[startY+1][startX+1] = 'h'
    this.grid[startY+1][startX+2] = 'h'
    this.grid[startY+2][startX] = 'h'
    this.grid[startY+2][startX+1] = 'h'
    this.grid[startY+2][startX+2] = 'h'

    this.nextRow = this.grid[0]
    this.nextRow[startX] = ' '
    this.nextRow[startX+1] = ' '
    this.nextRow[startX+2] = ' '

    return this.grid
  }

  hideCar() {
    this.grid[16][this.currCarPos + 1] = ' '
    this.grid[17][this.currCarPos + 1] = ' '
    this.grid[17][this.currCarPos] = ' '
    this.grid[17][this.currCarPos + 2] = ' '
    this.grid[18][this.currCarPos + 1] = ' '
    // this.grid[18][startX + 1] = ' '
    this.grid[19][this.currCarPos] = ' '
    this.grid[19][this.currCarPos + 2] = ' '
    return this.grid

  }

  next() {
    const lastRow = this.grid[this.height]
    this.hideCar()
    this.grid.pop()
    this.grid = [this.rowQueue.shift() || this.generateEmptyRow(), ...this.grid]
    console.log(this.grid)
    this.drawCar(this.currCarPos)
    this.numCycles++
    return this.grid
  }
}