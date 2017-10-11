import {SimpleCommand} from 'pure-mvc'
import EditorProxy from '../../model/EditorProxy'

export default class EditorPropertyChangeCommand extends SimpleCommand {
  execute (notification) {
    console.log(this.proxy.getData())
  }

  get proxy () {
    return this.facade.retrieveProxy(EditorProxy.NAME)
  }
}
