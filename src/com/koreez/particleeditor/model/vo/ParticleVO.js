import EmitterVO from './EmitterVO'

export default class ParticleVO {
  constructor (config) {
    if (config) {
      this.emitters = config
    } else {
      this.emitters = {
        'default': new EmitterVO('default')
      }
    }
  }
}
