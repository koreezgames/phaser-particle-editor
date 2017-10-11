import { SimpleCommand } from 'pure-mvc'
import BgColorChangeCommand from './editor/BgColorChangeCommand'
import ParticleEditorView from '../view/ParticleEditorView'
import BgImageChangeCommand from './editor/BgImageChangeCommand'
import BgImageRemoveCommand from './editor/BgImageRemoveCommand'
import SandboxCreateCommand from './editor/SandboxCreateCommand'
import SaveProjectCommand from './editor/SaveProjectCommand'
import DownloadEmittersCommand from './editor/DownloadEmittersCommand'
import AddEmitterCommand from './editor/AddEmitterCommand'
import RemoveEmitterCommand from './editor/RemoveEmitterCommand'
import ChangeEmitterCommand from './editor/ChangeEmitterCommand'
import EnableDisableEmitterCommand from './editor/EnableDisableEmitterCommand'
import RenameEmitterCommand from './editor/RenameEmitterCommand'
import ChoseProjectCommand from './editor/ChoseProjectCommand'
import ChangeProjectNameCommand from './editor/ChangeProjectNameCommand'

export default class RegisterEditorCommands extends SimpleCommand {
  execute (notification) {
    this.facade.registerCommand(ParticleEditorView.CREATE_SANDBOX, SandboxCreateCommand)
    this.facade.registerCommand(ParticleEditorView.SAVE_PROJECT, SaveProjectCommand)
    this.facade.registerCommand(ParticleEditorView.CHANGE_PROJECT_NAME, ChangeProjectNameCommand)
    this.facade.registerCommand(ParticleEditorView.CHOSE_PROJECT, ChoseProjectCommand)
    this.facade.registerCommand(ParticleEditorView.DOWNLOAD_EMITTERS, DownloadEmittersCommand)
    this.facade.registerCommand(ParticleEditorView.ADD_EMITTER, AddEmitterCommand)
    this.facade.registerCommand(ParticleEditorView.CHANGE_EMITTER, ChangeEmitterCommand)
    this.facade.registerCommand(ParticleEditorView.RENAME_EMITTER, RenameEmitterCommand)
    this.facade.registerCommand(ParticleEditorView.REMOVE_EMITTER, RemoveEmitterCommand)
    this.facade.registerCommand(ParticleEditorView.ENABLE_DISABLE_EMITTER, EnableDisableEmitterCommand)
    this.facade.registerCommand(ParticleEditorView.CHANGE_BG_COLOR, BgColorChangeCommand)
    this.facade.registerCommand(ParticleEditorView.CHANGE_BG_IMAGE, BgImageChangeCommand)
    this.facade.registerCommand(ParticleEditorView.REMOVE_BG_IMAGE, BgImageRemoveCommand)
  }
}
