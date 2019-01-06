import * as PIXI from 'pixi.js'

export class Sizer {
  basic: number = 710

  constructor(public app: PIXI.Application) {}

  fromPercent(percent: number, relative: number) {
    return (relative * percent) / 100
  }

  fromPx(px: number) {
    const now = this.app.view.width / 2
    const rst = (px * now) / this.basic
    return +rst.toFixed(2)
  }
}
