import Phaser from 'phaser'
import { setColorpickerValueWithoutTriggeringChangeEvent } from '../../utils/utils'

export default class ParticleEmitterView {
  static NAME = 'ParticleEmitterView'

  static PARTICLE_IMAGE_CHANGE = ParticleEmitterView.NAME + 'ParticleImageChange'
  static DIMENSION_CHANGE = ParticleEmitterView.NAME + 'DimensionChange'
  static POSITION_OFFSET_CHANGE = ParticleEmitterView.NAME + 'PositionOffsetChange'
  static GRAVITY_CHANGE = ParticleEmitterView.NAME + 'GravityChange'
  static BOUNCE_CHANGE = ParticleEmitterView.NAME + 'BounceChange'
  static START_ROTATION_CHANGE = ParticleEmitterView.NAME + 'StartRotationChange'
  static START_ROTATION_STATUS_CHANGE = ParticleEmitterView.NAME + 'StartRotationStatusChange'
  static ANCHOR_CHANGE = ParticleEmitterView.NAME + 'AnchorChange'
  static ANCHOR_STATUS_CHANGE = ParticleEmitterView.NAME + 'AnchorStatusChange'
  static ANGULAR_DRAG_CHANGE = ParticleEmitterView.NAME + 'AngularDragChange'
  static LIFESPAN_CHANGE = ParticleEmitterView.NAME + 'LifespanChange'
  static FREQUENCY_CHANGE = ParticleEmitterView.NAME + 'FrequencyChange'
  static QUANTITY_CHANGE = ParticleEmitterView.NAME + 'QuantityChange'
  static TOTAL_CHANGE = ParticleEmitterView.NAME + 'TotalChange'
  static MAX_PARTICLES_CHANGE = ParticleEmitterView.NAME + 'MaxParticlesChange'
  static COLLIDE_WORLD_BOUNDS_CHANGE = ParticleEmitterView.NAME + 'CollideWorldBoundsChange'
  static COLLIDE_CHANGE = ParticleEmitterView.NAME + 'CollideChange'
  static IMMEDIATE_CHANGE = ParticleEmitterView.NAME + 'ImmediateChange'
  static FLOW_CHANGE = ParticleEmitterView.NAME + 'FlowChange'
  static EXPLODE_CHANGE = ParticleEmitterView.NAME + 'ExplodeChange'
  static SCALE_CHANGE_RANDOM = ParticleEmitterView.NAME + 'ScaleChangeProportional'
  static SCALE_CHANGE = ParticleEmitterView.NAME + 'ScaleChangeDisproportional'
  static SCALE_TYPE_CHANGE = ParticleEmitterView.NAME + 'ScaleTypeChange'
  static ROTATION_CHANGE = ParticleEmitterView.NAME + 'RotationChange'
  static SPEED_CHANGE = ParticleEmitterView.NAME + 'SpeedChange'
  static ALPHA_CHANGE = ParticleEmitterView.NAME + 'AlphaChange'
  static COLOR_STATUS_CHANGE = ParticleEmitterView.NAME + 'ColorStatusChange'
  static COLOR_CHANGE = ParticleEmitterView.NAME + 'ColorChange'
  static BLEND_MODE_CHANGE = ParticleEmitterView.NAME + 'BlendModeChange'
  static BLEND_MODES = [
    'NORMAL',
    'ADD',
    'MULTIPLY',
    'SCREEN',
    'OVERLAY',
    'DARKEN',
    'LIGHTEN',
    'COLOR_DODGE',
    'COLOR_BURN',
    'HARD_LIGHT',
    'SOFT_LIGHT',
    'DIFFERENCE',
    'EXCLUSION',
    'HUE',
    'SATURATION',
    'COLOR',
    'LUMINOSITY'
  ]

