import {Mediator} from 'pure-mvc'
import ParticleEditorView from './ParticleEditorView'
import ParticleEmitterViewMediator from './component/ParticleEmitterViewMediator'
import ParticleProxy from '../model/ParticleProxy'
import ParticleEmitterView from './component/ParticleEmitterView'
import EditorProxy from '../model/EditorProxy'
import SandboxStateMediator from './sandbox/state/SandboxStateMediator'
import SandboxState from './sandbox/state/SandboxState'
import Sandbox from './sandbox/Sandbox'

export default class ParticleEditorViewMediator extends Mediator {
  static NAME = 'ParticleEditorViewMediator'

  constructor (viewComponent) {
    super(ParticleEditorViewMediator.NAME, viewComponent)
  }

  get currentState () {
    return window.sandbox.state.getCurrentState()
  }

  listNotificationInterests () {
    return [
      Sandbox.SANDBOX_READY,
      EditorProxy.PROJECT_SAVE,
      EditorProxy.EMITTERS_DOWNLOAD,
      EditorProxy.BG_COLOR_CHANGE,
      ParticleProxy.EMITTER_ADD,
      ParticleProxy.EMITTER_RENAME,
      ParticleProxy.EMITTER_REMOVE,
      ParticleProxy.PROPERTY_CHANGE,
      ParticleProxy.CURRENT_EMITTER_CHANGE,
      SandboxState.STATE_READY,
      ParticleEditorView.SHOW_OPENED_PROJECT_INFO
    ]
  }

  onRegister () {
    super.onRegister()
    this.particleEditorView = new ParticleEditorView()
    this.particleEditorView.onProjectChoose.add(this.onProjectChoose, this)
    this.particleEditorView.onCreateEmitterTabClick.add(this.onCreateEmitterTabClick, this)
    this.particleEditorView.onCreateSandbox.add(this.onCreateSandbox, this)
    this.particleEditorView.onDownload.add(this.onDownload, this)
    this.particleEditorView.onSave.add(this.onSave, this)
    this.particleEditorView.onProjectNameChange.add(this.onProjectNameChange, this)
    this.particleEditorView.onEmitterAdd.add(this.onEmitterAdd, this)
    this.particleEditorView.onEmitterDuplicate.add(this.onEmitterDuplicate, this)
    this.particleEditorView.onEmitterChange.add(this.onEmitterChange, this)
    this.particleEditorView.onEmitterRename.add(this.onEmitterRename, this)
    this.particleEditorView.onEmitterEdit.add(this.onEmitterEdit, this)
    this.particleEditorView.onEmitterRemove.add(this.onEmitterRemove, this)
    this.particleEditorView.onTurnEmitterOnOff.add(this.onEnableDisableEmitter, this)
    this.particleEditorView.onBgColorChange.add(this.onBgColorChange, this)
    this.particleEditorView.onBgImageChange.add(this.onBgImageChange, this)
    this.particleEditorView.onBgImageRemove.add(this.onBgImageRemove, this)
    this.particleEditorView.onMouseClick.add(this.onMouseClick, this)
    this.particleEditorView.onFollowCursorChange.add(this.onFollowCursorChange, this)
    this.particleEditorView.onCloseCreateEmitterModal.add(this.onCloseCreateEmitterModal, this)
    const editorProxy = this.facade.retrieveProxy(EditorProxy.NAME)
    const vo = editorProxy.vo
    this.particleEditorView.setCreateSandboxModalValues(vo)
    this.particleEditorView.showCreateSandboxModal()
  }

