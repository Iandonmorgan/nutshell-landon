import API from "../data.js"
import {renderForm} from "./dom.js"
import {newTaskObj, taskListFactory} from "./factory.js"

let activeId = "";

// TODO: When save task btn clicked, remove text from the input fields 
// TODO: Add a confirm message on delete btn click


// This function runs when 'Tasks' btn is clicked, and then opens up all other functions to run afterwards
const openTasksForm = (id) => {
    const taskBtn = document.getElementById("tasks");
    taskBtn.addEventListener("click", () => {
        // value of the id param is passed in in main.js... And multiple functions in this scope use activeId
        activeId = id;
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
    const saveBtn = document.querySelector("#submitTask")
    
    saveBtn.addEventListener("click", event => {
        let taskVal = document.querySelector("#createTask").value
        let dateVal = document.querySelector("#completionDate").value
        
        const newObj = newTaskObj(taskVal, dateVal, activeId)
        
        API.save(newObj, "tasks")
    })
}

// GETs 'tasks' objs in DB. Finds only those whose 'isComplete' property value is false, and whose 'userId' property value matches
// the logged-in user's id value. Then converts these objs to HTML and adds to DOM.
const addViewTasksFunctionality = () => {
    const viewTasksBtn = document.querySelector("#viewTasks")
    const taskListContainer = document.querySelector("#tasks-list");
    
    viewTasksBtn.addEventListener("click", () => {
        taskListContainer.innerHTML = ""
        
        API.get("tasks").then(entries => entries.forEach(entry => {
            if (activeId === entry.userId && entry.isComplete === false) {
                taskListContainer.innerHTML += taskListFactory(entry)
            }
        }))
    })
}

// Changes 'isComplete' property value in the 'tasks' DB array from 'false' to 'true' for whichever item's checkbox is clicked
const addCheckboxFunctionality = () => {
    const taskListContainer = document.querySelector("#tasks-list");
    taskListContainer.addEventListener("click", event => {
        if (event.target.id.startsWith("checkbox--")) {
            const objToEditId = event.target.id.split("--")[1]
            
            API.edit(objToEditId, "tasks").then(resp => {
                resp.isComplete = true;
                API.update(resp, "tasks")
            })
        }
    })
}

// Deletes task from DB and from task container in DOM on 'Delete' btn click, then re-displays all remaining uncompleted tasks for
// the matching logged-in user (activeId).
const addDeleteFunctionality = () => {
    const taskListContainer = document.querySelector("#tasks-list");
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
    const taskListContainer = document.querySelector("#tasks-list");
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

// This was my white whale today as I had to remove this keypress event listener from my edit click event function, and then create a 
// separate function to run the keypress event after the edit event had triggered. Now when I edit the 3rd, 4th, and 5th task, the func
// is not storing all the previous tasks and changing all their values to the current tasks updated value. Still don't really understand
// what was happening though...
const onKeypress = () => {
    const nameInputField = document.getElementById("createTask")
    const dateInputField = document.getElementById("completionDate")


    nameInputField.addEventListener("keypress", event => {
        if (event.charCode === 13) {
            // TODO: For some reason I can't edit the date input.. not MVP goal but still weird...
            const updatedName = nameInputField.value
            const updatedDate = dateInputField.value
            const hiddenInpField = document.getElementById("hidden-input")
            const hiddenInpFieldId = hiddenInpField.value
            // The hiddenInpFieldId argument is the id that allows API.update() to find the matching obj in DB to be updated.
            // The activeId argument is defined in main.js, and that is currently a static value representing a logged-in user's fk in the DB.
            const updatedObj = newTaskObj(updatedName, updatedDate, activeId, hiddenInpFieldId)
            
            API.update(updatedObj, "tasks")
        }
    })
}

export default openTasksForm