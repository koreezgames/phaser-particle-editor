import { Mediator } from 'pure-mvc'
import ParticleEmitterView from './ParticleEmitterView'
import ParticleProxy from '../../model/ParticleProxy'
import { loadFile } from '../../utils/utils'
import ParticleEditorView from '../ParticleEditorView'

export default class ParticleEmitterViewMediator extends Mediator {
  static NAME = 'ParticleViewMediator'

  constructor () {
    super(ParticleEmitterViewMediator.NAME)
  }

  onRegister () {
    super.onRegister()
    this.particleEmitterView = new ParticleEmitterView()

    this.particleEmitterView.onParticleImageChange.add(this.onParticleImageChange, this)

    this.particleEmitterView.onWidthChange.add(this.onDimensionChange, this)
    this.particleEmitterView.onHeightChange.add(this.onDimensionChange, this)

    this.particleEmitterView.onXOffsetChange.add(this.onPositionOffsetChange, this)
    this.particleEmitterView.onYOffsetChange.add(this.onPositionOffsetChange, this)

    this.particleEmitterView.onGravityXChange.add(this.onGravityChange, this)
    this.particleEmitterView.onGravityYChange.add(this.onGravityChange, this)

    this.particleEmitterView.onBounceXChange.add(this.onBounceChange, this)
    this.particleEmitterView.onBounceYChange.add(this.onBounceChange, this)

    this.particleEmitterView.onStartRotationStatusChange.add(this.onStartRotationStatusChange, this)
    this.particleEmitterView.onStartRotationMinChange.add(this.onStartRotationChange, this)
    this.particleEmitterView.onStartRotationMaxChange.add(this.onStartRotationChange, this)

    this.particleEmitterView.onAnchorStatusChange.add(this.onAnchorStatusChange, this)
    this.particleEmitterView.onAnchorXChange.add(this.onAnchorChange, this)
    this.particleEmitterView.onAnchorYChange.add(this.onAnchorChange, this)

    this.particleEmitterView.onAngularDragChange.add(this.onAngularDragChange, this)

    this.particleEmitterView.onFlowChange.add(this.onFlowChange, this)
    this.particleEmitterView.onExplodeChange.add(this.onExplodeChange, this)

    this.particleEmitterView.onLifespanMinChange.add(this.onLifespanChange, this)
    this.particleEmitterView.onLifespanMaxChange.add(this.onLifespanChange, this)

    this.particleEmitterView.onFrequencyChange.add(this.onFrequencyChange, this)
    this.particleEmitterView.onQuantityChange.add(this.onQuantityChange, this)
    this.particleEmitterView.onTotalChange.add(this.onTotalChange, this)
    this.particleEmitterView.onMaxParticlesChange.add(this.onMaxParticlesChange, this)
    this.particleEmitterView.onImmediateChange.add(this.onImmediateChange, this)
    this.particleEmitterView.onCollideChange.add(this.onCollideChange, this)
    this.particleEmitterView.onCollideWorldBoundsChange.add(this.onCollideWorldBoundsChange, this)

    this.particleEmitterView.onScaleTypeChange.add(this.onScaleTypeChange, this)
    this.particleEmitterView.onMinScaleChange.add(this.onRandomScaleChange, this)
    this.particleEmitterView.onMaxScaleChange.add(this.onRandomScaleChange, this)
    this.particleEmitterView.onScaleXChange.add(this.onScaleChange, this)
    this.particleEmitterView.onScaleYChange.add(this.onScaleChange, this)
    this.particleEmitterView.onScaleToXChange.add(this.onScaleChange, this)
    this.particleEmitterView.onScaleToYChange.add(this.onScaleChange, this)
    this.particleEmitterView.onScaleRateChange.add(this.onScaleChange, this)
    this.particleEmitterView.onScaleYoyoChange.add(this.onScaleChange, this)
    this.particleEmitterView.onScaleEaseChange.add(this.onScaleChange, this)
    this.particleEmitterView.onScaleEaseModeChange.add(this.onScaleChange, this)

    this.particleEmitterView.onRotationMinChange.add(this.onRotationChange, this)
    this.particleEmitterView.onRotationMaxChange.add(this.onRotationChange, this)

    this.particleEmitterView.onMinSpeedXChange.add(this.onSpeedChange, this)
    this.particleEmitterView.onMinSpeedYChange.add(this.onSpeedChange, this)
    this.particleEmitterView.onMaxSpeedXChange.add(this.onSpeedChange, this)
    this.particleEmitterView.onMaxSpeedyChange.add(this.onSpeedChange, this)

    this.particleEmitterView.onAlphaMinChange.add(this.onAlphaChange, this)
    this.particleEmitterView.onAlphaMaxChange.add(this.onAlphaChange, this)
    this.particleEmitterView.onAlphaEaseChange.add(this.onAlphaChange, this)
    this.particleEmitterView.onAlphaEaseModeChange.add(this.onAlphaChange, this)
    this.particleEmitterView.onAlphaRateChange.add(this.onAlphaChange, this)
    this.particleEmitterView.onAlphaYoyoChange.add(this.onAlphaChange, this)

    this.particleEmitterView.onColorStatusChange.add(this.onColorStatusChange, this)
    this.particleEmitterView.onStartColorChange.add(this.onColorChange, this)
    this.particleEmitterView.onEndColorChange.add(this.onColorChange, this)
    this.particleEmitterView.onColorEaseChange.add(this.onColorChange, this)
    this.particleEmitterView.onColorEaseModeChange.add(this.onColorChange, this)
    this.particleEmitterView.onColorDelayChange.add(this.onColorChange, this)
    this.particleEmitterView.onColorRateChange.add(this.onColorChange, this)

    this.particleEmitterView.onBlendModeChange.add(this.onBlendModeChange, this)

    const particleProxy = this.facade.retrieveProxy(ParticleProxy.NAME)
    this.particleEmitterView.setValues(particleProxy.getCurrentEmitterName(), particleProxy.getCurrentEmitter())
  }

