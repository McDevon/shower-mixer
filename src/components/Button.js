import React from 'react'

const Button = ({ onClick, text, disabled }) => {
    const style = {
        backgroundColor: disabled ? '#6CAF70' : '#4CAF50',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        opacity: disabled ? '0.6' : '1',
        "&:hover": {
            backgroundColor: "#efefef"
          }
    }
return  <button style={style} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  }

export default Button