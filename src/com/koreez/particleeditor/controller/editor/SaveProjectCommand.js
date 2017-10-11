import ParticleProxy from '../../model/ParticleProxy'
import EditorProxy from '../../model/EditorProxy'
import { SimpleCommand } from 'pure-mvc'

export default class SaveProjectCommand extends SimpleCommand {
  execute (notification) {
    const particleProxy = this.facade.retrieveProxy(ParticleProxy.NAME)
    const particleVO = particleProxy.getData()
    const editorProxy = this.facade.retrieveProxy(EditorProxy.NAME)
    const editorVO = editorProxy.getData()
    let vo = {}
    vo.canvas = editorVO
    vo.particle = particleVO.emitters
    this.sendNotification(EditorProxy.PROJECT_SAVE, vo)
    super.execute(notification)
  }
}