  onParticleImageChange () {
    loadFile(this.particleEmitterView.particleImage, e => {
      const imageData = e.target.result
      $('#particleImagePreview').css('background-image', 'url(' + imageData + ')')

      this.sendNotification(ParticleEmitterView.PARTICLE_IMAGE_CHANGE, imageData)
    })
  }

  onDimensionChange () {
    this.sendNotification(ParticleEmitterView.DIMENSION_CHANGE, this.particleEmitterView.dimension)
  }

  onPositionOffsetChange () {
    this.sendNotification(ParticleEmitterView.POSITION_OFFSET_CHANGE, this.particleEmitterView.positionOffset)
  }

  onGravityChange () {
    this.sendNotification(ParticleEmitterView.GRAVITY_CHANGE, this.particleEmitterView.gravity)
  }

  onBounceChange () {
    this.sendNotification(ParticleEmitterView.BOUNCE_CHANGE, this.particleEmitterView.bounce)
  }

  onStartRotationStatusChange () {
    this.sendNotification(ParticleEmitterView.START_ROTATION_STATUS_CHANGE,
      {
        status: this.particleEmitterView.startRotationStatus,
        startRotation: this.particleEmitterView.startRotation
      })
  }

  onStartRotationChange () {
    this.sendNotification(ParticleEmitterView.START_ROTATION_CHANGE, this.particleEmitterView.startRotation)
  }

  onAnchorStatusChange () {
    this.sendNotification(ParticleEmitterView.ANCHOR_STATUS_CHANGE,
      {
        status: this.particleEmitterView.anchorStatus,
        anchor: this.particleEmitterView.anchor
      })
  }

  onAnchorChange () {
    this.sendNotification(ParticleEmitterView.ANCHOR_CHANGE, this.particleEmitterView.anchor)
  }

