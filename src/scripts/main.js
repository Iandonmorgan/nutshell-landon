import {openTasksForm} from "./tasks/events.js"

/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

// API.get("messages").then(objects => console.log(objects));
// API.get("events").then(objects => console.log(objects));
// API.get("articles").then(objects => console.log(objects));
// API.get("friendships").then(objects => console.log(objects));
// API.get("tasks").then(objects => console.log(objects));
// API.get("users").then(objects => console.log(objects));

// adding dynamic tasks form to DOM when 'Tasks' button clicked - Tyler
openTasksForm()
