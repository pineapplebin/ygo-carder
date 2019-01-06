import * as PIXI from 'pixi.js'

interface IGetTextureResponse {
  [name: string]: PIXI.Texture
}

type TResourcesArg = Array<{ name: string; url: string }>

export class Loader {
  constructor(public app: PIXI.Application) {}

  preloadTextures(resources: TResourcesArg): Promise<void> {
    return new Promise((resolve) => {
      PIXI.loader.add(resources).load(() => {
        resolve()
      })
    })
  }

  getTextureCache(names: string[]): IGetTextureResponse {
    return names.reduce(
      (acc, name) => {
        acc[name] = PIXI.utils.TextureCache[name]
        return acc
      },
      {} as IGetTextureResponse
    )
  }

  loadTexture(resources: TResourcesArg): Promise<IGetTextureResponse> {
    return new Promise((resolve) => {
      const result: IGetTextureResponse = {}
      const loadList: TResourcesArg = []
      let hasFresh = false
      // 检查缓存
      resources.forEach((res) => {
        const cached = PIXI.utils.TextureCache[res.name]
        if (cached !== undefined) {
          result[res.name] = cached
        } else {
          hasFresh = true
          loadList.push(res)
        }
      })
      // 全都有缓存时返回
      if (!hasFresh) {
        resolve(result)
        return
      }
      // 加载
      PIXI.loader.add(loadList).load(() => {
        loadList.forEach((res) => {
          const cached = PIXI.utils.TextureCache[res.name]
          if (cached === undefined) {
            throw new Error('cant load texture')
          }
          result[res.name] = cached
        })
        resolve(result)
      })
    })
  }
}
