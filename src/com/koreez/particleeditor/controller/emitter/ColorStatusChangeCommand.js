import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ColorStatusChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const data = notification.getBody()
    this.proxy.changeColorStatus(data.status, data.color)
    super.execute(notification)
  }
}
