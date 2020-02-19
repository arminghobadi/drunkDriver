import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GridComponent, Grid } from './components'


export class App extends React.Component {

  state = {
    grid: []
  }

  componentDidMount() {
    const gridClass = new Grid()
    this.setState({ grid: gridClass.grid, gridClass, carPos: gridClass.currCarPos })
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == '38') {
        console.log('up')
      }
      else if (e.keyCode == '40') {
        const newGrid = gridClass.drawHouse(1,3)
        console.log(newGrid)
        this.setState({ grid: newGrid })
      }
      else if (e.keyCode == '37') {
        const newGrid = gridClass.drawCar(gridClass.currCarPos-1)
        this.setState({ grid: newGrid })
      }
      else if (e.keyCode == '39') {
        const newGrid = gridClass.drawCar(gridClass.currCarPos+1)
        this.setState({ grid: newGrid })
      }
    }
  }

  render() {
    const { grid } = this.state
    return (
      <div className="App">
        <GridComponent grid={grid}/>
      </div>
    );
  }
  
  
}

export default App;
