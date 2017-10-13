import { Proxy } from 'pure-mvc'
import ParticleVO from './vo/ParticleVO'
import EmitterVO from './vo/EmitterVO'

export default class ParticleProxy extends Proxy {
  static NAME = 'ParticleProxy'
  static PROPERTY_CHANGE = ParticleProxy.NAME + 'PropertyChange'
  static OPTION_CHANGE = ParticleProxy.NAME + 'OptionChange'
  static EMITTER_ADD = ParticleProxy.NAME + 'EmitterAdd'
  static CURRENT_EMITTER_CHANGE = ParticleProxy.NAME + 'CurrentEmitterChange'
  static EMITTER_RENAME = ParticleProxy.NAME + 'EmitterRename'
  static EMITTER_REMOVE = ParticleProxy.NAME + 'EmitterRemove'
  static EMITTER_IMAGE_CHANGE = ParticleProxy.NAME + 'EmitterImageChange'
  static INTERNAL_DATA_CHANGE = ParticleProxy.NAME + 'InternalDataChange'

  constructor (config) {
    super(ParticleProxy.NAME, new ParticleVO(config))
    this.changeCurrentEmitter(Object.keys(this.vo.emitters)[0])
  }

  get vo () {
    return this.getData()
  }

  changeCurrentEmitter (emitterName) {
    this.currentEmitter = this.vo.emitters[emitterName]
    this.currentEmitterName = emitterName
    this.sendChangedCurrentEmitter(emitterName)
  }

  addEmitter (name, properties) {
    if (this.isEmitterNameExist(name)) {
      return
    }
    if (!properties) {
      this.vo.emitters[name] = new EmitterVO(name)
    } else {
      this.vo.emitters[name] = properties
    }
    this.sendAddEmitterNotification(name)
    this.changeCurrentEmitter(name)
  }

  duplicateEmitter (name) {
    let duplicateName = name + 'Copy'
    while (this.isEmitterNameExist(duplicateName)) {
      duplicateName += 'Copy'
    }
    if (!this._internalDuplicateEmitter(name, duplicateName)) {
      return
    }
    this.sendAddEmitterNotification(duplicateName)
    this.changeCurrentEmitter(duplicateName)
  }

  _internalDuplicateEmitter (name, newName, force = false) {
    while (this.isEmitterNameExist(newName)) {
      if (force) {
        newName += 'Copy'
      } else {
        return false
      }
    }
    const duplicateEmitter = Object.assign({}, this.vo.emitters[name])
    duplicateEmitter[newName] = duplicateEmitter[name]
    delete duplicateEmitter[name]
    this.vo.emitters[newName] = duplicateEmitter
    return true
  }

  renameEmitter (nameOld, nameNew) {
    if (!this._internalDuplicateEmitter(nameOld, nameNew)) {
      return
    }
    delete this.vo.emitters[nameOld]
    this.sendRenameNotification(nameOld, nameNew)
    this.changeCurrentEmitter(nameNew)
  }

  getCurrentEmitter () {
    return this.currentEmitter
  }

  getCurrentEmitterName () {
    return this.currentEmitterName
  }

  turnEmitterOnOff (emitterName) {
    this.vo.emitters[emitterName].enabled = !this.vo.emitters[emitterName].enabled
    this.sendOptionChangeNotification()
  }

  changeParticleImage (imageData) {
    this.currentEmitter[this.currentEmitterName] = imageData
    this.sendParticleImageChangeNotification()
  }

  changeDimension (dimension) {
    this.currentEmitter.width = dimension.width
    this.currentEmitter.height = dimension.height
    this.sendPropertyChangeNotification()
  }

  changeEmitPosition (position) {
    this.currentEmitter.emitX = Number.parseFloat(position.x)
    this.currentEmitter.emitY = Number.parseFloat(position.y)
    this.sendPropertyChangeNotification()
  }

  changeGravity (gravity) {
    this.currentEmitter.gravityX = Number.parseFloat(gravity.x)
    this.currentEmitter.gravityY = Number.parseFloat(gravity.y)
    this.sendPropertyChangeNotification()
  }

  changeBounce (bounce) {
    this.currentEmitter.bounceX = Number.parseFloat(bounce.x)
    this.currentEmitter.bounceY = Number.parseFloat(bounce.y)
    this.sendPropertyChangeNotification()
  }

  changeAngularDrag (angularDrag) {
    this.currentEmitter.angularDrag = Number.parseFloat(angularDrag)
    this.sendPropertyChangeNotification()
  }

  changeScaleType () {
    this.currentEmitter.proportional = !this.currentEmitter.proportional
    this.sendOptionChangeNotification()
  }

  // --Start Options--
  changeLifespan (lifespan) {
    this.currentEmitter.lifespan = Number.parseFloat(lifespan)
    this.sendOptionChangeNotification()
  }

  changeFrequency (frequency) {
    this.currentEmitter.frequency = Number.parseFloat(frequency)
    this.sendOptionChangeNotification()
  }

  changeExplode (status) {
    this.currentEmitter.explode = status
    this.sendOptionChangeNotification()
  }

  changeQuantity (quantity) {
    this.currentEmitter.quantity = Number.parseFloat(quantity)
    this.sendOptionChangeNotification()
  }

  changeTotal (total) {
    this.currentEmitter.total = Number.parseFloat(total)
    this.sendOptionChangeNotification()
  }

  changeMaxParticles (maxParticles) {
    this.currentEmitter.maxParticles = maxParticles
    this.sendOptionChangeNotification()
  }

