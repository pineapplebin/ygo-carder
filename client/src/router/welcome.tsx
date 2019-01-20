import * as React from 'react'
import { Route } from 'react-router-dom'
// import * as s from './welcome.less'

function Welcome() {
  return <div>hello world</div>
}

export function WelcomeRoute() {
  return <Route exact path='/' component={Welcome} />
}
