import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import showerSim from '../simulations/ShowerSim'
import ShowerControl from './ShowerControl';

const ShowerMixer = props => {
    const [shower, setShower] = useState({
        mixer: 350
    })

    const canvasElement = useRef(null)

    const controlAreaStyle = {
        paddingLeft: '25px',
        paddingRight: '25px',
    }
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

    const changeShower = ({ mixer }) => {
        const newShower = {
            mixer: mixer
        }
        setShower(newShower)
    }

    const startHook = () => {
        console.log('start hook')
        console.log(props.location.search)

        startRender(canvasElement.current, showerSim())
    }

    useEffect(startHook, [])

    return <div>
        <canvas style={canvasStyle} ref={canvasElement} width="600" height="400" />
        <div style={controlAreaStyle}>
            <div style={columnStyle}>
                <ShowerControl
                    value={shower.mixer}
                    min={0} max={400} step={1}
                    onChange={() => ({ y }) => changeShower({ ...shower, mixer: y })}
                />
            </div>
        </div>
    </div>
}

export default ShowerMixer