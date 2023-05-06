const TODOS_KEY = 'todos'
const PROJECTS_KEY = 'projects'
let parsedTodos = []
let parsedProjects = []
export { TODOS_KEY, PROJECTS_KEY, parsedTodos, parsedProjects }
import projectForm from './classproject.js'
import todoForm from './classtodo.js'
// js객체(parsedProject,parsedTodo)를 localStorage에 저장하는 함수
export function save(key) {
  if (key == PROJECTS_KEY) localStorage.setItem(key, JSON.stringify(parsedProjects))
  else localStorage.setItem(key, JSON.stringify(parsedTodos))
}
// 웹사이트가 새로고침되면 localStorage를 참조하여 객체를 다시 생성하는 함수
function recall(key) {
  const parsed = JSON.parse(localStorage.getItem(key))
  if (key == PROJECTS_KEY) {
    parsed.forEach((recall) => new projectForm(recall.pid, recall.name, recall.importance, recall.color))
    parsedProjects = parsed
  } else {
    parsed.forEach((recall) => new todoForm(recall.tid, recall.pid, recall.name, recall.importance))
    parsedTodos = parsed
  }
}
// delete 버튼 클릭 시 해당 버튼의 project/todo를 확인 후 html에서 객체를 지우고 localStorage를 다시 저장하는 함수
export function deleteItem(target, key) {
  if (key == PROJECTS_KEY) {
    parsedProjects = parsedProjects.filter((project) => project.pid != target.id)
    parsedTodos = parsedTodos.filter((todo) => todo.pid != target.id)
    save(TODOS_KEY)
  } else parsedTodos = parsedTodos.filter((todo) => todo.tid != target.id)
  target.remove()
  save(key)
}
// main에서 실행되는 함수
export function renew() {
  if (localStorage.getItem(PROJECTS_KEY) !== null) recall(PROJECTS_KEY)
  if (localStorage.getItem(TODOS_KEY) !== null) recall(TODOS_KEY)
}
