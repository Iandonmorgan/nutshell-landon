import API from "./data.js";
import renderHtmlEvents from "./events/domManagerEvents.js"
import eventListenersEvents from "./events/eventListeners.js"
/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/
const activeId = 1;

eventListenersEvents.editEvent();
eventListenersEvents.deleteEvent();
eventListenersEvents.newEvents();

API.get("events")
  .then(renderHtmlEvents)

export default activeId;