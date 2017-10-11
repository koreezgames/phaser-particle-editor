import EditorPropertyChangeCommand from './EditorPropertyChangeCommand'

export default class BgImageRemoveCommand extends EditorPropertyChangeCommand {
  execute (notification) {
    this.proxy.removeBgImage()
    super.execute(notification)
  }
}
