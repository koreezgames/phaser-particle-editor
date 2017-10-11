import EditorPropertyChangeCommand from './EditorPropertyChangeCommand'

export default class BgImageChangeCommand extends EditorPropertyChangeCommand {
  execute (notification) {
    const bgImage = notification.getBody()
    this.proxy.changeBgImage(bgImage)
    super.execute(notification)
  }
}
