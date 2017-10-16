import Phaser from 'phaser'
import { Facade } from 'pure-mvc'
import ParticleProxy from '../../../model/ParticleProxy'
import ParticleEditorFacade from '../../../ParticleEditorFacade'
import { ParticleEditorPlugin } from '@koreez/phaser-particle-editor-plugin'

export default class SandboxState extends Phaser.State {
  static NAME = 'SandboxState'
  static STATE_READY = SandboxState.NAME + 'Ready'

  init (...args) {
    this.facade = Facade.getInstance(ParticleEditorFacade.KEY)
    this.game.add.plugin(ParticleEditorPlugin)
  }

  create () {
    this.stage.backgroundColor = '#000000'
    this.game.renderer.renderSession.roundPixels = true
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true

    this.followCursorStatus = false
    this.bgImage = this.game.add.sprite()
    this.particleProxy = this.facade.retrieveProxy(ParticleProxy.NAME)
    const particleVO = this.particleProxy.getData()
    this.particle = this.game.add.particleEffect(this.world.centerX, this.world.centerY, particleVO)
    this.game.input.onDown.add(this.enableFollowCursor, this)
    this.game.input.onUp.add(this.disableFollowCursor, this)
    this.game.input.mouse.mouseOutCallback = this.centerParticle.bind(this)
    this.game.input.addMoveCallback(this.followCursor, this)
    this.facade.sendNotification(SandboxState.STATE_READY)
  }

  enableFollowCursor () {
    this.followCursorStatus = true
  }

  disableFollowCursor () {
    this.followCursorStatus = false
  }

  centerParticle () {
    this.particle.emitX = 0
    this.particle.emitY = 0
  }

  followCursor () {
    if (!this.followCursorStatus) {
      return
    }
    this.particle.emitX = this.game.input.x - this.particle.x
    this.particle.emitY = this.game.input.y - this.particle.y
  }

  updateParticleProperty (emitterName) {
    const particleVO = this.particleProxy.getData()
    this.particle.updateEmitterProperties(emitterName, particleVO.emitters[emitterName])
  }

  updateParticleOption (emitterName) {
    const particleVO = this.particleProxy.getData()
    this.particle.updateEmitterOption(emitterName, particleVO.emitters[emitterName])
  }

  changeParticleImage (emitterName) {
    const particleVO = this.particleProxy.getData()
    this.particle.updateEmitterImage(emitterName, particleVO.emitters[emitterName])
  }

  addEmitter (emitterName) {
    const particleVO = this.particleProxy.getData()
    this.particle.addEmitter(emitterName, particleVO.emitters[emitterName])
  }

  renameEmitter (name) {
    const nameOld = name.oldName
    const nameNew = name.newName
    const particleVO = this.particleProxy.getData()
    this.particle.removeEmitter(nameOld)
    this.particle.addEmitter(nameNew, particleVO.emitters[nameNew])
  }

  removeEmitter (emitterName) {
    this.particle.removeEmitter(emitterName)
  }

  updateBgColor (bgColor) {
    this.stage.backgroundColor = bgColor
  }

  updateBgImage () {
    this.bgImage.loadTexture('bgImage')
  }

  removeBgImage () {
    this.bgImage.loadTexture(null)
  }
}
