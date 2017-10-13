import Phaser from 'phaser'

export default class ParticleEditorView {
  static NAME = 'ParticleEditorView'

  static CREATE_SANDBOX = ParticleEditorView.NAME + 'SandboxCreate'
  static SAVE_PROJECT = ParticleEditorView.NAME + 'ProjectSave'
  static CHOSE_PROJECT = ParticleEditorView.NAME + 'ProjectChose'
  static SHOW_OPENED_PROJECT_INFO = ParticleEditorView.NAME + 'OpenedProjectInfoShow'
  static DOWNLOAD_EMITTERS = ParticleEditorView.NAME + 'EmittersDownload'
  static CHOSE_EMITTERS = ParticleEditorView.NAME + 'EmittersChose'
  static CHANGE_PROJECT_NAME = ParticleEditorView.NAME + 'ProjectNameChange'
  static ADD_EMITTER = ParticleEditorView.NAME + 'EmitterAdd'
  static DUPLICATE_EMITTER = ParticleEditorView.NAME + 'EmitterDuplicate'
  static RENAME_EMITTER = ParticleEditorView.NAME + 'EmitterRename'
  static REMOVE_EMITTER = ParticleEditorView.NAME + 'EmitterRemove'
  static CHANGE_EMITTER = ParticleEditorView.NAME + 'EmitterChange'
  static ENABLE_DISABLE_EMITTER = ParticleEditorView.NAME + 'EnableDisableEmitter'
  static CHANGE_BG_COLOR = ParticleEditorView.NAME + 'BgColorChange'
  static CHANGE_BG_IMAGE = ParticleEditorView.NAME + 'BgImageChange'
  static REMOVE_BG_IMAGE = ParticleEditorView.NAME + 'BgImageRemove'
  static DOWNLOAD_JSON = ParticleEditorView.NAME + 'DownloadJSON'

  constructor () {
    this.tabButtonTargetName = null
    this.targetEmitterName = null
    this.onProjectChoose = new Phaser.Signal()
    this.onCreateEmitterTabClick = new Phaser.Signal()
    this.onEmitterChoose = new Phaser.Signal()
    this.onCreateSandbox = new Phaser.Signal()
    this.onEmitterAdd = new Phaser.Signal()
    this.onEmitterRename = new Phaser.Signal()
    this.onEmitterEdit = new Phaser.Signal()
    this.onEmitterDuplicate = new Phaser.Signal()
    this.onEmitterChange = new Phaser.Signal()
    this.onEmitterRemove = new Phaser.Signal()
    this.onTurnEmitterOnOff = new Phaser.Signal()
    this.onBgColorChange = new Phaser.Signal()
    this.onBgImageChange = new Phaser.Signal()
    this.onBgImageRemove = new Phaser.Signal()
    this.onMouseClick = new Phaser.Signal()
    this.onFollowCursorChange = new Phaser.Signal()
    this.onDownload = new Phaser.Signal()
    this.onProjectNameChange = new Phaser.Signal()
    this.onSave = new Phaser.Signal()
    this.onCloseCreateEmitterModal = new Phaser.Signal()
    this.initProperties()
  }

  get projectName () {
    return $('#projectName').val()
  }

  get bgColor () {
    return this._bgColor.val()
  }

  get bgImage () {
    return this._bgImage.prop('files')[0]
  }

  get currentTabName () {
    return $('#' + this.targetEmitterName + 'Field').val()
  }

  get createProjectName () {
    return $('#createProjectName').val()
  }

  get sandboxHeight () {
    return Number($('#sandboxHeight').val())
  }

  get sandboxWidth () {
    return Number($('#sandboxWidth').val())
  }

  get choseProject () {
    return $('#projectChoose').prop('files')[0]
  }

  get openedProjectName () {
    return $('#openedProjectName').val()
  }

  get openedSandboxHeight () {
    return Number($('#openedSandboxHeight').val())
  }

  get openedSandboxWidth () {
    return Number($('#openedSandboxWidth').val())
  }

  get selectedTab () {
    return $('#createProjectTabGroup').find('.active').attr('id')
  }

  get createEmitterSelectedTab () {
    return $('#createEmitterTabGroup').find('.active').attr('id')
  }

  get newEmitterName () {
    return $('#emitterName').val()
  }

  get choseEmitters () {
    return $('#emittersChoose').prop('files')[0]
  }

  cleanChoseEmitters () {
    $('#emittersChoose').val(null)
  }

  cleanNewEmitterName () {
    $('#emitterName').val(null)
  }

