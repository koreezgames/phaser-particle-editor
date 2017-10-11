import { Mediator } from 'pure-mvc'
import SandboxState from './SandboxState'
import ParticleProxy from '../../../model/ParticleProxy'
import EditorProxy from '../../../model/EditorProxy'
import { loadImageFile } from '../../../utils/utils'

export default class SandboxStateMediator extends Mediator {
  static NAME = 'SandboxStateMediator'

  get stateView () {
    return window.sandbox.state.getCurrentState()
  }

  onRegister () {
    super.onRegister()
  }

  listNotificationInterests () {
    return [
      ParticleProxy.OPTION_CHANGE,
      ParticleProxy.PROPERTY_CHANGE,
      ParticleProxy.EMITTER_ADD,
      ParticleProxy.EMITTER_RENAME,
      ParticleProxy.EMITTER_REMOVE,
      ParticleProxy.EMITTER_IMAGE_CHANGE,
      EditorProxy.BG_COLOR_CHANGE,
      EditorProxy.BG_IMAGE_CHANGE,
      EditorProxy.BG_IMAGE_REMOVE,
      SandboxState.STATE_READY
    ]
  }

  handleNotification (notification) {
    switch (notification.getName()) {
      case ParticleProxy.PROPERTY_CHANGE:
        this.stateView.updateParticleProperty(notification.getBody())
        break
      case ParticleProxy.OPTION_CHANGE:
        this.stateView.updateParticleOption(notification.getBody())
        break
      case ParticleProxy.EMITTER_ADD:
        this.stateView.addEmitter(notification.getBody())
        break
      case ParticleProxy.EMITTER_RENAME:
        this.stateView.renameEmitter(notification.getBody())
        break
      case ParticleProxy.EMITTER_REMOVE:
        this.stateView.removeEmitter(notification.getBody())
        break
      case ParticleProxy.EMITTER_IMAGE_CHANGE:
        this.stateView.changeParticleImage(notification.getBody())
        break
      case EditorProxy.BG_COLOR_CHANGE:
        this.stateView.updateBgColor(notification.getBody())
        break
      case EditorProxy.BG_IMAGE_CHANGE:
        loadImageFile(notification.getBody(), 'bgImage', this.stateView.updateBgImage.bind(this.stateView))
        break
      case EditorProxy.BG_IMAGE_REMOVE:
        this.stateView.removeBgImage()
        break
      case SandboxState.STATE_READY:
        const editorProxy = this.facade.retrieveProxy(EditorProxy.NAME)
        this.stateView.updateBgColor(editorProxy.vo.bgColor)
        break
    }
  }
}
