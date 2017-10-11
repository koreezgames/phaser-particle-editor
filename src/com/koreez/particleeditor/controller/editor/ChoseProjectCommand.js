import {SimpleCommand} from 'pure-mvc'
import { loadFile } from '../../utils/utils'
import EditorProxy from '../../model/EditorProxy'
import ParticleEditorView from '../../view/ParticleEditorView'

export default class ChoseProjectCommand extends SimpleCommand {
  execute (notification) {
    const file = notification.getBody()
    loadFile(file, e => {
      let parsedFile = JSON.parse(e.target.result)
      this.facade.sendNotification(ParticleEditorView.SHOW_OPENED_PROJECT_INFO, parsedFile.canvas)
    })
  }
  get proxy () {
    return this.facade.retrieveProxy(EditorProxy.NAME)
  }
}
