import React from 'react';
import './App.css';
import { GridComponent, Grid } from './components'
import firebase from 'firebase'




export class App extends React.Component {

  state = {
    grid: [],
    highScore: 0,
    difficulty: 10
  }


  getRandom(min, max) {
    return Math.round((Math.random()*(max-min))+min)
  }
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyAq7K_Ig2y2yUY075rJyd1aeaPwF090jf8",
      authDomain: "drunkdriver-b798d.firebaseapp.com",
      databaseURL: "https://drunkdriver-b798d.firebaseio.com",
      projectId: "drunkdriver-b798d",
      storageBucket: "drunkdriver-b798d.appspot.com",
      messagingSenderId: "54275581747",
      appId: "1:54275581747:web:8849dfff9db28ee11c4046",
      measurementId: "G-X50D99YPFL"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    
    firebase.auth().signInAnonymously()
    
    firebase.database().ref(`highScores`).once('value').then(snapshot => {
      const val = snapshot.val()
      if (firebase.auth().currentUser)
        if (val) 
          this.setState({ highScore: val[firebase.auth().currentUser.uid] || 0 })
    })



    const gridClass = new Grid({ 
      restartHandler: () => {
        clearInterval(this.state.interval)
        firebase.database().ref('highScores').update({ [firebase.auth().currentUser.uid]: Math.max(this.state.highScore, this.calculateScore({ numCycles: this.state.gridClass.numCycles})) })
        this.setState({ interval: null })
      },
      width: 11, 
      height: 20 
    })
    this.setState({ grid: gridClass.grid, gridClass, carPos: gridClass.currCarPos })
    document.onkeydown = (e) => {
      e = e || window.event;
      if (e.keyCode == '38') {
        
      }
      else if (e.keyCode == '40') {
        // const newGrid = gridClass.drawHouse(1,-2)
        // // console.log(newGrid)
        // this.setState({ grid: newGrid })
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

  calculateScore({ numCycles }) {
    const { difficulty } = this.state
    return Math.round(difficulty*numCycles/10)
  }

  render() {
    const { grid, gridClass, highScore, difficulty, interval } = this.state
    
    return (
      <div className="App">
        <GridComponent grid={grid}/>
        {/* <button onClick={() => this.setState({ grid: this.state.gridClass.next() }) }>next</button> */}
        {/* score: {gridClass ? this.calculateScore({ numCycles: gridClass.numCycles}) : 0}
        <br/>
        high score: {highScore}
        <br/>

        <button 
          style={{ width: '70px', height: '40px', backgroundColor: 'green', margin: '20px' }} 
          onClick={() => {
            const interval = setInterval(() => {
              this.setState({ grid: gridClass.next(), highScore: Math.max(highScore, this.calculateScore({ numCycles: gridClass.numCycles})) })
              if (gridClass.numCycles % 10 === 0){
                gridClass.drawHouse(this.getRandom(0,7), -2)
              }
            }, Math.round(1000/difficulty))
            // console.log('up')
            this.setState({ interval })
          }} 
          disabled={interval}
        >
          Start
        </button>

        <br/>
        (navigation is with arrow keys) (you can only go left and right)

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            style={{ width: '100px', height: '130px', backgroundColor: 'cornflowerblue', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} 
            onClick={() => {
              const newGrid = gridClass.drawCar(gridClass.currCarPos-1)
              this.setState({ grid: newGrid })
            }}
          >
            <div style={{ flex: 1 }} ></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column' }}>
              <div>{'<'}</div>
              <div>{'<<<'}</div>
              <div>{'<<<<<'}</div>
              <div>{'<<<'}</div>
              <div>{'<'}</div>
            </div>
            
            <div style={{ flex: 1 }} ></div>
          </button>

          <button 
            style={{ width: '100px', height: '130px', backgroundColor: 'cornflowerblue', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} 
            onClick={() => {
              const newGrid = gridClass.drawCar(gridClass.currCarPos+1)
              this.setState({ grid: newGrid })
            }}
          >
            <div style={{ flex: 1 }} ></div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
              <div>{'>'}</div>
              <div>{'>>>'}</div>
              <div>{'>>>>>'}</div>
              <div>{'>>>'}</div>
              <div>{'>'}</div>
            </div>
            
            <div style={{ flex: 1 }} ></div>
          </button>
        </div>

        <br />
        difficulty: <input type={'number'} onChange={(e) => this.setState({ difficulty: e.target.value })} value={difficulty} /> */}
      </div>
    );
  }
  
  
}

export default App;
