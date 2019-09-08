import React from 'react'
import PidControls from './PidControls';
import Button from './Button';
import { pure } from 'recompose'

const InfoColumn = pure(({ visible, showPid, completed,
    pidSelected, restartSelected,
    pid, changePid }) => {

    const fullColumnStyle = {
        display: 'inline-block',
        verticalAlign: 'top',
        width: '370px',
        marginLeft: '5px',
        marginRight: '5px'
    }

    if (showPid) {
        return <div style={fullColumnStyle}>
            {'PID controls'}
            <PidControls
                pid={pid}
                changePid={changePid}
            />
            <Button text='Restart PID' onClick={pidSelected} />
            <Button text='Manual Control' onClick={restartSelected} />
        </div>
    } else if (visible) {
        return <div style={fullColumnStyle}>
            <h2>{'Well done!'}</h2>
            <p>{"This demo explores the behaviour of shower users, when there is a noticeable delay between controlling the mixer (input) and the temperature change (output)."}</p>
            <p>{"The hypothesis is that the feedback loop created by the user and the shower makes the system output first oscillate, and then stabilize at the convenient temperature range. Much like a PI controller with a slightly too high integral term would control the system."}</p>
            <Button text='Restart' onClick={restartSelected} disabled={!completed} />
            <Button text='Run with PI controller' onClick={pidSelected} />
        </div>
    } else {
        return <div style={fullColumnStyle}></div>
    }
})

export default InfoColumn