import API from "./data.js";
import chatMessages from "./messages/domManagerMessages.js"

const activeUserId = 5;

/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

chatMessages.logInListener();