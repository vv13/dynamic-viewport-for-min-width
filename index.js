// use or not 'min-width'
let isMatch = false

function initViewport(width = 'device-width') {
  // remove old one
  const viewport = document.querySelector('meta[name=viewport]')
  if (viewport) document.head.removeChild(viewport)

  // create new one
  const newViewport = document.createElement('meta')
  newViewport.setAttribute('name', 'viewport')
  newViewport.setAttribute('content', `width=${width}, maximum-scale=2.0`)
  document.head.appendChild(newViewport)
}

function setViewport(minWidth = 'device-width') {
  const viewport = document.querySelector('meta[name=viewport]')
  if (!viewport) return
  viewport.setAttribute('content', `width=${minWidth}, maximum-scale=2.0`)
}

function resizeHandler(minWidth) {
  const innerWidth = window.screen.width
  if (minWidth < innerWidth && isMatch) {
    isMatch = false
    setViewport()
  } else if (minWidth > innerWidth && !isMatch) {
    isMatch = true
    setViewport(minWidth)
  }
}

export default function dynamicViewport(minWidth) {
  initViewport()
  resizeHandler(minWidth)
  window.onresize = () => resizeHandler(minWidth)
}
