import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ScaleChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const scale = notification.getBody()
    this.proxy.changeScale(scale)
    super.execute(notification)
  }
}
