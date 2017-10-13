import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ColorChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const color = notification.getBody()
    this.proxy.changeColor(color)
    super.execute(notification)
  }
}
