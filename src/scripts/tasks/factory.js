// Here create factory object to be posted to /tasks in DB & factory HTML to 
// be added to the DOM when GET(ing) the tasks

// Need to figure out what to input for userId property
const newTaskObj = (obj) => {
    return `
        {
            "userId": ${obj.},
            "name": "${obj.name}",
            "deadline": "${obj.date}",
            "isComplete": false
        }
    `
}