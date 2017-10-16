import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class StartRotationStatusChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const data = notification.getBody()
    this.proxy.changeStartRotationStatus(data.status, data.startRotation)
    super.execute(notification)
  }
}
