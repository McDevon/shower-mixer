import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import showerSim from '../simulations/ShowerSim'
import ShowerControl from './ShowerControl';
import Button from './Button';

const ShowerMixer = props => {
    const [shower, setShower] = useState({
        mixer: 1,
        running: 0,
        completed: 0,
        pid: 0
    })

    const canvasElement = useRef(null)

    const titleAreaStyle = {
        paddingLeft: '25px',
        paddingRight: '25px',
    }
    const controlAreaStyle = {
        paddingLeft: '25px',
        width: '590px',
        paddingRight: '25px',
    }
    const columnStyle = {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '200px',
        marginLeft: '5px',
        marginRight: '5px'
    }
    const fullColumnStyle = {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '370px',
        marginLeft: '5px',
        marginRight: '5px'
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
            ...shower,
            mixer: mixer
        }
        console.log('Change shower', newShower)
        setShower(newShower)
        canvasElement.current.simulation.setMixer(newShower.mixer)
    }

    const startSelected = (event) => {
        event.preventDefault()
        console.log('Start selected')
        canvasElement.current.simulation.setRunning(true)
        setShower({ ...shower, running: 1 })
    }

    const restartSelected = (event) => {
        event.preventDefault()
        console.log('Restart selected')
        const showerVal = canvasElement.current.simulation.reset(completionCallback(0))
        const newShower = {
            ...shower,
            mixer: showerVal,
            running: 1,
            completed: 0,
            pid: 0
        }
        setShower(newShower)
        canvasElement.current.simulation.setPid(false)
        canvasElement.current.simulation.setRunning(true)
    }

    const pidSelected = (event) => {
        event.preventDefault()
        console.log('PID selected')
        const showerVal = canvasElement.current.simulation.reset(completionCallback(1))
        const newShower = {
            ...shower,
            mixer: showerVal,
            running: 1,
            completed: 0,
            pid: 1
        }
        setShower(newShower)
        canvasElement.current.simulation.setPid(true)
        canvasElement.current.simulation.setRunning(true)
    }

    const completionCallback = (pid) => (mixerValue) => {
        console.log('COMPLETION CALLBACK', shower)
        canvasElement.current.simulation.setRunning(false)
        const newShower = {
            ...shower,
            mixer: mixerValue,
            running: 0,
            completed: 1,
            pid: pid
        }
        setShower(newShower)
    }

    const startHook = () => {
        console.log('start hook')
        console.log(props.location.search)

        startRender(canvasElement.current, showerSim())
        const showerVal = canvasElement.current.simulation.reset(completionCallback(shower.pid))
        setShower({ ...shower, mixer: showerVal })
    }

    useEffect(startHook, [])

    const RightColumn = ({ visible, pid }) => {
        if (pid) {
            return <div style={fullColumnStyle}>
                {'PID controls'}
                <Button text='Restart PID' onClick={pidSelected} />
                <Button text='Manual Control' onClick={restartSelected} />
           </div>
        } else if (visible) {
            return <div style={fullColumnStyle}>
                <h2>{'Well done!'}</h2>
                <p>{"This demo explores the behaviour of shower users, when there is a noticeable delay between controlling the mixer (input) and the temperature change (output)."}</p>
                <p>{"The hypothesis is that the feedback loop created by the user and the shower makes the system output first oscillate, and then stabilizes at the convenient temperature. Much like a PI controller with overshooting calibration would control the system."}</p>
                <Button text='Restart' onClick={restartSelected} disabled={!shower.completed} />
                <Button text='Run with PI controller' onClick={pidSelected} />
            </div>
        } else {
            return <div style={fullColumnStyle}></div>
        }
    }

    return <div>
        <div style={titleAreaStyle}>
            <h1>{'Have a Nice Shower!'}</h1>
            <p>{"You are entering a shower. But it's way too cold! Use the shower mixer controls to set the temperature to a reasonable setting."}</p>
            <p>{"You can follow the current temperature from the graph below. The convenient zone is marked with the green lines, so aim to get the temperature between them."}</p>
            <Button text='Start' onClick={startSelected} disabled={shower.running || shower.completed} />
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
                    onChange={() => ({ y }) => { if (shower.running && !shower.pid) changeShower({ ...shower, mixer: y }) }}
                />
            </div>
            <RightColumn visible={shower.completed} pid={shower.pid} />
        </div>
    </div>
}

export default ShowerMixer