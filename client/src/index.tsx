import '@babel/polyfill'
import 'antd-mobile/dist/antd-mobile.css'
import './styles/main.less'
import '../assets/YGODIY-Chinese.ttf'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Link } from 'react-router-dom'
import { CardRoute, WelcomeRoute } from './router/index'

function App() {
  return (
    <div className='content'>
      <CardRoute />
      <WelcomeRoute />
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
