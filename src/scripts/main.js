import messagesListeners from "./messages/messagesEventListeners.js";
import articleEventListeners from "./articles/articleEventListeners.js";
import API from "./data.js";

/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/
const loggedInUserId = 2;
messagesListeners.logInListener(loggedInUserId);
articleEventListeners.newsArticleEvents();