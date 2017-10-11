import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class ParticleImageChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const image = notification.getBody()
    this.proxy.changeParticleImage(image)
    super.execute(notification)
  }
}
