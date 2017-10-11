import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class LifespanChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const lifespan = notification.getBody()
    this.proxy.changeLifespan(lifespan)
    super.execute(notification)
  }
}
