import { generateCarCell, generateEmptyCell, generateEmptyRow, generateHouseCell } from '../utils'

export class Grid {
  constructor({ width = 10, height = 20, restartHandler } = {}) {
    this.width = width
    this.height = height
    this.grid = Array(this.height).fill(null).map(i => generateEmptyRow(this.width))
    this.currCarPos = 4
    this.drawCar(this.currCarPos)
    this.nextRow = generateEmptyRow(this.width)
    this.rowQueue = []
    this.numCycles = 0
    this.restartHandler = restartHandler || (() => null)
  }

  drawCar(startX) {
    // x 
    //xxx
    // x 
    //x x
    if (startX + 3 > this.width || startX < 0) return this.grid
    if (startX !== this.currCarPos) {
      this.grid[16][this.currCarPos + 1] = generateEmptyCell()
      this.grid[17][this.currCarPos + 1] = generateEmptyCell()
      this.grid[17][this.currCarPos] = generateEmptyCell()
      this.grid[17][this.currCarPos + 2] = generateEmptyCell()
      this.grid[18][this.currCarPos + 1] = generateEmptyCell()
      // this.grid[18][startX + 1] = generateEmptyCell()
      this.grid[19][this.currCarPos] = generateEmptyCell()
      this.grid[19][this.currCarPos + 2] = generateEmptyCell()
    }
    

    this.currCarPos = startX
    const possibleCollisionZones = [this.grid[16][startX + 1], this.grid[17][startX + 1], this.grid[17][startX], this.grid[17][startX + 2],
    this.grid[18][startX + 1], this.grid[19][startX], this.grid[19][startX + 2]].filter(i => i.type !== 'empty')
    if (possibleCollisionZones.length) {
      alert('you lost!'); 
      this.restartHandler(); 
      this.grid = Array(this.height).fill(null).map(i => Array(this.width).fill(null).map(i => generateEmptyCell()))
      this.drawCar(this.currCarPos)
      this.rowQueue = []
      this.numCycles = 0
      return this.grid
      
    }
    this.grid[16][startX + 1] = generateCarCell()
    this.grid[17][startX + 1] = generateCarCell()
    this.grid[17][startX] = generateCarCell()
    this.grid[17][startX + 2] = generateCarCell()
    this.grid[18][startX + 1] = generateCarCell()
    // this.grid[18][startX + 1] = generateCarCell()
    this.grid[19][startX] = generateCarCell()
    this.grid[19][startX + 2] = generateCarCell()
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
      
      this.grid[0][startX] = generateHouseCell()
      this.grid[0][startX+1] = generateHouseCell()
      this.grid[0][startX+2] = generateHouseCell()
      this.nextRow = [...this.grid[0]]
      this.rowQueue.push([...this.nextRow])
      this.nextRow[startX] = generateEmptyCell()
      this.nextRow[startX + 1] = generateHouseCell()
      this.nextRow[startX + 2] = generateEmptyCell()
      
      this.rowQueue.push([...this.nextRow])
      

      return this.grid
    }
    if (startY === -1) {
      this.grid[0][startX] = generateHouseCell()
      this.grid[0][startX+1] = generateHouseCell()
      this.grid[0][startX+2] = generateHouseCell()
      this.grid[1][startX] = generateHouseCell()
      this.grid[1][startX+1] = generateHouseCell()
      this.grid[1][startX+2] = generateHouseCell()

      this.nextRow[startX] = generateEmptyCell()
      this.nextRow[startX + 1] = generateHouseCell()
      this.nextRow[startX + 2] = generateEmptyCell()

      return this.grid
    }
    
    this.grid[startY][startX+1] = generateHouseCell()
    this.grid[startY+1][startX] = generateHouseCell()
    this.grid[startY+1][startX+1] = generateHouseCell()
    this.grid[startY+1][startX+2] = generateHouseCell()
    this.grid[startY+2][startX] = generateHouseCell()
    this.grid[startY+2][startX+1] = generateHouseCell()
    this.grid[startY+2][startX+2] = generateHouseCell()

    this.nextRow = this.grid[0]
    this.nextRow[startX] = generateEmptyCell()
    this.nextRow[startX+1] = generateEmptyCell()
    this.nextRow[startX+2] = generateEmptyCell()

    return this.grid
  }

  hideCar() {
    this.grid[16][this.currCarPos + 1] = generateEmptyCell()
    this.grid[17][this.currCarPos + 1] = generateEmptyCell()
    this.grid[17][this.currCarPos] = generateEmptyCell()
    this.grid[17][this.currCarPos + 2] = generateEmptyCell()
    this.grid[18][this.currCarPos + 1] = generateEmptyCell()
    // this.grid[18][startX + 1] = generateEmptyCell()
    this.grid[19][this.currCarPos] = generateEmptyCell()
    this.grid[19][this.currCarPos + 2] = generateEmptyCell()
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