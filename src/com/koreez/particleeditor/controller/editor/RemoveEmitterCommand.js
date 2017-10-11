import {SimpleCommand} from 'pure-mvc'
import ParticleProxy from '../../model/ParticleProxy'

export default class RemoveEmitterCommand extends SimpleCommand {
  execute (notification) {
    const emitterName = notification.getBody()
    this.proxy.removeEmitter(emitterName)
  }
  get proxy () {
    return this.facade.retrieveProxy(ParticleProxy.NAME)
  }
}
