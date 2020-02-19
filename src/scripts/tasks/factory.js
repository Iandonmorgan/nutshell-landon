// Here create factory object to be posted to /tasks in DB & factory HTML to 
// be added to the DOM when GET(ing) the tasks

// Bryan said to just set userId property to 1 for testing purposes, can make it dynamic later on.



const newTaskObj = (val1, val2, idVal) => {
    if (idVal === undefined) {
        return {
                name: val1,
                deadline: val2,
                isComplete: false,
                userId: 1
            }
    } else {
        return {
            id: parseInt(idVal),
            name: val1,
            deadline: val2,
            isComplete: false,
            userId: 1
        }
    }
}

const checkedTaskObj = (val1, val2) => {
    return {
        name: val1,
        deadline: val2,
        isComplete: true,
        userId: 1
    }   
}

const taskListFactory = (obj) => {
    return `
        <section id="containerTasks--${obj.id}">
            <h2 id="editName--${obj.id}">${obj.name}</h2>
            <h2 id="task-date">${obj.deadline}</h2>
            <input type="checkbox" name="completed" value="Complete" id="checkbox--${obj.id}">
            <label for="completed">Complete</label><br />
            <button id="deleteBtn--${obj.id}">Delete Task</button>
        </section>
    `
}

export {newTaskObj, taskListFactory, checkedTaskObj}