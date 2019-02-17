import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { CardRenderer } from '@/components/card-renderer/index'
import { getCardList } from '@/data/fetch-card'
import { IBaseCard } from '@/typings/card'

type IRouteProps = RouteComponentProps<{ id: string }>

interface ICardListProps {
  list: IBaseCard[]
  onClick: (idx: number) => void
}

function CardList(props: ICardListProps) {
  const { list, onClick } = props
  const style = { cursor: 'pointer', color: 'blue', marginBottom: '5px' }

  return (
    <ul style={{ margin: '10px' }}>
      {list.map((item, idx) => (
        <li key={idx} style={style}>
          <a onClick={() => onClick(idx)}>{`${item.series} ${item.name}`}</a>
        </li>
      ))}
    </ul>
  )
}

export function Card(props: IRouteProps) {
  const { id } = props.match.params
  const [cardList, setCardList] = React.useState<IBaseCard[]>([])
  const [index, setIndex] = React.useState<number>(0)

  React.useEffect(() => {
    getCardList().then((res) => {
      setCardList(res)
    })
  }, [id])

  return (
    <div>
      <h2>{cardList[index] && cardList[index].cardCode}</h2>
      <CardList list={cardList} onClick={(idx) => setIndex(idx)} />
      {cardList[index] && (
        <CardRenderer card={cardList[index]} width={window.innerWidth} />
      )}
    </div>
  )
}
