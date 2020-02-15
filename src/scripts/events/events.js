import API from "../data.js";
import renderHtmlEvents from "./domManagerEvents.js"

API.get("events")
.then(renderHtmlEvents)