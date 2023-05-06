const dragBtn = document.getElementsByClassName('drag-button')
let clickedProject

function handleMouseDownToDragProject(event) {
  clickedProject = event.target.parentNode.parentNode.parentNode
  clickedProject.style.setProperty('order', 2)
  document.addEventListener('mousemove', handleMouseMoveToDragProject)
}
// mouse가 누른버튼 위에있는 객체에서 감지되면, 버튼누른 객체와 mouse위치에
// 있는 객체의 order 변경
function handleMouseMoveToDragProject(event) {
  console.log(window.getComputedStyle(clickedProject).getPropertyValue('order'))
  const targetDiv = event.target
  console.log(targetDiv)
  document.addEventListener('mouseup', () => document.removeEventListener('mousemove', handleMouseMoveToDragProject))
}
export default function handleDragBtn() {
  for (let i = 0; i < dragBtn.length; i++) dragBtn[i].addEventListener('mousedown', handleMouseDownToDragProject)
}
