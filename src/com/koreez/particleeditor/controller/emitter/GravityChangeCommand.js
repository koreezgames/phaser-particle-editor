import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class GravityChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const gravity = notification.getBody()
    this.proxy.changeGravity(gravity)
    super.execute(notification)
  }
}
