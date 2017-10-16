import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class AnchorChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const anchor = notification.getBody()
    this.proxy.changeAnchor(anchor)
    super.execute(notification)
  }
}
