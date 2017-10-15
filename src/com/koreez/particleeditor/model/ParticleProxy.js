import { Proxy } from 'pure-mvc'
import ParticleVO from './vo/ParticleVO'
import EmitterVO from './vo/EmitterVO'
import Phaser from 'phaser'
import NestedProperty from 'nested-property'

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
    this.currentEmitter.randomScale = !this.currentEmitter.randomScale
    this.sendInternalDataChangeNotification()
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
    this.currentEmitter.total = this.currentEmitter.total === 0 || this.currentEmitter.total === -1
      ? this.currentEmitter.maxParticles
      : this.currentEmitter.total
    this.currentEmitter.explode = status
    if (status) {
      this.currentEmitter.flow = false
    }
    this.sendInternalDataChangeNotification()
    this.sendOptionChangeNotification()
  }

  changeQuantity (quantity) {
    this.currentEmitter.quantity = Number.parseFloat(quantity)
    this.sendOptionChangeNotification()
  }

  changeTotal (total) {
    this.currentEmitter.total = Number.parseFloat(total)
    if (!this.currentEmitter.explode && !this.currentEmitter.flow && this.currentEmitter.total < 0) {
      this.currentEmitter.total = 0
      this.sendInternalDataChangeNotification()
    } else if (this.currentEmitter.explode && this.currentEmitter.total < 0) {
      this.currentEmitter.total = Math.abs(this.currentEmitter.total)
      this.sendInternalDataChangeNotification()
    } else if (this.currentEmitter && this.currentEmitter.total < -1) {
      this.currentEmitter.total = -1
      this.sendInternalDataChangeNotification()
    }
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
      this.currentEmitter.explode = false
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
  changeRandomScale (scale) {
    this.currentEmitter.minScale = Number.parseFloat(scale.min)
    this.currentEmitter.maxScale = Number.parseFloat(scale.max)
    this.sendPropertyChangeNotification()
  }

  changeScale (scale) {
    this.currentEmitter.scaleFromX = Number.parseFloat(scale.fromX)
    this.currentEmitter.scaleFromY = Number.parseFloat(scale.fromY)
    this.currentEmitter.scaleToX = Number.parseFloat(scale.toX)
    this.currentEmitter.scaleToY = Number.parseFloat(scale.toY)
    this.currentEmitter.scaleYoyo = Boolean(scale.yoyo)
    this.adjustEasing(scale, 'scaleEase')
    if (this.adjustRate(scale.rate, 'scaleRate')) {
      this.sendInternalDataChangeNotification()
    }
    this.sendPropertyChangeNotification()
  }

  adjustRate (rateString, propertyName) {
    let rate = Number.parseFloat(rateString)
    if (rate < 0) {
      NestedProperty.set(this.currentEmitter, propertyName, 0)
      return true
    }
    if (rate > 0 && rate < 20) {
      NestedProperty.set(this.currentEmitter, propertyName, 20)
      return true
    }
    NestedProperty.set(this.currentEmitter, propertyName, rate)
    return false
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
    this.adjustEasing(alpha, 'alphaEase')
    this.currentEmitter.alphaYoyo = Boolean(alpha.yoyo)
    if (this.adjustRate(alpha.rate, 'alphaRate')) {
      this.sendInternalDataChangeNotification()
    }
    this.sendPropertyChangeNotification()
  }

  changeBlendMode (blendMode) {
    this.currentEmitter.blendMode = blendMode
    this.sendPropertyChangeNotification()
  }

  adjustEasing (easeArguments, key) {
    const cleanEase = easeArguments.ease.replace(/[\n\r]/g, '').trim()
    const cleanEaseMode = easeArguments.easeMode.replace(/[\n\r]/g, '').trim()
    if (cleanEase !== 'Easing' && cleanEaseMode !== 'Mode') {
      if (easeArguments.ease === 'Linear') {
        easeArguments.easeMode = 'None'
      }
    } else {
      easeArguments.ease = 'Linear'
      easeArguments.easeMode = 'None'
    }
    NestedProperty.set(this.currentEmitter, key, easeArguments.ease)
    NestedProperty.set(this.currentEmitter, `${key}Mode`, easeArguments.easeMode)
  }

  changeColorStatus (status, color) {
    if (status) {
      this.addColor()
      this.updateColor(color)
    } else {
      delete this.currentEmitter.particleArguments.color
    }
    this.sendInternalDataChangeNotification()
    this.sendOptionChangeNotification()
  }

  addColor () {
    if (!this.currentEmitter.particleArguments.hasOwnProperty('color')) {
      this.currentEmitter.particleArguments.color = {}
    }
  }

  updateColor (color, preventInternalDataChange = false) {
    this.currentEmitter.particleArguments.color.start = Phaser.Color.hexToColor(color.start)
    this.currentEmitter.particleArguments.color.end = Phaser.Color.hexToColor(color.end)
    this.adjustEasing(color, 'particleArguments.color.ease')
    this.currentEmitter.particleArguments.color.delay = Number.parseFloat(color.delay)
    if (this.adjustRate(color.rate, 'particleArguments.color.rate') && !preventInternalDataChange) {
      this.sendInternalDataChangeNotification()
    }
  }

  changeColor (color) {
    this.addColor()
    this.updateColor(color)
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
