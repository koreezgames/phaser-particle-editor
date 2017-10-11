import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ScaleProportionalChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const scale = notification.getBody()
    this.proxy.changeScaleProportional(scale)
    super.execute(notification)
  }
}
