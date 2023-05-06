// render 시, 객체들에 속성을 한번에 추가하기 위한 함수
export function render(object, parent, id, Class, innerText) {
  object.id = id
  object.classList.add(Class)
  object.innerText = innerText
  parent.appendChild(object)
}
