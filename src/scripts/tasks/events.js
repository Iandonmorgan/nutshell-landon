import API from "../data.js"
import {renderForm} from "./dom.js"
import {newTaskObj} from "./factory.js"

const taskBtn = document.querySelector("#tasks")
const hiddenVal = document.querySelector("#hidden-input")

const openTasksForm = () => {
    taskBtn.addEventListener("click", () => {
        hiddenVal.value = 1;
        renderForm();
        addSaveFunctionality();
    })
}

const addSaveFunctionality = () => {
    if (parseInt(hiddenVal.value) !== "") {
        const saveBtn = document.querySelector("#submitTask")
        saveBtn.addEventListener("click", event => {
            const taskVal = document.querySelector("#createTask").value
            const dateVal = document.querySelector("#completionDate").value
        
            const newObj = newTaskObj(taskVal, dateVal)
            console.log(newObj)
        
            API.save(newObj, "tasks")
        })
    }
}

export {openTasksForm}