  initProperties () {
    $('#chooseTab').on('click', this.clearAndHideOpenedProjectInfo)
    $('#projectChoose').on('change', this.onEditorPropertyValueChange.bind(this, this.onProjectChoose))
    $('#emittersChoose').on('change', this.onEditorPropertyValueChange.bind(this, this.onEmitterChoose))
    $('#createTab').on('click', this.clearCreateTabFields)
    $('#createEmitterTab').on('click', this.onEditorPropertyValueChange.bind(this, this.onCreateEmitterTabClick))
    $('#createSandboxModalButtonOK').on('click', this.onEditorPropertyValueChange.bind(this, this.onCreateSandbox))
    $('#downloadEmitters').on('click', this.onEditorPropertyValueChange.bind(this, this.onDownload))
    $('.downloadProject').on('click', this.onEditorPropertyValueChange.bind(this, this.onSave))
    $('.refresh').on('click', this.refreshPage)
    $('#createEmitterModalButtonOK').on('click', this.onCreateEmitterButtonClick.bind(this, this.onEmitterAdd))
    $('#projectName').on('change', this.onEditorPropertyValueChange.bind(this, this.onProjectNameChange))
    this._bgColor = $('#canvasBGColorInput')
      .on('change', () => { this.onEditorPropertyValueChange.bind(this, this.onBgColorChange) })
    this._bgImage = $('#canvasBgImage').on('change', this.onEditorPropertyValueChange.bind(this, this.onBgImageChange))
    $('#removeBgImage').on('click', this.onEditorPropertyValueChange.bind(this, this.onBgImageRemove))
    $('#sandboxContainer').on('click', this.onEditorPropertyValueChange.bind(this, this.onMouseClick))
    $('#followCursor').on('change', this.onEditorPropertyValueChange.bind(this, this.onFollowCursorChange))
    $('#removeEmitter').on('click', this.onEditorPropertyValueChange.bind(this, this.onEmitterRemove))
    $('#createEmitterModal').on('hide.bs.modal', this.onEditorPropertyValueChange.bind(this, this.onCloseCreateEmitterModal))
  }

  onEditorPropertyValueChange (eventToDispatch, event) {
    eventToDispatch.dispatch()
  }

  // CreateSandboxModal
  showCreateSandboxModal () {
    $('#createSandboxModal').modal({show: true, backdrop: 'static', keyboard: false})
  }

  hideCreateSandboxModal () {
    $('#createSandboxModal').modal('hide')
  }

  clearAndHideOpenedProjectInfo () {
    $('#projectChoose').val(null)
    $('#modalProjectInfo').hide()
    $('#createCanvasModalButtonOK').text('Open')
  }

  clearCreateTabFields () {
    $('#projectChoose').val(null)
    $('#modalProjectInfo').hide()
    $('#createCanvasModalButtonOK').text('Create')
  }

  // Follow cursor

  setOpenedProjectInfo (config) {
    $('#modalProjectInfo').show()
    $('#openedProjectName').val(config.name)
    $('#openedSandboxHeight').val(config.height)
    $('#openedSandboxWidth').val(config.width)
  }

  // ScaleMode change

  initEmitterButtons (vo) {
    let lastName
    for (let emitterName in vo.emitters) {
      this.addEmitterTab(emitterName)
      lastName = emitterName
      this.setEmitterTabEyeIcon(emitterName, vo.emitters[emitterName].enabled)
    }
    this.setActiveEmitter(lastName)
    this.onEmitterTabChange(lastName)
  }

  addEmitterTab (emitterName) {
    $('#addEmitterButtonLi').before(
      `<li id="${emitterName}Li" class="nav-item">
         <a id="${emitterName}" class="nav-link" data-toggle="tab" href="#emitterContent" role="tab">
           <input id="${emitterName}Field" type="text" class="pureInput" value="${emitterName}"
           oninput="this.style.width = ((this.value.length) * 8) + 'px';" disabled >
           <span class="tabButtons"><span class="fa fa-eye" id="${emitterName}TabEye"></span>
         <span class="nav-tab-icons-divider">|</span>
         <div class="dropdown nav-tab-dropdown"> 
          <button class="btn fa fa-ellipsis-v nav-tab-dropdown-btn" id="${emitterName}Dropdown" data-toggle="dropdown" aria-expanded="false">
        </button>
          <div class="dropdown-menu">
          <i class="dropdown-item fa fa-trash-o tabButtons" id="${emitterName}Trash" aria-hidden="true"><span>delete</span></i>
          <i class="dropdown-item fa fa-edit tabButtons" id="${emitterName}Rename" aria-hidden="true"><span>rename</span></i>
          <i class="dropdown-item fa fa-copy tabButtons" id="${emitterName}Duplicate" aria-hidden="true"><span>duplicate</span></i>
          </div>
         </div>
        </a>
      </li>`)
    this.setEmitterTabListeners(emitterName)
    this.setActiveEmitter(emitterName)
  }

