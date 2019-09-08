import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import showerSim from '../simulations/ShowerSim'
import ShowerControl from './ShowerControl';
import InfoColumn from './InfoColumn';
import TitleArea from './TitleArea';

const ShowerMixer = props => {
    const [shower, setShower] = useState(1)
    const [pageState, setPageState] = useState({
        running: 0,
        completed: 0,
        pid: 0
    })
    const [pid, setPid] = useState({
        p: 0.001,
        i: 0.00015,
        d: 0
    })

    const canvasElement = useRef(null)

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
    const canvasStyle = {
        marginLeft: '5px',
        marginRight: '5px',
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '10px'
    }

    const changeShower = (mixer) => {
        console.log('Change shower', mixer)
        setShower(mixer)
        canvasElement.current.simulation.setMixer(mixer)
    }

    const changePageState = (state) => {
        setPageState(state)
    }

    const changePid = (newPid) => {
        console.log('Set pid', pid, newPid)
        setPid(newPid)
        canvasElement.current.simulation.setPidValues(newPid)
    }

    const startSelected = (event) => {
        event.preventDefault()
        console.log('Start selected')
        canvasElement.current.simulation.setRunning(true)
        changePageState({ ...pageState, running: 1 })
    }

    const restartSelected = (event) => {
        event.preventDefault()
        console.log('Restart selected')
        setShower(canvasElement.current.simulation.reset(completionCallback(0), pidCallback))
        const newState = {
            running: 1,
            completed: 0,
            pid: 0
        }
        setPageState(newState)
        canvasElement.current.simulation.setUsePid(false)
        canvasElement.current.simulation.setRunning(true)
    }

    const pidSelected = (event) => {
        event.preventDefault()
        console.log('PID selected')
        setShower(canvasElement.current.simulation.reset(completionCallback(1), pidCallback))
        const newState = {
            running: 1,
            completed: 0,
            pid: 1
        }
        setPageState(newState)
        canvasElement.current.simulation.setPidValues(pid)
        canvasElement.current.simulation.setUsePid(true)
        canvasElement.current.simulation.setRunning(true)
    }

    const completionCallback = (usePid) => (mixerValue) => {
        console.log('COMPLETION CALLBACK', shower, usePid)
        canvasElement.current.simulation.setRunning(false)
        const newState = {
            running: 0,
            completed: 1,
            pid: usePid
        }
        setPageState(newState)
    }

    const pidCallback = (controlValue) => {
        //setShower(controlValue)
    }

    const startHook = () => {
        console.log('start hook')
        console.log(props.location.search)

        startRender(canvasElement.current, showerSim())
        const showerVal = canvasElement.current.simulation.reset(completionCallback(pageState.pid), pidCallback)
        canvasElement.current.simulation.setPidValues(pid)
        canvasElement.current.simulation.setUsePid(pageState.pid)
        canvasElement.current.simulation.setRunning(pageState.running)
        setShower(showerVal)
    }

    useEffect(startHook, [])

    return <div>
        <TitleArea
            startSelected={startSelected}
            startDisabled={pageState.running || pageState.completed}/>
        <canvas style={canvasStyle} ref={canvasElement} width='590' height='400' />
        <div style={controlAreaStyle}>
            <div style={columnStyle}>
                <div>
                    {'Shower Mixer Control'}
                </div>
                <ShowerControl
                    value={shower}
                    min={0} max={1} step={0.0025}
                    onChange={() => ({ y }) => { if (pageState.running && !pageState.pid) changeShower(y) }}
                />
            </div>
            <InfoColumn visible={pageState.completed} showPid={pageState.pid}
                pidSelected={pidSelected} restartSelected={restartSelected}
                pid={pid} changePid={changePid} shower={shower} completed={pageState.completed} />
        </div>
    </div>
}

export default ShowerMixer