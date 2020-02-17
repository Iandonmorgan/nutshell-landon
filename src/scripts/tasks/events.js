import API from "../data.js"
import {renderForm} from "./dom.js"
import {newTaskObj} from "./factory.js"

const taskBtn = document.querySelector("#tasks")
const saveBtn = document.querySelector("#submitTask")
const taskContainer = document.querySelector("#tasks-container")

const openTasks = () => {
    taskBtn.addEventListener("click", () => {
        return renderForm();
    })
}

// Add hidden input field
const save = () => {
    if (taskContainer.contains(saveBtn)) {
        saveBtn.addEventListener("click", event => {
            console.log(event)
            // const taskVal = document.querySelector("#createTask").value
            // const dateVal = document.querySelector("#completionDate").value
        
            // const newObj = newTaskObj(taskVal, dateVal)
            // console.log(newObj)
        
            // API.save()
        })
    }
}

export {openTasks,save}