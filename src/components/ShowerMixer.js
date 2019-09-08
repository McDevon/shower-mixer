import React, { useState, useEffect, useRef } from 'react'
import startRender from '../simulations/RenderLoop'
import showerSim from '../simulations/ShowerSim'
import ShowerControl from './ShowerControl';
import InfoColumn from './InfoColumn';
import TitleArea from './TitleArea';

class ShowerMixer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shower: 1,
            page: {
                running: 1,
                completed: 0,
                pid: 1
            },
            pid: {
                p: 0.001,
                i: 0.00015,
                d: 0
            }
        }
        this.canvasElement = React.createRef()

        this.completionCallback = (usePid) => (mixerValue) => {
            console.log('COMPLETION CALLBACK', this.state.shower, usePid)
            this.canvasElement.current.simulation.setRunning(false)
            const newState = {
                running: 0,
                completed: 1,
                pid: usePid
            }
            this.setState({ page: newState })
        }
        this.pidCallback = (controlValue) => {
            this.setState({ shower: controlValue })
        }
        this.startSelected = (event) => {
            event.preventDefault()
            console.log('Start selected')
            this.canvasElement.current.simulation.setRunning(true)
            this.setState({ page: {...this.state.pageState, running: 1} })
        }
        this.pidSelected = (event) => {
            event.preventDefault()
            console.log('PID selected')
            this.setState({ shower: this.canvasElement.current.simulation.reset(this.completionCallback(1), this.pidCallback) })
            const newState = {
                running: 1,
                completed: 0,
                pid: 1
            }
            this.setState({ page: newState })
            this.canvasElement.current.simulation.setPidValues(this.state.pid)
            this.canvasElement.current.simulation.setUsePid(true)
            this.canvasElement.current.simulation.setRunning(true)
        }
        this.restartSelected = (event) => {
            event.preventDefault()
            console.log('Restart selected')
            this.setState({ shower: this.canvasElement.current.simulation.reset(this.completionCallback(0), this.pidCallback) })
            const newState = {
                running: 1,
                completed: 0,
                pid: 0
            }
            this.setState({ page: newState })
            this.canvasElement.current.simulation.setUsePid(false)
            this.canvasElement.current.simulation.setRunning(true)
        }
        this.changePid = (newPid) => {
            this.setState({ pid: newPid })
            this.canvasElement.current.simulation.setPidValues(newPid)
        }
        this.changeShower = (mixer) => {
            console.log('Change shower', mixer)
            this.setState({ shower: mixer })
            this.canvasElement.current.simulation.setMixer(mixer)
        }
    }

    componentDidMount() {
        startRender(this.canvasElement.current, showerSim())
        const showerVal = this.canvasElement.current.simulation.reset(this.completionCallback(this.state.page.pid), this.pidCallback)
        this.canvasElement.current.simulation.setPidValues(this.state.pid)
        this.canvasElement.current.simulation.setUsePid(this.state.page.pid)
        this.canvasElement.current.simulation.setRunning(this.state.page.running)
        this.setState({ shower: showerVal })
    }

    render() {
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

        return <div>
            <TitleArea
                startSelected={this.startSelected}
                startDisabled={this.state.page.running || this.state.page.completed} />
            <canvas style={canvasStyle} ref={this.canvasElement} width='590' height='400' />
            <div style={controlAreaStyle}>
                <div style={columnStyle}>
                    <div>
                        {'Shower Mixer Control'}
                    </div>
                    <ShowerControl
                        value={this.state.shower}
                        min={0} max={1} step={0.0025}
                        onChange={() => ({ y }) => { if (this.state.page.running && !this.state.page.pid) this.changeShower(y) }}
                    />
                </div>
                <InfoColumn visible={this.state.page.completed} showPid={this.state.page.pid}
                    pidSelected={this.pidSelected} restartSelected={this.restartSelected}
                    pid={this.state.pid} changePid={this.changePid} completed={this.state.page.completed} />
            </div>
        </div>
    }
}

export default ShowerMixer