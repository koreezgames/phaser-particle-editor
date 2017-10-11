import PureMVC from 'pure-mvc'
import ParticleProxy from '../../model/ParticleProxy'

export default class EmitterPropertyChangeCommand extends PureMVC.SimpleCommand {
  execute (notification) {
  }

  get proxy () {
    return this.facade.retrieveProxy(ParticleProxy.NAME)
  }
}
