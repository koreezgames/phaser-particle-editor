import { SimpleCommand } from 'pure-mvc'
import ParticleEmitterView from '../view/component/ParticleEmitterView'
import DimensionChangeCommand from './emitter/DimensionChangeCommand'
import PositionOffsetChangeCommand from './emitter/PositionOffsetChangeCommand'
import GravityChangeCommand from './emitter/GravityChangeCommand'
import BounceChangeCommand from './emitter/BounceChangeCommand'
import AngularDragChangeCommand from './emitter/AngularDragChangeCommand'
import LifespanChangeCommand from './emitter/LifespanChangeCommand'
import FrequencyChangeCommand from './emitter/FrequencyChangeCommand'
import RotationChangeCommand from './emitter/RotationChangeCommand'
import SpeedChangeCommand from './emitter/SpeedChangeCommand'
import AlphaChangeCommand from './emitter/AlphaChangeCommand'
import CollideWorldBoundsChangeCommand from './emitter/CollideWorldBoundsChangeCommand'
import ScaleTypeChangeCommand from './emitter/ScaleTypeChangeCommand'
import ScaleProportionalChangeCommand from './emitter/ScaleProportionalChangeCommand'
import ScaleDisproportionalChangeCommand from './emitter/ScaleDisproportionalChangeCommand'
import ParticleImageChangeCommand from './emitter/ParticleImageChangeCommand'
import ExplodeChangeCommand from './emitter/ExplodeChangeCommand'
import QuantityChangeCommand from './emitter/QuantityChangeCommand'
import TotalChangeCommand from './emitter/TotalChangeCommand'
import FlowChangeCommand from './emitter/FlowChangeCommand'
import CollideChangeCommand from './emitter/CollideChangeCommand'
import ImmediateChangeCommand from './emitter/ImmediateChangeCommand'
import MaxParticlesChangeCommand from './emitter/MaxParticlesChangeCommand'
import ColorChangeCommand from './emitter/ColorChangeCommand'
import ColorStatusChangeCommand from './emitter/ColorStatusChangeCommand'

export default class RegisterEmitterCommands extends SimpleCommand {
  execute (notification) {
    this.facade.registerCommand(ParticleEmitterView.PARTICLE_IMAGE_CHANGE, ParticleImageChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.PARTICLE_IMAGE_CHANGE, ParticleImageChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.DIMENSION_CHANGE, DimensionChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.POSITION_OFFSET_CHANGE, PositionOffsetChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.GRAVITY_CHANGE, GravityChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.BOUNCE_CHANGE, BounceChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.ANGULAR_DRAG_CHANGE, AngularDragChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.SCALE_TYPE_CHANGE, ScaleTypeChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.SCALE_CHANGE_DISPROPORTIONAL, ScaleDisproportionalChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.SCALE_CHANGE_PROPORTIONAL, ScaleProportionalChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.LIFESPAN_CHANGE, LifespanChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.FREQUENCY_CHANGE, FrequencyChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.COLLIDE_WORLD_BOUNDS_CHANGE, CollideWorldBoundsChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.ROTATION_CHANGE, RotationChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.SPEED_CHANGE, SpeedChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.ALPHA_CHANGE, AlphaChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.COLOR_STATUS_CHANGE, ColorStatusChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.COLOR_CHANGE, ColorChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.EXPLODE_CHANGE, ExplodeChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.QUANTITY_CHANGE, QuantityChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.TOTAL_CHANGE, TotalChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.MAX_PARTICLES_CHANGE, MaxParticlesChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.FLOW_CHANGE, FlowChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.COLLIDE_CHANGE, CollideChangeCommand)
    this.facade.registerCommand(ParticleEmitterView.IMMEDIATE_CHANGE, ImmediateChangeCommand)
  }
}
