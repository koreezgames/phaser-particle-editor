import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class SpeedChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const speed = notification.getBody()
    this.proxy.changeSpeed(speed)
    super.execute(notification)
  }
}
