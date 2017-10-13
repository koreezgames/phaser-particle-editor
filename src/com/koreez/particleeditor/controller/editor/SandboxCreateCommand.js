import Sandbox from '../../view/sandbox/Sandbox'
import {loadFile} from '../../utils/utils'
import ParticleProxy from '../../model/ParticleProxy'
import EditorPropertyChangeCommand from './EditorPropertyChangeCommand'

export default class SandboxCreateCommand extends EditorPropertyChangeCommand {
  execute (notification) {
    const body = notification.getBody()
    const file = body.file
    const name = body.name
    const height = body.height
    const width = body.width
    const color = body.color || '#000000'
    if (!(name && width && height) && !file) {
      super.execute(notification)
      return
    }
    if (file) {
      loadFile(file, e => {
        let parsedFile = JSON.parse(e.target.result)
        let config = parsedFile.canvas
        const particleProxyConfig = parsedFile.particle
        this.createSandbox(config, particleProxyConfig)
      })
    } else {
      const config = {
        name: name,
        height: height,
        width: width,
        bgColor: color
      }
      this.createSandbox(config)
    }
    super.execute(notification)
  }

  createSandbox (config, particleProxyConfig) {
    this.facade.registerProxy(new ParticleProxy(particleProxyConfig))
    this.proxy.setProjectInfo(config)
    window.sandbox = new Sandbox(config)
  }
}
