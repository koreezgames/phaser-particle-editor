import EditorPropertyChangeCommand from './EditorPropertyChangeCommand'

export default class DimensionSetCommand extends EditorPropertyChangeCommand {
  execute (notification) {
    this.proxy.setDimension()
  }
}
