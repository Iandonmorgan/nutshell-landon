import API from "../data.js"
import {renderForm} from "./dom.js"
import {newTaskObj, taskListFactory, checkedTaskObj} from "./factory.js"

// STRETCH GOALS: 1) When save task btn clicked, remove text from the input fields 

const taskBtn = document.querySelector("#tasks")
const hiddenVal = document.querySelector("#hidden-input")
const taskListContainer = document.querySelector("#tasks-list")

// This function runs when 'Tasks' btn is clicked, and then opens up all other functions to run afterwards
const openTasksForm = () => {
    taskBtn.addEventListener("click", () => {
        hiddenVal.value = 1;
        renderForm();
        addSaveFunctionality();
        addViewTasksFunctionality();
        addCheckboxFunctionality();
        addDeleteFunctionality();
        addEditFunctionality();
    })
}

const addSaveFunctionality = () => {
    // Line 22 makes sure 'Tasks' button has been clicked to open form and access save btn
    if (parseInt(hiddenVal.value) !== "") {
        const saveBtn = document.querySelector("#submitTask")

        saveBtn.addEventListener("click", event => {
            let taskVal = document.querySelector("#createTask").value
            let dateVal = document.querySelector("#completionDate").value
        
            const newObj = newTaskObj(taskVal, dateVal)
        
            API.save(newObj, "tasks")
        })
    }
}

// GET all 'tasks' objs in DB, finds only those whose 'isComplete' property value is false,
// then converts them to HTML and adds to DOM.
const addViewTasksFunctionality = () => {
    const viewTasksBtn = document.querySelector("#viewTasks")

    viewTasksBtn.addEventListener("click", () => {
        taskListContainer.innerHTML = ""
        
        API.get("tasks").then(entries => entries.forEach(entry => {
            if (entry.isComplete === false) {
                taskListContainer.innerHTML += taskListFactory(entry)
            }
        }))
    })
}

// Changes 'isComplete' property value in the 'tasks' DB from 'false' to 'true' for whichever item/DB obj's checkbox is clicked
const addCheckboxFunctionality = () => {
    taskListContainer.addEventListener("click", event => {
        if (event.target.id.startsWith("checkbox--")) {
            // Will be used to get the matching obj in the DB
            const objToEditId = event.target.id.split("--")[1]

            // Now get the matching obj from DB via objToEdit, and then call updateObj API method
            // and pass in the checkedTaskObj factory fn that creates new obj w/ updated 'isComplete'
            API.edit(objToEditId, "tasks").then(resp => {
                resp.isComplete = true;
                API.update(resp, "tasks")
            })
        }
    })
}

// Deletes task from DB and task container in DOM on 'Delete' btn click
const addDeleteFunctionality = () => {
    taskListContainer.addEventListener("click", event => {
        if (event.target.id.startsWith("deleteBtn--")) {
            const objToDelete = event.target.id.split("--")[1]
            
            API.delete(objToDelete, "tasks").then(() => {
                taskListContainer.innerHTML = ""
                API.get("tasks").then(entries => entries.forEach(entry => {
                    if (entry.isComplete === false) {
                        taskListContainer.innerHTML += taskListFactory(entry)
                    }
                }))
            })
        }
    })
}

const addEditFunctionality = () => {
    taskListContainer.addEventListener("click", event => {
        if (event.target.id.startsWith("editName--")) {
            const nameInputField = document.getElementById("createTask")
            const objIdToEdit = event.target.id.split("--")[1]
            
            API.edit(objIdToEdit, "tasks").then(resp => {
                nameInputField.value = resp.name
                nameInputField.addEventListener("keypress", event => {
                    if (event.charCode === 13) {
                        event.preventDefault()
                        const updatedName = nameInputField.value
                        // API.update()
                    }
                })
            })
        }
    })
}

export {openTasksForm}