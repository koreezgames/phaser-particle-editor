import Phaser from 'phaser'
import SandboxState from './state/SandboxState.js'
import ParticleEditorFacade from '../../ParticleEditorFacade'

export default class Sandbox extends Phaser.Game {
  static NAME = 'Sandbox'
  static SANDBOX_READY = Sandbox.NAME + 'Ready'

  constructor (config) {
    super(config.width, config.height, Phaser.CANVAS, 'sandboxContainer')
    this.state.add(SandboxState.NAME, SandboxState, true)
    this.facade = ParticleEditorFacade.getInstance(ParticleEditorFacade.KEY)
    this.facade.sendNotification(Sandbox.SANDBOX_READY, config)
  }
}
