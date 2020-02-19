import eventListenersEvents from "./events/eventListeners.js"
import messagesListeners from "./messages/messagesEventListeners.js";
import articleEventListeners from "./articles/articleEventListeners.js";
import API from "./data.js";
import userRegistration from "./userRegistration/userRegDomManager.js";

/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

userRegistration.inputFields();
