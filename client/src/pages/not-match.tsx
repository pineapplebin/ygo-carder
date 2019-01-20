import * as React from 'react'
import { Route } from 'react-router-dom'
import * as s from './not-match.module.less'

export function NotMatch() {
  return (
    <Route
      path='*'
      component={() => (
        <div className={s.notMatchBlock}>
          <h1>没有符合的内容😯</h1>
        </div>
      )}
    />
  )
}
