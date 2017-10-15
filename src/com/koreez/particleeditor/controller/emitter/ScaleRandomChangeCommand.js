import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ScaleRandomChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const scale = notification.getBody()
    this.proxy.changeRandomScale(scale)
    super.execute(notification)
  }
}
