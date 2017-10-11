import EmitterPropertyChangeCommand from './EmitterPropertyChangeCommand'

export default class FrequencyChangeCommand extends EmitterPropertyChangeCommand {
  execute (notification) {
    const frequency = notification.getBody()
    this.proxy.changeFrequency(frequency)
    super.execute(notification)
  }
}
