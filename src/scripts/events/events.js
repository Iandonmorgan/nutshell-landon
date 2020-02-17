import API from "../data.js";
import renderHtmlEvents from "./domManagerEvents.js"
import eventListeners from "./eventListeners.js"

// eventListeners.saveEvent();
eventListeners.editEvent();
eventListeners.deleteEvent();
eventListeners.newEvent();

API.get("events")
  .then(renderHtmlEvents)