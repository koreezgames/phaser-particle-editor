import {SimpleCommand} from 'pure-mvc'
import ParticleProxy from '../../model/ParticleProxy'

export default class ChangeEmitterCommand extends SimpleCommand {
  execute (notification) {
    const emitterName = notification.getBody()
    this.proxy.changeCurrentEmitter(emitterName)
  }
  get proxy () {
    return this.facade.retrieveProxy(ParticleProxy.NAME)
  }
}
