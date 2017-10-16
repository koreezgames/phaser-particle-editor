import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class AnchorStatusChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const data = notification.getBody()
    this.proxy.changeAnchorStatus(data.status, data.anchor)
    super.execute(notification)
  }
}