  constructor () {
    this.onParticleImageChange = new Phaser.Signal()
    this.onWidthChange = new Phaser.Signal()
    this.onHeightChange = new Phaser.Signal()
    this.onXOffsetChange = new Phaser.Signal()
    this.onYOffsetChange = new Phaser.Signal()
    this.onGravityXChange = new Phaser.Signal()
    this.onGravityYChange = new Phaser.Signal()
    this.onBounceXChange = new Phaser.Signal()
    this.onBounceYChange = new Phaser.Signal()
    this.onStartRotationStatusChange = new Phaser.Signal()
    this.onStartRotationMinChange = new Phaser.Signal()
    this.onStartRotationMaxChange = new Phaser.Signal()
    this.onAnchorStatusChange = new Phaser.Signal()
    this.onAnchorXChange = new Phaser.Signal()
    this.onAnchorYChange = new Phaser.Signal()
    this.onAngularDragChange = new Phaser.Signal()
    this.onLifespanChange = new Phaser.Signal()
    this.onFrequencyChange = new Phaser.Signal()
    this.onQuantityChange = new Phaser.Signal()
    this.onTotalChange = new Phaser.Signal()
    this.onMaxParticlesChange = new Phaser.Signal()
    this.onCollideChange = new Phaser.Signal()
    this.onImmediateChange = new Phaser.Signal()
    this.onCollideWorldBoundsChange = new Phaser.Signal()
    this.onExplodeChange = new Phaser.Signal()
    this.onFlowChange = new Phaser.Signal()
    this.onMinScaleChange = new Phaser.Signal()
    this.onMaxScaleChange = new Phaser.Signal()
    this.onScaleTypeChange = new Phaser.Signal()
    this.onScaleXChange = new Phaser.Signal()
    this.onScaleYChange = new Phaser.Signal()
    this.onScaleToXChange = new Phaser.Signal()
    this.onScaleToYChange = new Phaser.Signal()
    this.onScaleRateChange = new Phaser.Signal()
    this.onScaleYoyoChange = new Phaser.Signal()
    this.onScaleEaseChange = new Phaser.Signal()
    this.onScaleEaseModeChange = new Phaser.Signal()
    this.onRotationMinChange = new Phaser.Signal()
    this.onRotationMaxChange = new Phaser.Signal()
    this.onMinSpeedXChange = new Phaser.Signal()
    this.onMinSpeedYChange = new Phaser.Signal()
    this.onMaxSpeedXChange = new Phaser.Signal()
    this.onMaxSpeedyChange = new Phaser.Signal()
    this.onAlphaMinChange = new Phaser.Signal()
    this.onAlphaMaxChange = new Phaser.Signal()
    this.onAlphaEaseChange = new Phaser.Signal()
    this.onAlphaEaseModeChange = new Phaser.Signal()
    this.onAlphaRateChange = new Phaser.Signal()
    this.onAlphaYoyoChange = new Phaser.Signal()
    this.onStartColorChange = new Phaser.Signal()
    this.onEndColorChange = new Phaser.Signal()
    this.onColorStatusChange = new Phaser.Signal()
    this.onColorEaseChange = new Phaser.Signal()
    this.onColorEaseModeChange = new Phaser.Signal()
    this.onColorDelayChange = new Phaser.Signal()
    this.onColorRateChange = new Phaser.Signal()
    this.onBlendModeChange = new Phaser.Signal()
    this.initProperties()
  }

  get particleImage () {
    return this._particleImage.prop('files')[0]
  }

  get dimension () {
    return {
      width: this._dimension.width.val(),
      height: this._dimension.height.val()
    }
  }

  get positionOffset () {
    return {
      x: this._positionOffset.x.val(),
      y: this._positionOffset.y.val()
    }
  }

  get gravity () {
    return {
      x: this._gravity.x.val(),
      y: this._gravity.y.val()
    }
  }

  get bounce () {
    return {
      x: this._bounce.x.val(),
      y: this._bounce.y.val()
    }
  }

  get startRotationStatus () {
    return this._startRotation.status.prop('checked')
  }

