import * as React from 'react'
import * as s from './index.module.less'
import { SearchBar } from 'antd-mobile'
import { RouteComponentProps } from 'react-router'

export function Welcome(props: RouteComponentProps) {
  function onSubmit(val: string) {
    props.history.push('/list')
  }

  return (
    <div className={s.welcomeBlock}>
      <img className={s.logo} src='/assets/logo.png' alt='' />
      <div className={s.searchBar}>
        <SearchBar placeholder='快速搜索' onSubmit={onSubmit} />
      </div>
    </div>
  )
}
