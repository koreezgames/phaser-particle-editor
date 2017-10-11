import EditorPropertyChangeCommand from './EditorPropertyChangeCommand'

export default class ChangeProjectNameCommand extends EditorPropertyChangeCommand {
  execute (notification) {
    const name = notification.getBody()
    this.proxy.changeProjectName(name)
    super.execute(notification)
  }
}
