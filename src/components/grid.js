export class Grid {
  constructor({ width = 7, height = 20 } = {}) {
    this.width = width
    this.height = height
    this.grid = Array(this.height).fill(null).map(i => Array(this.width).fill(null).map(i => ' '))
    this.currCarPos = 2
    this.drawCar(this.currCarPos)
    this.nextRow = Array(this.width).fill(null).map(i => ' ')
  }

  drawCar(startX) {
    // x 
    //xxx
    // x 
    //x x
    if (startX + 3 > this.width || startX < 0) return this.grid
    this.grid[16][this.currCarPos + 1] = ' '
    this.grid[17][this.currCarPos + 1] = ' '
    this.grid[17][this.currCarPos] = ' '
    this.grid[17][this.currCarPos + 2] = ' '
    this.grid[18][this.currCarPos + 1] = ' '
    // this.grid[18][startX + 1] = ' '
    this.grid[19][this.currCarPos] = ' '
    this.grid[19][this.currCarPos + 2] = ' '

    this.currCarPos = startX
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
      this.nextRow = this.grid[0]
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
    return this.grid
  }

  next() {
    const lastRow = this.grid[this.height]
  }
}