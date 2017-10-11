import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class CollideChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const status = notification.getBody()
    this.proxy.changeCollide(status)
    super.execute(notification)
  }
}
