import '@babel/polyfill'
import 'antd-mobile/dist/antd-mobile.css'
import './styles/main.less'
import '../assets/YGODIY-Chinese-my.ttf'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { pages, NotMatch } from './pages/index'

interface IRouteWrapParam {
  exact?: boolean
  path: string
  wrap: (...props: any[]) => JSX.Element
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
      <Switch>
        {pages.map((p, idx) =>
          RouteWrap({
            ...p,
            key: '' + idx,
          })
        )}
        <NotMatch />
      </Switch>
    </div>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
