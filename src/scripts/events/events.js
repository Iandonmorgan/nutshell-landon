import API from "../data.js";
import renderHtmlEvents from "./domManagerEvents.js"
import eventListeners from "./eventListeners.js"

// eventListeners.saveEvent();

API.get("events")
  .then(renderHtmlEvents)
  
eventListeners.editEvent();
eventListeners.deleteEvent();
eventListeners.newEvent();
