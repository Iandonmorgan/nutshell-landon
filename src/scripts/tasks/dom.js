const tasksForm = document.querySelector("#tasks-form")

// Making dynamic form to create/edit tasks
const renderForm = () => {
    return tasksForm.innerHTML = `
        <form>
            <label for="createTask">Task Name</label>
            <input type="text" id="createTask">
        
            <label for="completionDate">Expected Completion Date</label>
            <input type="date" id="completionDate">
        </form>
        <button id="submitTask">Save Task</button>
    `
}

export {renderForm}