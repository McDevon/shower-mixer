import React, { useEffect } from 'react'
import Footer from './components/Footer'
import ShowerMixer from './components/ShowerMixer';

const App = props => {
  const divStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '900px'
  }

  useEffect(() => {
    console.log('app effect')
  })

  return (
    <div style={divStyle}>
        <ShowerMixer location={window.location} />
      <Footer />
    </div>
  )
}

export default App