import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ScaleTypeChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    this.proxy.changeScaleType()
    super.execute(notification)
  }
}
