import EditorPropertyChangeCommand from './EditorPropertyChangeCommand'

export default class BgColorChangeCommand extends EditorPropertyChangeCommand {
  execute (notification) {
    const bgColor = notification.getBody()
    this.proxy.changeBgColor(bgColor)
    super.execute(notification)
  }
}
