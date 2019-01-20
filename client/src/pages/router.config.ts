import { Welcome } from './welcome/index'
import { List } from './list/index'

export const routers = [
  { path: '/', wrap: Welcome },
  { path: '/list', wrap: List }
]
