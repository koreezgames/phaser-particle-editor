import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class CollideWorldBoundsChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const status = notification.getBody()
    this.proxy.changeCollideWorldBounds(status)
    super.execute(notification)
  }
}
