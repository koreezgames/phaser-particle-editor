import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ExplodeChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const status = notification.getBody()
    this.proxy.changeExplode(status)
    super.execute(notification)
  }
}
