import React from 'react'


/**
 * @props:
 *      - type: String
 */
export class HouseComponent extends React.Component {

  render() {
    const { type } = this.props
    const wh = 12
    const backgroundColors = {
      car: 'black',
      house: 'blue',
      null: 'white',
      undefined: 'white'
    }
    return (
      <div 
        style={{ 
          width: `${wh}px`, 
          height: `${wh}px`, 
          backgroundColor: type.backgroundColor, 
          border: '1px black solid' 
        }}
      >

      </div>
    )
  }
}