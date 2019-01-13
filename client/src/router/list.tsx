import * as React from 'react'
import { Route } from 'react-router-dom'
// import { RouteComponentProps } from 'react-router'

function ListWrap() {
  return <div />
}

export function ListRoute() {
  return <Route exact path='/' component={ListWrap} />
}
