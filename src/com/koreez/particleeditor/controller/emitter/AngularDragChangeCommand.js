import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class AngularDragChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const angularDrag = notification.getBody()
    this.proxy.changeAngularDrag(angularDrag)
    super.execute(notification)
  }
}
