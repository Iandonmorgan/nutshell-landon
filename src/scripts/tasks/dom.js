const tasksForm = document.querySelector("#tasks-form")

// Making dynamic form to create/edit tasks
const renderForm = () => {
    return tasksForm.innerHTML = `
        <form>
            <label for="createTask">Create a Task</label>
            <input type="text" id="createTask">
        
            <label for="completionDate">Expected Completion Date</label>
            <input type="date" id="completionDate">
        </form>
        <button id="submitTask">Save Task</button>
    `
}
// I think this needs to be exported and imported to main.js
export {renderForm}