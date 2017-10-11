import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class QuantityChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const quantity = notification.getBody()
    this.proxy.changeQuantity(quantity)
    super.execute(notification)
  }
}
