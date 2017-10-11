import {SimpleCommand} from 'pure-mvc'
import ParticleProxy from '../../model/ParticleProxy'
import { loadFile } from '../../utils/utils'

export default class AddEmitterCommand extends SimpleCommand {
  execute (notification) {
    const body = notification.getBody()
    const name = body.name
    const file = body.file
    if (file) {
      loadFile(file, e => {
        let parsedFile = JSON.parse(e.target.result)
        for (let key in parsedFile.emitters) {
          this.proxy.addEmitter(key, parsedFile.emitters[key])
        }
      })
    } else {
      if (!name) {
        return
      }
      this.proxy.addEmitter(name, this.proxy.vo[name])
    }
  }
  get proxy () {
    return this.facade.retrieveProxy(ParticleProxy.NAME)
  }
}