  onAngularDragChange () {
    this.sendNotification(ParticleEmitterView.ANGULAR_DRAG_CHANGE, this.particleEmitterView.angularDrag)
  }

  onLifespanChange () {
    this.sendNotification(ParticleEmitterView.LIFESPAN_CHANGE, this.particleEmitterView.lifespan)
  }

  onFrequencyChange () {
    this.sendNotification(ParticleEmitterView.FREQUENCY_CHANGE, this.particleEmitterView.frequency)
  }

  onQuantityChange () {
    this.sendNotification(ParticleEmitterView.QUANTITY_CHANGE, this.particleEmitterView.quantity)
  }

  onTotalChange () {
    this.sendNotification(ParticleEmitterView.TOTAL_CHANGE, this.particleEmitterView.total)
  }

  onMaxParticlesChange () {
    this.sendNotification(ParticleEmitterView.MAX_PARTICLES_CHANGE, this.particleEmitterView.maxParticles)
  }

  onCollideChange () {
    this.sendNotification(ParticleEmitterView.COLLIDE_CHANGE, this.particleEmitterView.collide)
  }

  onImmediateChange () {
    this.sendNotification(ParticleEmitterView.IMMEDIATE_CHANGE, this.particleEmitterView.immediate)
  }

  onCollideWorldBoundsChange () {
    this.sendNotification(ParticleEmitterView.COLLIDE_WORLD_BOUNDS_CHANGE, this.particleEmitterView.collideWorldBounds)
  }

  onExplodeChange () {
    this.sendNotification(ParticleEmitterView.EXPLODE_CHANGE, this.particleEmitterView.explode)
  }

  onFlowChange () {
    this.sendNotification(ParticleEmitterView.FLOW_CHANGE, this.particleEmitterView.flow)
  }

  onScaleTypeChange () {
    this.sendNotification(ParticleEmitterView.SCALE_TYPE_CHANGE)
  }

  onRandomScaleChange () {
    this.sendNotification(ParticleEmitterView.SCALE_CHANGE_RANDOM, this.particleEmitterView.scaleProportional)
  }

  onScaleChange () {
    this.sendNotification(ParticleEmitterView.SCALE_CHANGE, this.particleEmitterView.scaleDisproportional)
  }

  onRotationChange () {
    this.sendNotification(ParticleEmitterView.ROTATION_CHANGE, this.particleEmitterView.rotation)
  }

  onSpeedChange () {
    this.sendNotification(ParticleEmitterView.SPEED_CHANGE, this.particleEmitterView.speed)
  }

  onAlphaChange () {
    this.sendNotification(ParticleEmitterView.ALPHA_CHANGE, this.particleEmitterView.alpha)
  }

  onColorStatusChange () {
    this.sendNotification(ParticleEmitterView.COLOR_STATUS_CHANGE,
      { status: this.particleEmitterView.colorStatus, color: this.particleEmitterView.color })
  }

  onColorChange () {
    this.sendNotification(ParticleEmitterView.COLOR_CHANGE, this.particleEmitterView.color)
  }

  onBlendModeChange () {
    this.sendNotification(ParticleEmitterView.BLEND_MODE_CHANGE, this.particleEmitterView.blendMode)
  }

  listNotificationInterests () {
    return [
      ParticleEditorView.CHANGE_EMITTER,
      ParticleProxy.INTERNAL_DATA_CHANGE
    ]
  }

  handleNotification (notification) {
    switch (notification.getName()) {
      case ParticleEditorView.CHANGE_EMITTER:
      case ParticleProxy.INTERNAL_DATA_CHANGE:
        const particleProxy = this.facade.retrieveProxy(ParticleProxy.NAME)
        this.particleEmitterView.setValues(particleProxy.getCurrentEmitterName(), particleProxy.getCurrentEmitter())
        break
    }
  }
}
