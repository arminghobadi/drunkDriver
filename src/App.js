import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GridComponent, Grid } from './components'


export class App extends React.Component {

  state = {
    grid: [],
    highScore: 0
  }


  getRandom(min, max) {
    return Math.round((Math.random()*(max-min))+min)
  }
  componentDidMount() {
    const gridClass = new Grid({ restartHandler: () => {clearInterval(this.state.interval); this.setState({ interval: null })} })
    this.setState({ grid: gridClass.grid, gridClass, carPos: gridClass.currCarPos })
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == '38') {
        
      }
      else if (e.keyCode == '40') {
        const newGrid = gridClass.drawHouse(1,-2)
        // console.log(newGrid)
        this.setState({ grid: newGrid })
      }
      else if (e.keyCode == '37') {
        const newGrid = gridClass.drawCar(gridClass.currCarPos-1)
        // console.log(newGrid)
        this.setState({ grid: newGrid })
      }
      else if (e.keyCode == '39') {
        const newGrid = gridClass.drawCar(gridClass.currCarPos+1)
        // console.log(newGrid)
        this.setState({ grid: newGrid })
      }
    }
  }

  render() {
    const { grid, gridClass } = this.state
    
    return (
      <div className="App">
        <GridComponent grid={grid}/>
        {/* <button onClick={() => this.setState({ grid: this.state.gridClass.next() }) }>next</button> */}
        score: {gridClass ? gridClass.numCycles : 0}
        <br/>
        high score: {this.state.highScore}
        <br/>
        <button onClick={() => {const interval = setInterval(() => {
          this.setState({ grid: this.state.gridClass.next(), highScore: Math.max(this.state.highScore, this.state.gridClass.numCycles) })
          if (this.state.gridClass.numCycles % 10 === 0){
            this.state.gridClass.drawHouse(this.getRandom(0,7), -2)
          }
        }, 100)
        // console.log('up')
        this.setState({ interval })}} disabled={this.state.interval}>start</button>
      </div>
    );
  }
  
  
}

export default App;
