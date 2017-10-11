import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class BounceChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const bounce = notification.getBody()
    this.proxy.changeBounce(bounce)
    super.execute(notification)
  }
}
