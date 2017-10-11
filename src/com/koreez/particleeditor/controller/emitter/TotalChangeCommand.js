import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class TotalChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const total = notification.getBody()
    this.proxy.changeTotal(total)
    super.execute(notification)
  }
}
