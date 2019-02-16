import { Welcome } from './welcome/index'
import { List } from './list/index'
import { Card } from './card/index'

export const routers = [
  { path: '/', wrap: Welcome },
  { path: '/list', wrap: List },
  { path: '/card/:id', wrap: Card },
]
