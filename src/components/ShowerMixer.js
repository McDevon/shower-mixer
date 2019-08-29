import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import showerSim from '../simulations/ShowerSim'

const ShowerMixer = props => {
    const [retailer, setRetailer] = useState({
        p: 1, i: 1.2, d: 0, target: 12
    })

    const canvasElement = useRef(null)

    const canvasStyle = {
        border: ' 1px solid #aaa',
    }
    const columnStyle = {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '200px',
        marginLeft: '5px',
        marginRight: '5px'
    }

    const startHook = () => {
        console.log('start hook')
        console.log(props.location.search)

        startRender(canvasElement.current, showerSim())
    }

    useEffect(startHook, [])

    return <div>
        <canvas style={canvasStyle} ref={canvasElement} width="730" height="320" />
        <div style={columnStyle}>
        </div>
    </div>
}

export default ShowerMixer