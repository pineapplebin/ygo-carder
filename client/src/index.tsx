import '@babel/polyfill'
import 'antd-mobile/dist/antd-mobile.css'
import './styles/main.less'
import '../assets/YGODIY-Chinese.ttf'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { pages } from './pages/index'

interface IRouteWrapParam {
  exact?: boolean
  path: string
  wrap: React.SFC
  key: string
}

function RouteWrap(param: IRouteWrapParam) {
  return (
    <Route
      key={param.key}
      exact={param.exact || true}
      path={param.path}
      component={param.wrap}
    />
  )
}

function App() {
  return (
    <div className='content'>
      {pages.map((p, idx) =>
        RouteWrap({
          ...p,
          key: '' + idx
        })
      )}
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
