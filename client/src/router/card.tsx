import * as React from 'react'
import { CardRenderer } from '../components/card-renderer/index'
import { Route } from 'react-router-dom'
import { FetchCardCaseSingleton } from '../domain/fetch-card'
import { RouteComponentProps } from 'react-router'

interface IParams {
  code: string
}

interface IProp extends RouteComponentProps<IParams> {}

function CardRendererWrap(prop: IProp) {
  const card = FetchCardCaseSingleton.getCard(prop.match.params.code)

  return (
    <div className='card-route'>
      <CardRenderer width={window.innerWidth} card={card} />
    </div>
  )
}

export function CardRoute() {
  return <Route exact path='/card/:code' component={CardRendererWrap} />
}
