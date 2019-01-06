import './index.less'
import * as React from 'react'
import { CardContainer } from './cards/index'
import { IBaseCard } from './types'

interface IProp {
  width: number
  card: IBaseCard
}

interface IState {}

export class CardRenderer extends React.Component<IProp, IState> {
  el: HTMLDivElement
  app: CardContainer

  constructor(props: IProp) {
    super(props)
  }

  componentDidMount() {
    const width = this.props.width > 710 ? 710 : this.props.width
    this.app = new CardContainer({ width })
    this.el.appendChild(this.app.getView())
    this.app.preloadTextures().then(() => {
      this.app.render(this.props.card)
    })
  }

  componentDidUpdate() {
    this.app.render(this.props.card)
  }

  render() {
    const width = this.props.width > 710 ? 710 : this.props.width
    return (
      <div
        className='card-renderer'
        style={{ width: `${width}px`, fontFamily: 'YGOCN' }}
        ref={(div) => (this.el = div)}
      />
    )
  }
}
