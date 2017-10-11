import PureMVC from 'pure-mvc'
import StartupCommand from './controller/StartupCommand'

export default class ParticleEditorFacade extends PureMVC.Facade {
  static KEY = 'ParticleEditor'
  static NAME = 'ParticleEditorFacade'
  static STARTUP = ParticleEditorFacade.NAME + 'StartUp'

  static getInstance (key) {
    if (!PureMVC.Facade.instanceMap.has(key)) {
      PureMVC.Facade.instanceMap.set(key, new ParticleEditorFacade(key))
    }
    return PureMVC.Facade.instanceMap.get(key)
  }

  initializeController () {
    super.initializeController()
    this.registerCommand(ParticleEditorFacade.STARTUP, StartupCommand)
  }

  startup () {
    this.sendNotification(ParticleEditorFacade.STARTUP)
  }

  sendNotification (notificationName, body, type) {
    console.log('Sent ' + notificationName)
    super.sendNotification(notificationName, body, type)
  }
}
