import renderHtmlEvents from "./domManagerEvents.js"
import API from "../data.js";

const eventListeners = {

  saveEvent() {
    const targetDomContainer = document.getElementById("eventsSubmitButton");

    targetDomContainer.addEventListener("click", () => {

      const targetUserId = document.getElementById("hiddenUserId");
      const targetNameInput = document.getElementById("nameInputEvents");
      const targetDateInput = document.getElementById("dateInputEvents");
      const targetLocationInput = document.getElementById("locationInputEvents");
      const targetAddressInput = document.getElementById("addressInputEvents");
      const targetCityInput = document.getElementById("cityInputEvents");
      const targetStateInput = document.getElementById("stateInputEvents");
      const targetZipInput = document.getElementById("zipInputEvents");
      const targetHiddenIdInput = document.getElementById("hiddenInputEvents");

      const eventsEntry = {
        "userId": parseInt(targetUserId.value),
        "name": targetNameInput.value,
        "date": targetDateInput.value,
        "location": targetLocationInput.value,
        "address": targetAddressInput.value,
        "city": targetCityInput.value,
        "state": targetStateInput.value,
        "zipCode": targetZipInput.value
      }

      if (targetHiddenIdInput.value === "") {

      API.save(eventsEntry, "events").then(() => API.get("events").then(renderHtmlEvents))
        .then(eventListeners.clearForm)

      } else {

        eventsEntry.id = parseInt(targetHiddenIdInput.value);
        API.update(eventsEntry, "events")
        .then(() => API.get("events").then(renderHtmlEvents))
        .then(eventListeners.clearForm)
      }
    })
  },
  editEvent() {
    const targetDom = document.getElementById("printLocationEvents");

    targetDom.addEventListener("click", event => {
      if (event.target.id.startsWith("editButtonEvents--")) {
        const eventToEdit = event.target.id.split("--")[1];

        eventListeners.updateEventFormFields(eventToEdit);

        const cancelButton = `<button type="button" id="cancelButtonEvents">Cancel Culture</button>`
        const targetButtonDiv = document.getElementById("buttonDivEvents");
        targetButtonDiv.innerHTML += cancelButton;

        targetButtonDiv.addEventListener("click", event => {
          
          if (event.target.id.startsWith("cancelButton")) {
            console.log("clicked cancel")
            eventListeners.clearForm();
            targetButtonDiv.innerHTML = `<button type="button" id="eventsSubmitButton">Submit to a Higher Power</button>`
            
          }
        })
      }
    })
  },
  updateEventFormFields(eventId) {
    const targetNameInput = document.getElementById("nameInputEvents");
    const targetDateInput = document.getElementById("dateInputEvents");
    const targetLocationInput = document.getElementById("locationInputEvents");
    const targetAddressInput = document.getElementById("addressInputEvents");
    const targetCityInput = document.getElementById("cityInputEvents");
    const targetStateInput = document.getElementById("stateInputEvents");
    const targetZipInput = document.getElementById("zipInputEvents");
    const targetHiddenIdInput = document.getElementById("hiddenInputEvents");

    API.get(`events/${eventId}`)
      .then(event => {
        targetHiddenIdInput.value = event.id;
        targetNameInput.value = event.name;
        targetDateInput.value = event.date;
        targetLocationInput.value = event.location;
        targetAddressInput.value = event.address;
        targetCityInput.value = event.city;
        targetStateInput.value = event.state;
        targetZipInput.value = event.zipCode;
      })
  },
  deleteEvent() {
    const targetDom = document.getElementById("printLocationEvents");

targetDom.addEventListener("click", event => {
  if(event.target.id.startsWith("deleteButtonEvents")) {
    const eventToDelete = event.target.id.split("--")[1];

    API.delete(eventToDelete, "events")
    .then(() => API.get("events").then(renderHtmlEvents))
    
  }
})
  },
  clearForm() {
    const targetNameInput = document.getElementById("nameInputEvents");
    const targetDateInput = document.getElementById("dateInputEvents");
    const targetLocationInput = document.getElementById("locationInputEvents");
    const targetAddressInput = document.getElementById("addressInputEvents");
    const targetCityInput = document.getElementById("cityInputEvents");
    const targetStateInput = document.getElementById("stateInputEvents");
    const targetZipInput = document.getElementById("zipInputEvents");
    const targetHiddenIdInput = document.getElementById("hiddenInputEvents");

    targetNameInput.value = ""
    targetDateInput.value = ""
    targetLocationInput.value = ""
    targetAddressInput.value = ""
    targetCityInput.value = ""
    targetStateInput.value = ""
    targetZipInput.value = ""
    targetHiddenIdInput.value = ""
  }
}

export default eventListeners;