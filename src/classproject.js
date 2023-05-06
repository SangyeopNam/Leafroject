import * as cf from './classfunction.js'
import { save, PROJECTS_KEY, parsedProjects, deleteItem } from './uselocalstorage.js'
import handleDragBtn from './drag.js'
const projectList = document.querySelector('#project-list')
const projectInputDatalist = document.querySelector('#project-select')
export default class projectForm {
  constructor(pid, name, importance, color) {
    this.pid = pid
    this.name = name
    this.importance = importance
    this.color = color
    this.tids = []
    this.clickImportanceBtn = this.clickImportanceBtn.bind(this)
    this.checkAccordionBtn = this.checkAccordionBtn.bind(this)
    this.insertProjectList()
    this.renderProject()
  }
  // project 객체 생성 시, datalist에 해당 프로젝트 추가
  insertProjectList() {
    const selectedProject = document.createElement('option')
    selectedProject.value = this.name
    projectInputDatalist.appendChild(selectedProject)
  }
  // project 객체 생성 시, html에 해당 객체 만들기
  renderProject() {
    const projectUl = document.createElement('ul')
    const projectDiv = document.createElement('div')
    const todoDiv = document.createElement('div')
    const nameBox = document.createElement('div')
    const colorInput = document.createElement('input')
    const accordionLabel = document.createElement('label')
    const toolbox = document.createElement('div')
    const accordionBtn = document.createElement('input')
    const dragBtn = document.createElement('button')
    const importanceBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    projectUl.style.setProperty('order', 1)
    colorInput.type = 'color'
    colorInput.style.setProperty('opacity', this.importance / 5)
    accordionLabel.setAttribute('for', 'A' + this.pid)
    accordionBtn.type = 'checkbox'
    cf.render(projectUl, projectList, this.pid, 'project', null)
    cf.render(projectDiv, projectUl, null, 'project-div', null)
    cf.render(todoDiv, projectUl, null, 'todo-div', null)
    cf.render(nameBox, projectDiv, null, 'name-box', null)
    cf.render(colorInput, nameBox, null, 'color-select', null)
    cf.render(accordionLabel, nameBox, null, 'accordion-label', this.name)
    cf.render(toolbox, projectDiv, null, 'toolbox', null)
    cf.render(accordionBtn, toolbox, 'A' + this.pid, 'accordion', null)
    cf.render(dragBtn, toolbox, null, 'drag-button', '〓')
    cf.render(importanceBtn, toolbox, null, 'importance-button', '★')
    cf.render(deleteBtn, toolbox, null, 'delete-button', '❌')
    handleDragBtn()
    accordionBtn.addEventListener('change', this.checkAccordionBtn)
    importanceBtn.addEventListener('click', this.clickImportanceBtn)
    deleteBtn.addEventListener('click', (event) =>
      deleteItem(event.target.parentNode.parentNode.parentNode, PROJECTS_KEY)
    )
  }
  // 아코디언 버튼 클릭 시, todo의 크기를 조정하고 보이게 변경
  checkAccordionBtn(event) {
    const projectUl = event.target.parentNode.parentNode.parentNode
    const todoDiv = projectUl.querySelector('.todo-div')
    const todoList = todoDiv.querySelector('.todo-list')
    if (event.target.checked) todoDiv.style.setProperty('max-height', 0)
    else todoDiv.style.setProperty('max-height', `${todoList.offsetWidth}px`)
  }
  // 중요도 버튼 클릭 시, 중요도 낮추고 투명도 줄임
  clickImportanceBtn(event) {
    const projectUl = event.target.parentNode.parentNode.parentNode
    const colorInput = projectUl.querySelector('.color-select')
    if (this.importance - 1 < 0) this.importance = 5
    else this.importance -= 1
    colorInput.style.setProperty('opacity', this.importance / 5)
    parsedProjects.filter((project) => project.pid == projectUl.id)[0].importance = this.importance
    save(PROJECTS_KEY)
  }
}
