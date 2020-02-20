import React from 'react'

import { HouseComponent } from './house.component'
/**
 * @props
 *      - grid: Array<Array<String>>
 */
export class GridComponent extends React.Component {

  render() {
    const { grid } = this.props
    const pixelMap = {
      c: 'car',
      h: 'house'
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          grid.map(row => 
            <div style={{ display: 'flex', flexDirection: 'row' }} >
              { 
                row.map(pixel => 
                  pixelMap[pixel] ? <HouseComponent type={pixelMap[pixel]} /> : <HouseComponent />
                ) 
              }
            </div>
          )
        }
      </div>
    )
  }
}