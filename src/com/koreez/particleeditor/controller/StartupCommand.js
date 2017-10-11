/**
 * Created by sargis on 7/4/17.
 */
import { MacroCommand } from 'pure-mvc'
import ParticleEditorViewMediator from '../view/ParticleEditorViewMediator'
import RegisterEmitterCommands from './RegisterEmitterCommands'
import RegisterEditorCommands from './RegisterEditorCommands'
import EditorProxy from '../model/EditorProxy'

export default class StartupCommand extends MacroCommand {
  execute (notification) {
    super.execute(notification)
    this.facade.registerProxy(new EditorProxy())
    this.facade.registerMediator(new ParticleEditorViewMediator())
  }

  initializeMacroCommand () {
    this.addSubCommand(RegisterEmitterCommands)
    this.addSubCommand(RegisterEditorCommands)
  }
}
