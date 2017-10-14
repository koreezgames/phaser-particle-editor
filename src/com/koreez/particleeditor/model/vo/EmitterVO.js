export default class EmitterVO {
  constructor (name) {
    this.width = 0
    this.height = 0
    this.gravityX = 0
    this.gravityY = 0
    this.emitX = 0
    this.emitY = 0
    this.maxParticles = 50
    this.frames = 1
    this.quantity = 1
    this.total = 0
    this.immediate = true
    this.collide = false
    this.collideWorldBounds = false
    this.enableBody = false
    this.proportional = true
    this.minScale = 0.5
    this.maxScale = 1.5
    this.scaleFromX = 1
    this.scaleFromY = 1
    this.scaleToX = 1
    this.scaleToY = 1
    this.scaleRate = 0
    this.scaleEase = 'Linear'
    this.scaleEaseMode = 'None'
    this.scaleYoyo = false
    this.alphaMin = 0
    this.alphaMax = 1
    this.alphaRate = 0
    this.alphaEase = 'Linear'
    this.alphaEaseMode = 'None'
    this.alphaYoyo = false
    this.particleArguments = {
    }
    this.rotationMin = -360
    this.rotationMax = 360
    this.bounceX = 0
    this.bounceY = 0
    this.angularDrag = 0
    this.minSpeedX = -200
    this.minSpeedY = -200
    this.maxSpeedX = 200
    this.maxSpeedY = 200
    this.lifespan = 2000
    this.frequency = 25
    this.enabled = true
    this.explode = false
    this.flow = false
    this.blendMode = 'NORMAL'
    this[name] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAHklEQVQ4jWP8////ZgYKAROlBow' +
      'aMmrIqCGjhkABADAjA9Lg9zWpAAAAAElFTkSuQmCC'
  }
}
