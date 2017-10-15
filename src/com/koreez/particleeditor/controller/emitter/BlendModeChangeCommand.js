import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class BlendModeChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const blendMode = notification.getBody()
    this.proxy.changeBlendMode(blendMode)
    super.execute(notification)
  }
}
