import * as React from 'react'
import * as s from './index.module.less'
import classnames from 'classnames'

interface IListItemProps {}

export function ListItem(props: IListItemProps) {
  return (
    <div className={s.listItemBlock}>
      <div className={classnames([s.listItem, s.effect])} />
    </div>
  )
}