  changeFlow (flow) {
    this.currentEmitter.flow = flow
    if (flow) {
      this.currentEmitter.total = this.currentEmitter.total === 0 ? -1 : this.currentEmitter.total
    } else {
      this.currentEmitter.total = this.currentEmitter.total === -1 ? 0 : this.currentEmitter.total
    }
    this.sendInternalDataChangeNotification()
    this.sendOptionChangeNotification()
  }

  changeCollide (status) {
    this.currentEmitter.collide = status
    this.sendOptionChangeNotification()
  }

  changeCollideWorldBounds (status) {
    this.currentEmitter.collideWorldBounds = status
    this.sendOptionChangeNotification()
  }

  changeImmediate (status) {
    this.currentEmitter.immediate = status
    this.sendOptionChangeNotification()
  }

  // --End Options--
  changeScaleProportional (scale) {
    this.currentEmitter.minScale = Number.parseFloat(scale.min)
    this.currentEmitter.maxScale = Number.parseFloat(scale.max)
    this.sendPropertyChangeNotification()
  }

  changeScaleDisproportional (scale) {
    this.currentEmitter.scaleFromX = Number.parseFloat(scale.fromX)
    this.currentEmitter.scaleFromY = Number.parseFloat(scale.fromY)
    this.currentEmitter.scaleToX = Number.parseFloat(scale.toX)
    this.currentEmitter.scaleToY = Number.parseFloat(scale.toY)
    this.currentEmitter.scaleRate = Number.parseFloat(scale.rate)
    this.currentEmitter.scaleYoyo = Boolean(scale.yoyo)
    this.setEasing(this.currentEmitter, scale, 'scale')
    this.sendPropertyChangeNotification()
  }

  changeRotation (rotation) {
    this.currentEmitter.rotationMin = Number.parseFloat(rotation.min)
    this.currentEmitter.rotationMax = Number.parseFloat(rotation.max)
    this.sendPropertyChangeNotification()
  }

  changeSpeed (speed) {
    this.currentEmitter.minSpeedX = Number.parseFloat(speed.minX)
    this.currentEmitter.minSpeedY = Number.parseFloat(speed.minY)
    this.currentEmitter.maxSpeedX = speed.maxX
    this.currentEmitter.maxSpeedY = speed.maxY
    this.sendPropertyChangeNotification()
  }

  changeAlpha (alpha) {
    this.currentEmitter.alphaMin = Number.parseFloat(alpha.min)
    this.currentEmitter.alphaMax = Number.parseFloat(alpha.max)
    this.currentEmitter.alphaRate = Number.parseFloat(alpha.rate)
    this.setEasing(this.currentEmitter, alpha, 'alpha')
    this.currentEmitter.alphaYoyo = Boolean(alpha.yoyo)
    this.sendPropertyChangeNotification()
  }

  setEasing (obj, property, key) {
    if (property.ease !== 'Easing' && property.easeMode !== 'Mode') {
      if (property.ease === 'Linear') {
        property.easeMode = 'None'
      }
    } else {
      property.ease = 'Linear'
      property.easeMode = 'None'
    }
    const ease = key === '' ? 'ease' : 'Ease'
    obj[`${key}${ease}Mode`] = property.easeMode
    obj[`${key}${ease}`] = property.ease
  }

  changeColorStatus () {
    this.currentEmitter.particleArguments.colorEnabled = !this.currentEmitter.particleArguments.colorEnabled
    this.sendOptionChangeNotification()
  }

  changeColor (color) {
    if (!this.currentEmitter.particleArguments.hasOwnProperty('color')) {
      this.currentEmitter.particleArguments.color = {}
    }
    this.currentEmitter.particleArguments.color.start = Phaser.Color.hexToColor(color.start)
    this.currentEmitter.particleArguments.color.end = Phaser.Color.hexToColor(color.end)
    this.setEasing(this.currentEmitter.particleArguments.color, color, '')
    this.currentEmitter.particleArguments.color.delay = Number.parseFloat(color.delay)
    this.currentEmitter.particleArguments.color.rate = Number.parseFloat(color.rate)
    this.sendOptionChangeNotification()
  }

  sendOptionChangeNotification () {
    this.sendNotification(ParticleProxy.OPTION_CHANGE, this.currentEmitterName)
  }

  sendPropertyChangeNotification () {
    this.sendNotification(ParticleProxy.PROPERTY_CHANGE, this.currentEmitterName)
  }
  sendInternalDataChangeNotification () {
    this.sendNotification(ParticleProxy.INTERNAL_DATA_CHANGE, this.currentEmitterName)
  }

  sendAddEmitterNotification (emitterName) {
    this.sendNotification(ParticleProxy.EMITTER_ADD, emitterName)
  }

  sendChangedCurrentEmitter (emitterName) {
    this.sendNotification(ParticleProxy.CURRENT_EMITTER_CHANGE, emitterName)
  }

  sendRenameNotification (oldName, newName) {
    this.sendNotification(ParticleProxy.EMITTER_RENAME, {oldName, newName})
  }

  removeEmitter (emitterName) {
    delete this.vo.emitters[emitterName]
    this.sendNotification(ParticleProxy.EMITTER_REMOVE, emitterName)
    if (this.currentEmitterName !== emitterName) {
      return
    }
    const newEmitterName = Object.keys(this.vo.emitters)[0]
    if (newEmitterName) {
      this.changeCurrentEmitter(newEmitterName)
    }
  }

  sendParticleImageChangeNotification () {
    this.sendNotification(ParticleProxy.EMITTER_IMAGE_CHANGE, this.currentEmitterName)
  }

  isEmitterNameExist (emitterName) {
    return this.vo.emitters.hasOwnProperty(emitterName)
  }
}
