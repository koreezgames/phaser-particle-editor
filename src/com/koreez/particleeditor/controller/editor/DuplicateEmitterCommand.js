import {SimpleCommand} from 'pure-mvc'
import ParticleProxy from '../../model/ParticleProxy'

export default class DuplicateEmitterCommand extends SimpleCommand {
  execute (notification) {
    const name = notification.getBody()
    this.proxy.duplicateEmitter(name)
  }
  get proxy () {
    return this.facade.retrieveProxy(ParticleProxy.NAME)
  }
}
