import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { CardRenderer } from '@/components/card-renderer/index'
import { FetchCardCaseSingleton } from '@/domain/fetch-card'

type IRouteProps = RouteComponentProps<{ id: string }>

export function Card(props: IRouteProps) {
  const { id } = props.match.params
  const card = FetchCardCaseSingleton.getCard(id)

  return (
    <div>
      <h2>{id}</h2>
      <CardRenderer card={card} width={window.innerWidth} />
    </div>
  )
}
