import {SimpleCommand} from 'pure-mvc'
import ParticleProxy from '../../model/ParticleProxy'

export default class EnableDisableEmitterCommand extends SimpleCommand {
  execute (notification) {
    const emitterName = notification.getBody()
    this.proxy.turnEmitterOnOff(emitterName)
  }
  get proxy () {
    return this.facade.retrieveProxy(ParticleProxy.NAME)
  }
}
