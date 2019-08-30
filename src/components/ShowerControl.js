import React from 'react'
import Slider from 'react-input-slider'

const ShowerControl = ({ value, step, min, max, onChange, suffix='' }) => {
    const divStyle = {
        marginTop: '5px',
        marginLeft: '5px',
        marginRight: '5px',
        marginBottom: '5px'
    }
    console.log(`Mixer value ${value}`)
    return <div style={divStyle}>
        <Slider
            axis="y"
            ystep={step}
            ymin={min}
            ymax={max}
            y={value}
            onChange={onChange()}
            styles={{
                track: {
                  backgroundColor: 'red',
                  height: 300
                },
                active: {
                  backgroundColor: 'blue'
                }
              }}
        />
    </div>
}

export default ShowerControl