import React from 'react'
import { pure } from 'recompose'

const CompletionDisplay = pure(({completed, time}) => {

    if (completed) {
        return <div>
            {`Completed in ${time.toFixed(2)}s`}
        </div>
    } else {
        return <div></div>
    }
})

export default CompletionDisplay