import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ColorStatusChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    this.proxy.changeColorStatus()
    super.execute(notification)
  }
}
