// Here create factory object to be posted to /tasks in DB & factory HTML to 
// be added to the DOM when GET(ing) the tasks

// Bryan said to just set userId property to 1 for testing purposes, can make it dynamic later on.
const newTaskObj = (val1, val2) => {
    return {
            name: val1,
            deadline: val2,
            isComplete: false,
            userId: 1
        }
    
}

export {newTaskObj}