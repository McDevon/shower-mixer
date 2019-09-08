import React from 'react'
import Button from './Button';

const TitleArea = ({ startSelected, startDisabled }) => {

    const titleAreaStyle = {
        paddingLeft: '25px',
        paddingRight: '25px',
    }

    return <div style={titleAreaStyle}>
        <h1>{'Have a Nice Shower!'}</h1>
        <p>{"You are entering a shower. But it's way too cold! Use the shower mixer controls to set the temperature to a reasonable setting."}</p>
        <p>{"You can follow the current temperature from the graph below. The convenient zone is marked with the green lines, so aim to get the temperature between them."}</p>
        <Button text='Start' onClick={startSelected} disabled={startDisabled} />
    </div>
}

export default TitleArea