  setEmitterTabListeners (emitterName) {
    $('#' + emitterName + '').on('click', () => {
      if (emitterName !== this.targetEmitterName) {
        this.onEmitterTabChange(emitterName)
      }
    })
    // $('#' + emitterName + '').on('click', this.onEmitterTabChange.bind(this, emitterName))
    $('#' + emitterName + 'TabEye')
      .on('click', this.onEmitterTabNestedButtonClick.bind(this, emitterName, this.onTurnEmitterOnOff, null))
    $('#' + emitterName + 'Field').on('change', this.onEmitterTabNestedButtonClick.bind(this, emitterName, this.onEmitterRename, null))
    $('#' + emitterName + 'Field').on('focusout', () => {
      $('#' + emitterName + 'Field').prop('disabled', true)
      this.onEditorPropertyValueChange.bind(this, this.onEmitterRename)
    })
    $('#' + emitterName + 'Rename')
      .on('click',
        this.onEmitterTabNestedButtonClick.bind(this, emitterName, null, this.onEmitterTabNestedButtonClick.bind(this, emitterName, this.onEmitterEdit), null))
    $('#' + emitterName + 'Duplicate')
      .on('click',
        this.onEmitterTabNestedButtonClick.bind(this, emitterName, null, this.onEmitterTabNestedButtonClick.bind(this, emitterName, this.onEmitterDuplicate, null)))
      .on('click', () => {
        $('.dropdown').removeClass('show')
        $('.dropdown-menu').removeClass('show')
        $('#' + emitterName + 'Dropdown').attr('aria-expanded', false)
        return false
      })
    $('#' + emitterName + 'Dropdown').on('click', () => {
      if (this.targetEmitterName !== this.tabButtonTargetName) {
        $('.dropdown').removeClass('show')
        $('.dropdown-menu').removeClass('show')
        $('#' + emitterName + 'Dropdown').attr('aria-expanded', false)
        return false
      }
    })
    $('#' + emitterName + 'Trash')
      .on('click',
        this.onEmitterTabNestedButtonClick.bind(this, emitterName, null, this.updateRemoveEmitterModalText.bind(this)))
    this.setInputMinimalWidth(emitterName + 'Field')
  }

  removeEmitterTabListeners (emitterName) {
    $('#' + emitterName + '').off('click')
    $('#' + emitterName + 'TabEye').off('click')
    $('#' + emitterName + 'Field').off('change')
    $('#' + emitterName + 'Span').off('click')
    $('#' + emitterName + 'Field').off('focusout')
    $('#' + emitterName + 'Rename').off('click')
    $('#' + emitterName + 'Duplicate').off('click')
    $('#' + emitterName + 'Trash').off('click')
  }

  renameEmitterTab (names) {
    const nameOld = names.oldName
    const nameNew = names.newName
    this.removeEmitterTabListeners(nameOld)
    $('#' + nameOld).attr('id', nameNew)
    $('#' + nameOld + 'Li').attr('id', nameNew + 'Li')
    $('#' + nameOld + 'Field').attr('id', nameNew + 'Field')
    $('#' + nameOld + 'Field').val(nameNew)
    $('#' + nameOld + 'TabEye').attr('id', nameNew + 'TabEye')
    $('#' + nameOld + 'Edit').attr('id', nameNew + 'Edit')
    $('#' + nameOld + 'Duplicate').attr('id', nameNew + 'Duplicate')
    $('#' + nameOld + 'Trash').attr('id', nameNew + 'Trash')
    $('#' + nameOld + 'Dropdown').attr('id', nameNew + 'Dropdown')
    this.setEmitterTabListeners(nameNew)
  }

  onEmitterTabChange (target) {
    this.disableTabButons()
    this.targetEmitterName = target
    this.onEmitterChange.dispatch()
  }

  onEmitterTabNestedButtonClick (target, eventToDispatch, callback = null) {
    this.tabButtonTargetName = target
    if (this.tabButtonTargetName !== this.targetEmitterName) {
      return
    }
    if (eventToDispatch) {
      eventToDispatch.dispatch()
    }
    if (callback) {
      callback()
    }
  }
  f () {
    $('#ur').val($('#vortexic').text())
  }

  setActiveEmitter (emitterName) {
    this.disableTabButons()
    if (emitterName) {
      this.targetEmitterName = emitterName
      this.tabButtonTargetName = emitterName
    }
    this.toggleScaleMode()
    this.toggleFlow()
    this.toggleExplode()
    this.enableTabButtons(emitterName)
    $('#' + this.targetEmitterName).tab('show')
  }

