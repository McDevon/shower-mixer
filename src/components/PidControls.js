import React from 'react'
import LabelSlider from './LabelSlider'

const PidControls = ({ pid, changePid }) => {

    const style = {
        padding: '10px 0px'
    }

    const maxP = 0.2, maxI = 0.0003, maxD = 5, minD = -5
    const stepP = maxP / 200.0, stepI = maxI / 200.0, stepD = (maxD - minD) / 200.0

    return <div style={style}>
        <LabelSlider
            label='P' value={pid.p} labelValue={(pid.p / maxP).toFixed(3)}
            min={0} max={maxP} step={stepP}
            onChange={() => ({x}) => changePid({ ...pid, p: x })}
        />
        <LabelSlider
            label='I' value={pid.i} labelValue={(pid.i / maxI).toFixed(3)}
            min={0} max={maxI} step={stepI}
            onChange={() => ({x}) => changePid({ ...pid, i: x })}
        />
        <LabelSlider
            label='D' value={pid.d} labelValue={(pid.d / maxD).toFixed(3)}
            min={minD} max={maxD} step={stepD}
            onChange={() => ({x}) => changePid({ ...pid, d: x })}
        />
    </div>
}

export default PidControls