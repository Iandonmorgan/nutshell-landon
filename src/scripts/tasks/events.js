import API from "../data.js"
import {renderForm} from "./dom.js"
import {newTaskObj, taskListFactory} from "./factory.js"

const taskBtn = document.querySelector("#tasks")
const hiddenVal = document.querySelector("#hidden-input")
const taskListContainer = document.querySelector("#tasks-list")

const openTasksForm = () => {
    taskBtn.addEventListener("click", () => {
        hiddenVal.value = 1;
        renderForm();
        addSaveFunctionality();
        addViewTasksFunctionality();
    })
}

const addSaveFunctionality = () => {
    if (parseInt(hiddenVal.value) !== "") {
        const saveBtn = document.querySelector("#submitTask")
        saveBtn.addEventListener("click", event => {
            const taskVal = document.querySelector("#createTask").value
            const dateVal = document.querySelector("#completionDate").value
        
            const newObj = newTaskObj(taskVal, dateVal)
        
            API.save(newObj, "tasks")
        })
    }
}

// So this fn renders data to DOM, now need to work on checkbox btn click...
// Should you do an if/else that checks if the checkbox has been clicked?
// Need to do a PUT req to change the isComplete property value when checkbox
// clicked....
const addViewTasksFunctionality = () => {
    const viewTasksBtn = document.querySelector("#viewTasks")

    viewTasksBtn.addEventListener("click", () => {
        taskListContainer.innerHTML = ""
        API.get("tasks").then(entries => entries.forEach(entry => {
            taskListContainer.innerHTML += taskListFactory(entry)
        }))
    })
}

export {openTasksForm}