import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class StartRotationChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const startRotation = notification.getBody()
    this.proxy.changeStartRotation(startRotation)
    super.execute(notification)
  }
}