  get startRotation () {
    return {
      min: this._startRotation.min.val(),
      max: this._startRotation.max.val()
    }
  }

  get anchorStatus () {
    return this._anchor.status.prop('checked')
  }

  get anchor () {
    return {
      x: this._anchor.x.val(),
      y: this._anchor.y.val()
    }
  }

  get angularDrag () {
    return this._angularDrag.val()
  }

  get lifespan () {
    return this._lifespan.val()
  }

  get frequency () {
    return this._frequency.val()
  }

  get quantity () {
    return this._quantity.val()
  }

  get total () {
    return this._total.val()
  }

  get maxParticles () {
    return this._maxParticles.val()
  }

  get collideWorldBounds () {
    return this._collideWorldBounds.prop('checked')
  }

  get collide () {
    return this._collide.prop('checked')
  }

  get immediate () {
    return this._immediate.prop('checked')
  }

  get explode () {
    return this._explode.prop('checked')
  }

  get flow () {
    return this._flow.prop('checked')
  }

  get scaleProportional () {
    return {
      min: this._scale.minScale.val(),
      max: this._scale.maxScale.val()
    }
  }

  get scaleDisproportional () {
    return {
      fromX: this._scale.fromX.val(),
      fromY: this._scale.fromY.val(),
      toX: this._scale.toX.val(),
      toY: this._scale.toY.val(),
      rate: this._scale.rate.val(),
      yoyo: this._scale.yoyo.prop('checked'),
      ease: this._scale.ease.text(),
      easeMode: this._scale.easeMode.text()
    }
  }

  get rotation () {
    return {
      min: this._rotation.min.val(),
      max: this._rotation.max.val()
    }
  }

  get speed () {
    return {
      minX: this._speed.minX.val(),
      minY: this._speed.minY.val(),
      maxX: this._speed.maxX.val(),
      maxY: this._speed.maxY.val()
    }
  }

  get alpha () {
    return {
      min: this._alpha.min.val(),
      max: this._alpha.max.val(),
      rate: this._alpha.rate.val(),
      yoyo: this._alpha.yoyo.val(),
      ease: this._alpha.ease.text(),
      easeMode: this._alpha.easeMode.text()
    }
  }

  get colorStatus () {
    return this._color.status.prop('checked')
  }

  get color () {
    return {
      start: this._color.start.colorpicker('getValue'),
      end: this._color.end.colorpicker('getValue'),
      ease: this._color.ease.text(),
      easeMode: this._color.easeMode.text(),
      delay: this._color.delay.val(),
      rate: this._color.rate.val()
    }
  }

  get blendMode () {
    return ParticleEmitterView.BLEND_MODES.indexOf(this._blendMode.text())
  }

