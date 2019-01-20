import * as React from 'react'
import * as s from './index.module.less'

export function Welcome() {
  return (
    <div className={s.welcomeBlock}>
      <img className={s.logo} src='/assets/logo.png' alt='' />
    </div>
  )
}
