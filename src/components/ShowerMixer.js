import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import showerSim from '../simulations/ShowerSim'
import ShowerControl from './ShowerControl';

const ShowerMixer = props => {
    const [shower, setShower] = useState({
        mixer: 1
    })

    const canvasElement = useRef(null)

    const controlAreaStyle = {
        paddingLeft: '25px',
        paddingRight: '25px',
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
        canvasElement.current.simulation.setMixer(newShower.mixer)
    }

    const startHook = () => {
        console.log('start hook')
        console.log(props.location.search)

        startRender(canvasElement.current, showerSim())
        const showerVal = canvasElement.current.simulation.reset()
        setShower({ mixer: showerVal })
    }

    useEffect(startHook, [])

    return <div>
        <canvas ref={canvasElement} width="600" height="400" />
        <div style={controlAreaStyle}>
            <div style={columnStyle}>
                <ShowerControl
                    value={shower.mixer}
                    min={0} max={1} step={0.0025}
                    onChange={() => ({ y }) => changeShower({ ...shower, mixer: y })}
                />
            </div>
        </div>
    </div>
}

export default ShowerMixer