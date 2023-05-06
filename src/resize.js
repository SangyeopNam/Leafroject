const main = document.querySelector('main')
const panelHandler = main.querySelector('#panel-handler')
const leftPanel = main.querySelector('#left-panel')
const rightPanel = main.querySelector('#right-panel')

function handleMouseDownToResize() {
  document.addEventListener('mousemove', handleMouseMoveToResize)
}
function handleMouseMoveToResize(event) {
  const offsetLeft = event.clientX
  const offsetRight = main.offsetWidth - (event.clientX - main.offsetLeft)
  leftPanel.style.width = `${offsetLeft}px`
  rightPanel.style.width = `${offsetRight}px`
  document.addEventListener('mouseup', () => document.removeEventListener('mousemove', handleMouseMoveToResize))
}

export default function handleClickToResize() {
  panelHandler.addEventListener('mousedown', handleMouseDownToResize)
}
