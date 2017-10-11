import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class RotationChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const rotation = notification.getBody()
    this.proxy.changeRotation(rotation)
    super.execute(notification)
  }
}
