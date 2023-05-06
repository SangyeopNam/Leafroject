import * as cf from './classfunction.js'
import { TODOS_KEY, deleteItem } from './uselocalstorage.js'
export default class todoForm {
  constructor(tid, pid, name, importance) {
    this.tid = tid
    this.pid = pid
    this.name = name
    this.importance = importance
    this.renderTodo()
  }
  // todo 객체 생성 시, html에 해당 객체 만들기
  renderTodo() {
    const projectTodoDiv = document.getElementById(this.pid).querySelector('.todo-div')
    const todoLi = document.createElement('li')
    const nameBox = document.createElement('div')
    const todoName = document.createElement('h4')
    const toolbox = document.createElement('div')
    const importanceBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    cf.render(todoLi, projectTodoDiv, this.tid, 'todo-list', null)
    cf.render(nameBox, todoLi, null, 'name-box', null)
    cf.render(todoName, nameBox, null, null, this.name)
    cf.render(toolbox, todoLi, null, 'toolbox', null)
    cf.render(importanceBtn, toolbox, null, 'importance-button', '★')
    cf.render(deleteBtn, toolbox, null, 'delete-button', '❌')
    deleteBtn.addEventListener('click', (event) => deleteItem(event.target.parentNode.parentNode, TODOS_KEY))
  }
}
