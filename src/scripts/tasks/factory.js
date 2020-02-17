// Here create factory object to be posted to /tasks in DB & factory HTML to 
// be added to the DOM when GET(ing) the tasks

// Need to figure out what to input for userId property
const newTaskObj = (val1, val2) => {
    return `
        {
            "name": "${val1}",
            "deadline": "${val2}",
            "isComplete": false
        }
    `
}

export {newTaskObj}