import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ImmediateChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const immediate = notification.getBody()
    this.proxy.changeImmediate(immediate)
    super.execute(notification)
  }
}
