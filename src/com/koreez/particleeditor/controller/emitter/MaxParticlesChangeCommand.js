import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class MaxParticlesChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const maxParticles = notification.getBody()
    this.proxy.changeMaxParticles(maxParticles)
    super.execute(notification)
  }
}
