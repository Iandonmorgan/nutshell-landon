import API from "../data.js"
import {renderForm} from "./dom.js"
import {newTaskObj, taskListFactory, checkedTaskObj} from "./factory.js"

let activeId = ""

// STRETCH GOALS: 1) When save task btn clicked, remove text from the input fields 

const taskBtn = document.querySelector("#tasks")
const hiddenVal = document.querySelector("#hidden-input")
const taskListContainer = document.querySelector("#tasks-list")

// This function runs when 'Tasks' btn is clicked, and then opens up all other functions to run afterwards
const openTasksForm = (id) => {
    taskBtn.addEventListener("click", () => {
        activeId = id;
        // hiddenVal.value = 1;
        renderForm();
        addSaveFunctionality();
        addViewTasksFunctionality();
        addCheckboxFunctionality();
        addDeleteFunctionality();
        addEditFunctionality();
        onKeypress();
    })
}

const addSaveFunctionality = () => {
    // Line 22 makes sure 'Tasks' button has been clicked to open form and access save btn
    // if (parseInt(hiddenVal.value) === "") {
        const saveBtn = document.querySelector("#submitTask")

        saveBtn.addEventListener("click", event => {
            let taskVal = document.querySelector("#createTask").value
            let dateVal = document.querySelector("#completionDate").value
        
            const newObj = newTaskObj(taskVal, dateVal, activeId)
        
            API.save(newObj, "tasks")
        })
    // }
}

// GET all 'tasks' objs in DB, finds only those whose 'isComplete' property value is false,
// then converts them to HTML and adds to DOM.
const addViewTasksFunctionality = () => {
    const viewTasksBtn = document.querySelector("#viewTasks")

    viewTasksBtn.addEventListener("click", () => {
        taskListContainer.innerHTML = ""
        
        API.get("tasks").then(entries => entries.forEach(entry => {
            if (activeId === entry.userId && entry.isComplete === false) {
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

// TODO: Add a confirm message on delete btn click
// Deletes task from DB and task container in DOM on 'Delete' btn click
const addDeleteFunctionality = () => {
    taskListContainer.addEventListener("click", event => {
        if (event.target.id.startsWith("deleteBtn--")) {
            const objToDelete = event.target.id.split("--")[1]
            
            API.delete(objToDelete, "tasks").then(() => {
                taskListContainer.innerHTML = ""
                API.get("tasks").then(entries => entries.forEach(entry => {
                    if (activeId === entry.userId && entry.isComplete === false) {
                        taskListContainer.innerHTML += taskListFactory(entry)
                    }
                }))
            })
        }
    })
}
// Event listener for when task name clicked on, DOM user interface repopulates with the task being updated.
const addEditFunctionality = () => {
    taskListContainer.addEventListener("click", event => {
        if (event.target.id.startsWith("editName--")) {
            const nameInputField = document.getElementById("createTask")
            const dateInputField = document.getElementById("completionDate")
            const objIdToEdit = event.target.id.split("--")[1]

            // Gets the object from DB via id, then adds certain properties back into the DOM form fields.
            API.edit(objIdToEdit, "tasks").then(resp => {
                nameInputField.value = resp.name
                dateInputField.value = resp.deadline
                const hiddenInpField = document.getElementById("hidden-input")
                hiddenInpField.value = resp.id                
            })
        }
    })
}

const onKeypress = () => {
    const nameInputField = document.getElementById("createTask")
    const dateInputField = document.getElementById("completionDate")


    nameInputField.addEventListener("keypress", event => {
        if (event.charCode === 13) {
            event.preventDefault()
            const updatedName = nameInputField.value
            const updatedDate = dateInputField.value
            const hiddenInpField = document.getElementById("hidden-input")
            const hiddenInpFieldId = hiddenInpField.value
            // The hiddenInpFieldId argument is the id that allows API.update() to find the matching obj in DB to be updated.
            // The activeId argument is defined in main.js, and that is currently a static value representing a logged-in user's fk in the DB.
            const updatedObj = newTaskObj(updatedName, updatedDate, activeId, hiddenInpFieldId)
            
            API.update(updatedObj, "tasks")

            // API.update(updatedObj, "tasks")
        }
    })
}

export {openTasksForm, activeId}