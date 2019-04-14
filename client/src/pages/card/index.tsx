import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { CardRenderer } from '@/components/card-renderer/index'
import { getCardList } from '@/data/fetch-card'
import { IBaseCard } from '@/typings/card'

type IRouteProps = RouteComponentProps<{ id: string }>

interface ICardListProps {
  currentIndex: number
  list: IBaseCard[]
  onClick: (idx: number) => void
}

function CardList(props: ICardListProps) {
  const { currentIndex, list, onClick } = props
  const style: React.CSSProperties = {
    cursor: 'pointer',
    marginBottom: '5px',
    width: '30%',
    listStyle: 'none',
    textAlign: 'center',
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <ul style={{ margin: '10px', display: 'flex', flexWrap: 'wrap' }}>
        {list.map((item, idx) => (
          <li
            key={idx}
            style={{ ...style, color: idx === currentIndex ? 'red' : 'blue' }}
          >
            <a onClick={() => onClick(idx)}>{`${item.series} ${item.name}`}</a>
          </li>
        ))}
      </ul>
      <p style={{ textAlign: 'center' }}>共 {list.length} 张</p>
    </div>
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
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>{cardList[index] && cardList[index].cardCode}</h2>
      <CardList
        currentIndex={index}
        list={cardList}
        onClick={(idx) => setIndex(idx)}
      />
      {cardList[index] && (
        <CardRenderer card={cardList[index]} width={window.innerWidth} />
      )}
    </div>
  )
}
