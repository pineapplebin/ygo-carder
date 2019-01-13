import './styles/main.less'
import '../assets/YGODIY-Chinese.ttf'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'
import { CardRoute } from './router/index'

function App() {
  return (
    <div className='content'>
      <Link to='/card/1'>jump</Link>

      <CardRoute />
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
