import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class AlphaChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const alpha = notification.getBody()
    this.proxy.changeAlpha(alpha)
    super.execute(notification)
  }
}
