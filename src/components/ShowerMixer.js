import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import showerSim from '../simulations/ShowerSim'
import ShowerControl from './ShowerControl';

const ShowerMixer = props => {
    const [shower, setShower] = useState({
        mixer: 1
    })

    const canvasElement = useRef(null)

    const titleAreaStyle = {
        paddingLeft: '25px',
        paddingRight: '25px',
    }
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
    const ingressStyle = {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '590px',
        marginLeft: '5px',
        marginRight: '5px',
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '20px'
    }
    const canvasStyle = {
        marginLeft: '5px',
        marginRight: '5px',
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '10px'
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
         <div style={titleAreaStyle}>
            <h1>{'Have a Nice Shower'}</h1>
            <p>{"You are entering a shower. But it's way too cold! Use the shower mixer controls to set the temperature to a reasonable setting."}</p>
            <p>{"You can follow the current temperature from the graph below. The proper temperature is marked with the green lines, so aim to get the temperature between them."}</p>
         </div>
        <canvas style={canvasStyle} ref={canvasElement} width='590' height='400' />
        <div style={controlAreaStyle}>
            <div style={columnStyle}>
                <div>
                    {'Shower Mixer Control'}
                </div>
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