import * as PIXI from 'pixi.js'
import { Loader } from '../tools/loader'
import { Sizer } from '../tools/sizer'
import { PRELOAD_IMAGE } from './preload'
import { IBaseCard } from '../types'
import { BaseCardTemplate } from './classes'
import { templateFactory } from './factory'

interface ICardContainerParam {
  width: number
}

export class CardContainer {
  app: PIXI.Application
  $loader: Loader
  $sizer: Sizer
  $lastTemplate: BaseCardTemplate

  constructor(params: ICardContainerParam) {
    const height = Math.round(1.457627119 * params.width)
    this.app = new PIXI.Application({
      width: params.width,
      height,
      antialias: true,
      resolution: 2
    })
    this.app.view.style.width = `${params.width}px`
    this.app.view.style.height = `${height}px`
    this.$loader = new Loader(this.app)
    this.$sizer = new Sizer(this.app)
  }

  getView() {
    return this.app.view
  }

  async preloadTextures() {
    await this.$loader.preloadTextures(PRELOAD_IMAGE)
  }

  refreshStage() {
    while (this.app.stage.children.length) {
      this.app.stage.removeChild(this.app.stage.children[0])
    }
  }

  async render(card: IBaseCard) {
    this.refreshStage()
    if (!this.$lastTemplate || this.$lastTemplate.$type !== card.type) {
      this.$lastTemplate = templateFactory({
        type: card.type,
        $loader: this.$loader,
        $sizer: this.$sizer,
        $app: this.app
      })
    }
    this.$lastTemplate.render(card)
  }
}
