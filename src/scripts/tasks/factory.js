// Creates new objs, one for when in save mode, one for edit mode. idVal is hiddenInpId for edit mode.
const newTaskObj = (val1, val2, activeId, idVal) => {
    if (idVal === undefined) {
        return {
                name: val1,
                deadline: val2,
                isComplete: false,
                userId: activeId
            }
    } else {
        return {
            id: parseInt(idVal),
            name: val1,
            deadline: val2,
            isComplete: false,
            userId: activeId
        }
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

export {newTaskObj, taskListFactory}