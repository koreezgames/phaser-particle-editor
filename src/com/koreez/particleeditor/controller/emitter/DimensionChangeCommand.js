import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class DimensionChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const dimension = notification.getBody()
    this.proxy.changeDimension(dimension)
    super.execute(notification)
  }
}