  handleNotification (notification) {
    switch (notification.getName()) {
      case Sandbox.SANDBOX_READY:
        this.facade.registerMediator(new ParticleEmitterViewMediator())
        this.facade.registerMediator(new SandboxStateMediator())
        this.particleEditorView.hideCreateSandboxModal()
        this.particleEditorView.showControls()
        this.particleEditorView.setValues(notification.getBody())
        this.particleEditorView.setInputMinimalWidth()
        break
      case ParticleEditorView.SHOW_OPENED_PROJECT_INFO:
        this.particleEditorView.setOpenedProjectInfo(notification.getBody())
        break
      case EditorProxy.PROJECT_SAVE:
        this.particleEditorView.downloadJSON('.downloadProject', notification.getBody(), '-Project.ppe')
        break
      case EditorProxy.EMITTERS_DOWNLOAD:
        this.particleEditorView.downloadJSON('#downloadEmitters', notification.getBody(), '-Emitters.json')
        break
      case EditorProxy.BG_COLOR_CHANGE:
        this.particleEditorView.changePreviewImageBackground(notification.getBody())
        break
      case ParticleProxy.EMITTER_ADD:
        this.particleEditorView.addEmitterTab(notification.getBody())
        this.particleEditorView.cleanChoseEmitters()
        this.particleEditorView.cleanNewEmitterName()
        this.particleEditorView.hideCreateEmitterModal()
        break
      case ParticleProxy.CURRENT_EMITTER_CHANGE:
        this.particleEditorView.setActiveEmitter(notification.getBody())
        break
      case ParticleProxy.EMITTER_RENAME:
        this.particleEditorView.renameEmitterTab(notification.getBody())
        break
      case ParticleProxy.EMITTER_REMOVE:
        this.particleEditorView.removeEmitterButton(notification.getBody())
        break
      case SandboxState.STATE_READY:
        const particleProxy = this.facade.retrieveProxy(ParticleProxy.NAME)
        const particleVO = particleProxy.getData()
        this.particleEditorView.initEmitterButtons(particleVO)
        break
      case ParticleProxy.PROPERTY_CHANGE:
        const name = notification.getBody()
        const vo = this.facade.retrieveProxy(ParticleProxy.NAME).getData()
        this.particleEditorView.setEmitterTabEyeIcon(name, vo.emitters[name].enabled)
        break
    }
  }
  onProjectChoose () {
    this.sendNotification(ParticleEditorView.CHOSE_PROJECT, this.particleEditorView.choseProject)
  }

  onCreateEmitterTabClick () {
    this.particleEditorView.clearChooseEmitterTab()
  }

  onCreateSandbox () {
    this.sendNotification(ParticleEditorView.CREATE_SANDBOX, {
      file: this.particleEditorView.choseProject,
      name: this.particleEditorView.createProjectName,
      height: this.particleEditorView.sandboxHeight,
      width: this.particleEditorView.sandboxWidth
    })
    this.particleEditorView.setInputMinimalWidth()
  }

  onEmitterAdd () {
    this.sendNotification(ParticleEditorView.ADD_EMITTER, {
      name: this.particleEditorView.newEmitterName,
      file: this.particleEditorView.choseEmitters
    })
  }

  onEmitterDuplicate () {
    this.sendNotification(ParticleEditorView.DUPLICATE_EMITTER, this.particleEditorView.targetEmitterName)
  }

  onDownload () {
    this.sendNotification(ParticleEditorView.DOWNLOAD_EMITTERS)
  }

  onSave () {
    this.sendNotification(ParticleEditorView.SAVE_PROJECT)
  }

  onProjectNameChange () {
    this.sendNotification(ParticleEditorView.CHANGE_PROJECT_NAME, this.particleEditorView.projectName)
  }

  addEmitter (name, properties = null) {
    this.sendNotification(ParticleEditorView.ADD_EMITTER, {name, properties})
  }

  onEmitterChange () {
    this.sendNotification(ParticleEditorView.CHANGE_EMITTER, this.particleEditorView.targetEmitterName)
  }

  onEmitterEdit () {
    this.particleEditorView.editEmitterTabName(this.particleEditorView.tabButtonTargetName)
  }
  onEmitterRename () {
    this.sendNotification(ParticleEditorView.RENAME_EMITTER, {
      oldName: this.particleEditorView.targetEmitterName,
      newName: this.particleEditorView.currentTabName
    })
  }

  onEnableDisableEmitter () {
    const particleProxy = this.facade.retrieveProxy(ParticleProxy.NAME)
    const vo = particleProxy.getData()
    const name = this.particleEditorView.tabButtonTargetName

    this.particleEditorView.toggleEmitterTabEyeIcon(name, vo.emitters[name].enabled)
    this.sendNotification(ParticleEditorView.ENABLE_DISABLE_EMITTER, name)
  }

  onEmitterRemove () {
    this.sendNotification(ParticleEditorView.REMOVE_EMITTER, this.particleEditorView.tabButtonTargetName)
  }

  onBgColorChange () {
    this.sendNotification(ParticleEditorView.CHANGE_BG_COLOR, this.particleEditorView.bgColor)
  }

  onBgImageChange () {
    this.particleEditorView.enableRemoveBgImageButton()
    this.sendNotification(ParticleEditorView.CHANGE_BG_IMAGE, this.particleEditorView.bgImage)
  }

  onBgImageRemove () {
    this.particleEditorView.disableRemoveBgImageButton()
    this.sendNotification(ParticleEditorView.REMOVE_BG_IMAGE)
  }

  onMouseClick () {
    this.particleEditorView.changeFollowCursorCheckboxStatus()
    this.onFollowCursorChange()
  }

  onFollowCursorChange () {
    this.currentState.changeFollowCursorStatus()
  }

  onCloseCreateEmitterModal () {
    this.particleEditorView.setActiveEmitter(this.particleEditorView.currentTabName)
  }
}
