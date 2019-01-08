import './styles/main.less'
import '../assets/YGODIY-Chinese.ttf'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState } from 'react'

import { FetchCardCaseSingleton } from './domain/fetch-card'
import { CardRenderer } from './components/card-renderer/index'

function App() {
  const [card, setCard] = useState(FetchCardCaseSingleton.getCard('123'))
  return (
    <div className='content'>
      {/* <CardComponent width={window.innerWidth} card={card} /> */}
      <CardRenderer width={window.innerWidth} card={card} />
      <div>
        <input
          style={{ width: '100%' }}
          type='text'
          defaultValue={card.name}
          onInput={(e) => setCard({ ...card, name: e.currentTarget.value })}
        />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
