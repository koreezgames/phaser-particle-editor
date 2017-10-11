import ParticleProxy from '../../model/ParticleProxy'
import EditorProxy from '../../model/EditorProxy'
import { SimpleCommand } from 'pure-mvc'

export default class DownloadEmittersCommand extends SimpleCommand {
  execute (notification) {
    const particleProxy = this.facade.retrieveProxy(ParticleProxy.NAME)
    const particleVO = particleProxy.getData()
    this.sendNotification(EditorProxy.EMITTERS_DOWNLOAD, particleVO)
    super.execute(notification)
  }
}