  onCreateEmitterButtonClick (eventToDispatch) {
    this.onEditorPropertyValueChange(eventToDispatch)
    $('#emitterName').val(null)
  }

  setEmitterTabEyeIcon (name, status) {
    if (status) {
      $('#' + name + 'TabEye').attr('class', 'fa fa-eye')
    } else {
      $('#' + name + 'TabEye').attr('class', 'fa fa-eye-slash')
    }
  }

  toggleEmitterTabEyeIcon (name, status) {
    const target = $('#' + name + 'TabEye')
    if (status) {
      target.attr('class', 'fa fa-eye-slash')
    } else {
      target.attr('class', 'fa fa-eye')
    }
  }

  enableEmitterNameField (name) {
    $('#' + name + 'Field').prop('disabled', false)
  }

  removeEmitterButton (emitterName) {
    $('#' + emitterName + 'Li').empty().remove()
  }

  updateRemoveEmitterModalText () {
    $('#removeEmitterModal span').text(this.tabButtonTargetName)
    $('#removeEmitterModal').modal({show: true})
  }

  changeFollowCursorCheckboxStatus () {
    const status = $('#followCursor').prop('checked')
    $('#followCursor').prop('checked', !status)
  }

  toggleScaleMode () {
    const status = $('#proportionalScale').prop('checked')
    $('#scaleFromX').prop('disabled', status)
    $('#scaleFromY').prop('disabled', status)
    $('#scaleToX').prop('disabled', status)
    $('#scaleToY').prop('disabled', status)
    $('#scaleEasing').prop('disabled', status)
    $('#scaleEasingMode').prop('disabled', status)
    $('#scaleRate').prop('disabled', status)
    $('#scaleYoyo').prop('disabled', status)
    $('#minScale').prop('disabled', !status)
    $('#maxScale').prop('disabled', !status)
  }

  toggleFlow () {
    const flowStatus = $('#flow').prop('checked')
    const explode = $('#explode')
    const quantity = $('#quantity')
    const immediate = $('#immediate')
    if (flowStatus) {
      immediate.prop('disabled', false)
      quantity.prop('disabled', false)
      explode.prop('checked', false)
    } else {
      quantity.prop('disabled', true)
      immediate.prop('disabled', true)
    }
  }

  toggleExplode () {
    const explodeStatus = $('#explode').prop('checked')
    const flow = $('#flow')
    const quantity = $('#quantity')
    const immediate = $('#immediate')
    if (explodeStatus) {
      immediate.prop('disabled', true)
      quantity.prop('disabled', true)
      flow.prop('checked', false)
      immediate.prop('checked', false)
    }
  }

  // Other methods
  refreshPage () {
    window.location.reload(true)
  }

  enableRemoveBgImageButton () {
    $('#removeBgImage').prop('disabled', false)
  }

  disableRemoveBgImageButton () {
    $('#removeBgImage').prop('disabled', true)
    $('#canvasBgImage').val(null)
  }

  // Create Emitter Modal

  downloadJSON (element, vo, key) {
    let data = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(vo, null, 2))
    const downloader = $(element)
    downloader.attr('href', 'data:' + data)
    downloader.attr('download', this.projectName + key)
  }

  setInputMinimalWidth (inputID = 'projectName') {
    const element = $('#' + inputID)
    element.css('width', (element.val().length + 1) * 8 + 'px')
  }

  // CreateEmitterModal getters

  changePreviewImageBackground (color) {
    $('#particleImagePreviewDiv').css('background', color)
  }

  hideCreateEmitterModal () {
    $('#createEmitterModal').modal('hide')
  }

  // Setters

  setValues (vo) {
    $('#projectName').val(vo.name)
    console.log(vo)
    $('#canvasBGColorInputDiv').colorpicker('setValue', vo.bgColor)
  }

  showControls () {
    $('#controlsContainer').css('visibility', 'visible')
  }

  setCreateSandboxModalValues (properties) {
    $('#createProjectName').val(properties.name)
    $('#sandboxHeight').val(properties.height)
    $('#sandboxWidth').val(properties.width)
  }

  editEmitterTabName (emitterName) {
    if (this.tabButtonTargetName !== this.targetEmitterName) { return }
    $('#' + emitterName + 'Field').prop('disabled', false)
    $('#' + emitterName + 'Field').focus()
  }
  disableTabButons () {
    $('#' + this.targetEmitterName + 'Dropdown').prop('disabled', true)
    $('#' + this.targetEmitterName + 'TabEye').prop('disabled', true)
  }

  enableTabButtons (emitterName) {
    $('#' + emitterName + 'Dropdown').prop('disabled', false)
    $('#' + emitterName + 'TabEye').prop('disabled', false)
  }
}
