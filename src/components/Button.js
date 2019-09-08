import React from 'react'
import styled from 'styled-components'

const Button = ({ onClick, text, disabled }) => {

    const StyledButton = styled.button`
    background-color: ${disabled ? '#c4cfc1' : '#4CAF50'};
    border: none;
    border-radius: 4px;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 0px;
    font-size: 16px;
    opacity: ${disabled ? '0.6' : '1'};
    :hover {
        background-color: ${disabled ? '#c4cfc1' : '#5bc146'};
    }
    :focus {
        outline: none;
    }
    :active {
        padding: 9px 18px;
        font-size: 14px;
        margin: 1px 4px;
    }
    `

    const divStyle = {
        height: '42px',
        marginRight: '5px'
    }

    return <div style={divStyle}>
        <StyledButton onClick={onClick} disabled={disabled}>
            {text}
        </StyledButton>
    </div>
}

export default Button