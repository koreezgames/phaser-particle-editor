import ParticleEditorFacade from './ParticleEditorFacade'
import { Facade } from 'pure-mvc'

export default class ParticleEditor {
  constructor () {
    Facade.getInstance = ParticleEditorFacade.getInstance
    this.facade = Facade.getInstance(ParticleEditorFacade.KEY)
  }

  init () {
    this.facade.startup()
  }
}

window.particleEditor = new ParticleEditor()
window.particleEditor.init()
