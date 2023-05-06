import { TODOS_KEY, PROJECTS_KEY, parsedTodos, parsedProjects } from './uselocalstorage.js'
import projectForm from './classproject.js'
import todoForm from './classtodo.js'
import * as useLocalStorage from './uselocalstorage.js'
const createForm = document.querySelector('#create-form')
const projectInputText = createForm.querySelector("input[name='project-input']")
const todoInputText = createForm.querySelector("input[name='todo-input']")
// project에 따른 todo 객체를 만드는 함수
function makeNewTodoByProject(project, name) {
  const newTodoForm = new todoForm('T' + Date.now(), project.pid, name, 5)
  project.tids.push(newTodoForm.tid)
  parsedTodos.push(newTodoForm)
}
// form 클릭 시 작동하는 함수 : 새 project 만들 때 / 기존 project 선택했을 때 / todoInput에 아무것도 없을 때로 조건 구분
function handleCreateFormSubmit(event) {
  event.preventDefault()
  let writtenProjectName = projectInputText.value
  if (writtenProjectName == '') writtenProjectName = 'Not Assigned'
  const writtenTodoName = todoInputText.value
  let project = parsedProjects.filter((parsedProject) => parsedProject.name == writtenProjectName)[0]
  todoInputText.value = null
  if (project == undefined) {
    const newProjectForm = new projectForm('P' + Date.now(), writtenProjectName, 5, 'gray')
    if (writtenTodoName != '') makeNewTodoByProject(newProjectForm, writtenTodoName)
    parsedProjects.push(newProjectForm)
  } else {
    if (writtenTodoName != '') makeNewTodoByProject(project, writtenTodoName)
    else alert('Write What To Do!')
  }
  useLocalStorage.save(PROJECTS_KEY)
  useLocalStorage.save(TODOS_KEY)
}
export default function formSubmitEventListener() {
  createForm.addEventListener('submit', handleCreateFormSubmit)
}
