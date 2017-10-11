import { Proxy } from 'pure-mvc'
import EditorVO from './vo/EditorVO'

export default class EditorProxy extends Proxy {
  static NAME = 'EditorProxy'
  static EMITTER_ADD = EditorProxy.NAME + 'AddEmitter'
  static BG_COLOR_CHANGE = EditorProxy.NAME + 'BgColorChange'
  static BG_IMAGE_CHANGE = EditorProxy.NAME + 'BgImageChange'
  static BG_IMAGE_REMOVE = EditorProxy.NAME + 'BgImageRemove'
  static PROJECT_SAVE = EditorProxy.NAME + 'ProjectSave'
  static EMITTERS_DOWNLOAD = EditorProxy.NAME + 'EmittersDownload'

  constructor () {
    super(EditorProxy.NAME, new EditorVO())
    this.editor = this.vo
  }

  changeProjectName (name) {
    this.editor.name = name
  }

  setProjectInfo (config) {
    this.changeProjectName(config.name)
    this.editor.height = config.height
    this.editor.width = config.width
    this.editor.bgColor = config.bgColor
  }

  changeBgColor (bgColor) {
    this.editor.bgColor = bgColor
    this.sendBgColorChangeNotification()
  }

  changeBgImage (bgImage) {
    this.editor.bgImage = bgImage
    this.sendBgImageChangeNotification()
  }

  removeBgImage () {
    this.editor.bgImage = null
    this.sendBgImageRemoveNotification()
  }

  sendBgColorChangeNotification () {
    this.sendNotification(EditorProxy.BG_COLOR_CHANGE, this.editor.bgColor)
  }

  sendBgImageChangeNotification () {
    this.sendNotification(EditorProxy.BG_IMAGE_CHANGE, this.editor.bgImage)
  }

  sendBgImageRemoveNotification () {
    this.sendNotification(EditorProxy.BG_IMAGE_REMOVE)
  }

  get vo () {
    return this.getData()
  }
}
