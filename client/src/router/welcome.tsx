import * as React from 'react'
import { Route } from 'react-router-dom'
import * as s from './welcome.module.less'

function Welcome() {
  return <div className={s.title}>hello world</div>
}

export function WelcomeRoute() {
  return <Route exact path='/' component={Welcome} />
}
