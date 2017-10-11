import { createImageFromBitmapData } from '@koreez/phaser-particle-editor-plugin'

export const setBodyColor = (color) => {
  document.body.style.backgroundColor = color
}

export const loadFile = (file, onload) => {
  console.log(file)
  const fileExtension = file.name.split('.').pop()
  // eslint-disable-next-line no-undef
  let reader = new FileReader()
  reader.onload = onload
  switch (fileExtension) {
    case 'png':
    case 'jpg':
    case 'jpeg':
      reader.readAsDataURL(file)
      break
    default:
      reader.readAsText(file)
  }
}

export const loadImageFile = (file, key, onload, onerror) => {
  loadFile(file, e => {
    let bitmapData = e.target.result
    createImageFromBitmapData(window.sandbox, bitmapData, key, onload, onerror)
  })
}
