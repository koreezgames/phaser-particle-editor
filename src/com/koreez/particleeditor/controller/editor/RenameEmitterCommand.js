import {SimpleCommand} from 'pure-mvc'
import ParticleProxy from '../../model/ParticleProxy'

export default class RenameEmitterCommand extends SimpleCommand {
  execute (notification) {
    const info = notification.getBody()
    const oldName = info.oldName
    const newName = info.newName
    this.proxy.renameEmitter(oldName, newName)
    window.sandbox.cache.removeImage(oldName)
  }
  get proxy () {
    return this.facade.retrieveProxy(ParticleProxy.NAME)
  }
}
