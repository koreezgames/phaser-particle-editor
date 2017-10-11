import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ScaleDisproportionalChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const scale = notification.getBody()
    this.proxy.changeScaleDisproportional(scale)
    super.execute(notification)
  }
}
