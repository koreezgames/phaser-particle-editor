import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class FlowChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const flow = notification.getBody()
    this.proxy.changeFlow(flow)
    super.execute(notification)
  }
}