  initProperties () {
    this._particleImage = $('#particleImageBrowser')
      .on('change', this.onEmitterPropertyValueChange.bind(this, this.onParticleImageChange))
    this._dimension = {}
    this._dimension.width = $('#width')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onWidthChange))
    this._dimension.height = $('#height')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onHeightChange))

    this._positionOffset = {}
    this._positionOffset.x = $('#offsetX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onXOffsetChange))
    this._positionOffset.y = $('#offsetY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onYOffsetChange))

    this._gravity = {}
    this._gravity.x = $('#gravityX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onGravityXChange))
    this._gravity.y = $('#gravityY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onGravityYChange))

    this._bounce = {}
    this._bounce.x = $('#bounceX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onBounceXChange))
    this._bounce.y = $('#bounceY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onBounceYChange))

    this._startRotation = {}
    this._startRotation.status = $('#startRotationStatus')
      .on('click', this.onEmitterPropertyValueChange.bind(this, this.onStartRotationStatusChange))
    this._startRotation.min = $('#startRotationMin')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onStartRotationMinChange))
    this._startRotation.max = $('#startRotationMax')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onStartRotationMaxChange))

    this._anchor = {}
    this._anchor.status = $('#anchorStatus')
      .on('click', this.onEmitterPropertyValueChange.bind(this, this.onAnchorStatusChange))
    this._anchor.x = $('#anchorX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onAnchorXChange))
    this._anchor.y = $('#anchorY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onAnchorYChange))

    this._angularDrag = $('#angularDrag')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onAngularDragChange))

    this._flow = $('#flow')
      .on('change', this.onEmitterPropertyValueChange.bind(this, this.onFlowChange))
    this._explode = $('#explode')
      .on('change', this.onEmitterPropertyValueChange.bind(this, this.onExplodeChange))
    this._lifespan = $('#lifespan')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onLifespanChange))
    this._frequency = $('#frequency')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onFrequencyChange))
    this._quantity = $('#quantity')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onQuantityChange))
    this._total = $('#total')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onTotalChange))
    this._maxParticles = $('#maxParticles')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onMaxParticlesChange))
    this._immediate = $('#immediate')
      .on('change', this.onEmitterPropertyValueChange.bind(this, this.onImmediateChange))
    this._collide = $('#collide')
      .on('change', this.onEmitterPropertyValueChange.bind(this, this.onCollideChange))
    this._collideWorldBounds = $('#collideWorldBounds')
      .on('change', this.onEmitterPropertyValueChange.bind(this, this.onCollideWorldBoundsChange))

    this._scale = {}
    this._scale.minScale = $('#minScale')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onMinScaleChange))
    this._scale.maxScale = $('#maxScale')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onMaxScaleChange))
    this._scale.randomScale = $('#randomScale')
      .on('click', this.onEmitterPropertyValueChange.bind(this, this.onScaleTypeChange))
    this._scale.fromX = $('#scaleFromX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onScaleXChange))
    this._scale.fromY = $('#scaleFromY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onScaleYChange))
    this._scale.toX = $('#scaleToX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onScaleToXChange))
    this._scale.toY = $('#scaleToY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onScaleToYChange))
    this._scale.rate = $('#scaleRate')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onScaleRateChange))
    this._scale.yoyo = $('#scaleYoyo')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onScaleYoyoChange))
    this._scale.ease = $('#scaleEasing')
    $('#scaleEasingDropdown')
      .on('hidden.bs.dropdown', this.onEmitterPropertyValueChange.bind(this, this.onScaleEaseChange))
    this._scale.easeMode = $('#scaleEasingMode')
    $('#scaleEasingModeDropdown')
      .on('hidden.bs.dropdown', this.onEmitterPropertyValueChange.bind(this, this.onScaleEaseModeChange))

    this._rotation = {}
    this._rotation.min = $('#rotationMin')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onRotationMinChange))
    this._rotation.max = $('#rotationMax')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onRotationMaxChange))

    this._speed = {}
    this._speed.minX = $('#minSpeedX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onMinSpeedXChange))
    this._speed.minY = $('#minSpeedY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onMinSpeedYChange))
    this._speed.maxX = $('#maxSpeedX')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onMaxSpeedXChange))
    this._speed.maxY = $('#maxSpeedY')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onMaxSpeedyChange))

    this._alpha = {}
    this._alpha.min = $('#alphaMin')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onAlphaMinChange))
    this._alpha.max = $('#alphaMax')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onAlphaMaxChange))
    this._alpha.ease = $('#alphaEasing')
    $('#alphaEasingDropdown')
      .on('hidden.bs.dropdown', this.onEmitterPropertyValueChange.bind(this, this.onAlphaEaseChange))
    this._alpha.easeMode = $('#alphaEasingMode')
    $('#alphaEasingModeDropdown')
      .on('hidden.bs.dropdown', this.onEmitterPropertyValueChange.bind(this, this.onAlphaEaseModeChange))
    this._alpha.rate = $('#alphaRate')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onAlphaRateChange))
    this._alpha.yoyo = $('#alphaYoyo')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onAlphaYoyoChange))

    this._color = {}
    this._color.status = $('#colorStatus')
      .on('click', this.onEmitterPropertyValueChange.bind(this, this.onColorStatusChange))
    this._color.start = $('#startColor')
      .colorpicker().on('changeColor', this.onEmitterPropertyValueChange.bind(this, this.onStartColorChange))
    this._color.end = $('#endColor')
      .colorpicker().on('changeColor', this.onEmitterPropertyValueChange.bind(this, this.onEndColorChange))
    this._color.ease = $('#colorEasing')
    $('#colorEasingDropdown')
      .on('hidden.bs.dropdown', this.onEmitterPropertyValueChange.bind(this, this.onColorEaseChange))
    this._color.easeMode = $('#colorEasingMode')
    $('#colorEasingModeDropdown')
      .on('hidden.bs.dropdown', this.onEmitterPropertyValueChange.bind(this, this.onColorEaseModeChange))
    this._color.delay = $('#colorDelay')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onColorDelayChange))
    this._color.rate = $('#colorRate')
      .on('input change', this.onEmitterPropertyValueChange.bind(this, this.onColorRateChange))

    this._blendMode = $('#blendMode')
    $('#blendModeDropdown')
      .on('hidden.bs.dropdown', this.onEmitterPropertyValueChange.bind(this, this.onBlendModeChange))
  }

  onEmitterPropertyValueChange (eventToDispatch, event) {
    eventToDispatch.dispatch()
  }

  setValues (currentEmitterName, currentEmitter) {
    this._dimension.width.val(currentEmitter.width)
    this._dimension.height.val(currentEmitter.height)
    this._positionOffset.x.val(currentEmitter.emitX)
    this._positionOffset.y.val(currentEmitter.emitY)
    this._gravity.x.val(currentEmitter.gravityX)
    this._gravity.y.val(currentEmitter.gravityY)
    this._bounce.x.val(currentEmitter.bounceX)
    this._bounce.y.val(currentEmitter.bounceY)
    this._angularDrag.val(currentEmitter.angularDrag)
    this._lifespan.val(currentEmitter.lifespan)
    this._frequency.val(currentEmitter.frequency)
    this._quantity.val(currentEmitter.quantity)
    this._total.val(currentEmitter.total)
    this._maxParticles.val(currentEmitter.maxParticles)
    this._flow.prop('checked', currentEmitter.flow)
    this._explode.prop('checked', currentEmitter.explode)
    this._collide.prop('checked', currentEmitter.collide)
    this._collideWorldBounds.prop('checked', currentEmitter.collideWorldBounds)
    this._scale.randomScale.prop('checked', currentEmitter.randomScale)
    this._scale.minScale.val(currentEmitter.minScale)
    this._scale.maxScale.val(currentEmitter.maxScale)
    this._scale.fromX.val(currentEmitter.scaleFromX)
    this._scale.fromY.val(currentEmitter.scaleFromY)
    this._scale.toX.val(currentEmitter.scaleToX)
    this._scale.toY.val(currentEmitter.scaleToY)
    this._scale.rate.val(currentEmitter.scaleRate)
    this._scale.yoyo.val(currentEmitter.yoyo)
    this._scale.ease.text(currentEmitter.scaleEase)
    this._scale.easeMode.text(currentEmitter.scaleEaseMode)
    this._rotation.min.val(currentEmitter.rotationMin)
    this._rotation.max.val(currentEmitter.rotationMax)
    this._speed.minX.val(currentEmitter.minSpeedX)
    this._speed.minY.val(currentEmitter.minSpeedY)
    this._speed.maxX.val(currentEmitter.maxSpeedX)
    this._speed.maxY.val(currentEmitter.maxSpeedY)
    this._alpha.min.val(currentEmitter.alphaMin)
    this._alpha.max.val(currentEmitter.alphaMax)
    this._alpha.ease.text(currentEmitter.alphaEase)
    this._alpha.easeMode.text(currentEmitter.alphaEaseMode)
    this._alpha.rate.val(currentEmitter.alphaRate)
    this._alpha.yoyo.val(currentEmitter.alphaYoyo)
    this._color.status.prop('checked', currentEmitter.particleArguments.color !== undefined)
    this._quantity.prop('disabled', true)
    const startRotation = currentEmitter.particleArguments.startRotation
    if (startRotation) {
      this._startRotation.max.val(startRotation.max)
      this._startRotation.min.val(startRotation.min)
    }
    const anchor = currentEmitter.particleArguments.anchor
    if (anchor) {
      this._anchor.x.val(anchor.x)
      this._anchor.y.val(anchor.y)
    }
    const color = currentEmitter.particleArguments.color
    if (color) {
      const startColor = Phaser.Color.RGBtoString(color.start.r, color.start.g, color.start.b)
      const endColor = Phaser.Color.RGBtoString(color.end.r, color.end.g, color.end.b)
      setColorpickerValueWithoutTriggeringChangeEvent(this._color.start, startColor)
      setColorpickerValueWithoutTriggeringChangeEvent(this._color.end, endColor)
      this._color.ease.text(color.ease)
      this._color.easeMode.text(color.easeMode)
      this._color.delay.val(color.delay)
      this._color.rate.val(color.rate)
    } else {
      setColorpickerValueWithoutTriggeringChangeEvent(this._color.start, '#00ff0b')
      setColorpickerValueWithoutTriggeringChangeEvent(this._color.end, '#ec00ff')
    }
    this._blendMode.text(ParticleEmitterView.BLEND_MODES[currentEmitter.blendMode])
    $('#particleImagePreview').css('background-image', `url(${currentEmitter[currentEmitterName]})`)
    this.toggleStartRotationSection()
    this.toggleAnchorSection()
    this.toggleScaleMode()
    this.toggleColorSection()
    this.toggleFlow()
    this.toggleExplode()
  }

  toggleStartRotationSection () {
    const status = this._startRotation.status.prop('checked')
    this._startRotation.min.prop('disabled', !status)
    this._startRotation.max.prop('disabled', !status)
  }

  toggleAnchorSection () {
    const status = this._anchor.status.prop('checked')
    this._anchor.x.prop('disabled', !status)
    this._anchor.y.prop('disabled', !status)
  }

  toggleScaleMode () {
    const status = this._scale.randomScale.prop('checked')
    this._scale.fromX.prop('disabled', status)
    this._scale.fromY.prop('disabled', status)
    this._scale.toX.prop('disabled', status)
    this._scale.toY.prop('disabled', status)
    this._scale.ease.prop('disabled', status)
    this._scale.easeMode.prop('disabled', status)
    this._scale.rate.prop('disabled', status)
    this._scale.yoyo.prop('disabled', status)
    this._scale.minScale.prop('disabled', !status)
    this._scale.maxScale.prop('disabled', !status)
  }

  toggleColorSection () {
    const status = this._color.status.prop('checked')
    this._color.start.colorpicker(status ? 'enable' : 'disable')
    this._color.end.colorpicker(status ? 'enable' : 'disable')
    this._color.ease.prop('disabled', !status)
    this._color.easeMode.prop('disabled', !status)
    this._color.delay.prop('disabled', !status)
    this._color.rate.prop('disabled', !status)
  }

  toggleFlow () {
    const flowStatus = this._flow.prop('checked')
    this._immediate.prop('disabled', !flowStatus)
    this._quantity.prop('disabled', !flowStatus)
    if (flowStatus) {
      this._explode.prop('checked', false)
      this._frequency.prop('disabled', false)
    }
  }

  toggleExplode () {
    const explodeStatus = this._explode.prop('checked')
    this._frequency.prop('disabled', explodeStatus)
    if (explodeStatus) {
      this._quantity.prop('disabled', true)
      this._flow.prop('checked', false)
    }
  }
}
