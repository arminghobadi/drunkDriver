import React from 'react'


/**
 * @props:
 *      - type: String
 */
export class HouseComponent extends React.Component {

  render() {
    const { type } = this.props
    const wh = 10
    const backgroundColors = {
      car: 'black',
      house: 'blue'
    }
    return (
      <div style={{ width: `${wh}px`, height: `${wh}px`, backgroundColor: backgroundColors[type] ? backgroundColors[type] : 'white', border: '1px black solid' }}>

      </div>
    )
  }
}