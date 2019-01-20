import * as React from 'react'
import * as s from './index.module.less'
import { ListItem } from '../../components/list-item/index'
import { repeat } from '../../utils/functional'

export function List() {
  return (
    <div className={s.listBlock}>
      {repeat(10, (i) => (
        <ListItem key={i} />
      ))}
    </div>
  )
}
