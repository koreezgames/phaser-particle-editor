import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class PositionOffsetChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const positionOffset = notification.getBody()
    this.proxy.changeEmitPosition(positionOffset)
    super.execute(notification)
  }
}
