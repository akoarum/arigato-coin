import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'
import Top from './pages/Top'
import { drizzleOptions } from './drizzle'

const container = document.getElementById('app')
const root = ReactDOMClient.createRoot(container)
const drizzle = new Drizzle(drizzleOptions)

root.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <DrizzleContext.Consumer>
      {
        (drizzleContext) => {
          const { drizzle, drizzleState, initialized } = drizzleContext

          if (!initialized) return 'Loading...'

          return <Top drizzle={drizzle} drizzleState={drizzleState} />
        }
      }
    </DrizzleContext.Consumer>
  </DrizzleContext.Provider>
)
