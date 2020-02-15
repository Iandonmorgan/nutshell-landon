import API from "./data.js";

/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

const message = "Time to build an application that gives you all the information you need in a Nutshell"

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`

console.log(message)

// TEST API METHODS WHEN YOU START WRITING CODE - ANY BUGS SHOULD
// BE ADDRESSED BY SUBMITTING PULL REQUEST TO UPDATE DATA.JS
// EXAMPLE:
// API.get("messages").then(objects => console.log(objects));
// API.get("events").then(objects => console.log(objects));
// API.get("articles").then(objects => console.log(objects));
// API.get("friendships").then(objects => console.log(objects));
// API.get("tasks").then(objects => console.log(objects));
// API.get("users").then(objects => console.log(objects));


// API.delete(2, "users");

const michaelObject = {
    "id": "2",
    "username": "Michael",
    "email": "michael@nss.com",
    "photoURL": "https://avatars1.githubusercontent.com/u/59578667?s=460&v=4"
}

// API.save(michaelObject, "users");
// API.get("users/2").then(object => console.log(object))
// const michaelObjectId = michaelObject.id

// console.log(michaelObjectId);

API.update(michaelObject, "users");