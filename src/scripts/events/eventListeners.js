import renderHtmlEvents from "./domManagerEvents.js"
import API from "../data.js";

const activeId = 3;

const eventListenersEvents = {
  
  getAndPrintUserEvents() {
    let renderArray = [];

    API.get("events")
      .then(events => {
        events.map(object => {
          if (object.userId === activeId) {
            console.log("here it is", object)

            renderArray.push(object)
          }
        }).then(renderHtmlEvents(renderArray))
      })
  },

  printForm() {
    const targetFormLocation = document.getElementById("entryFormEvents");
    const eventsFormHtml = `
      <div id="populateForm">
        
        <div id="nameInputDivEvents">
          <label id="nameLabelEvents" for="nameLabelEvents">Event: </label>
          <input id="nameInputEvents" type="text" name="nameInputEvents">
        </div>
        <div id="dateInputDivEvents">
          <label id="dateLabelEvents" for="dateLabelEvents"></label>
          <input id="dateInputEvents" type="date" name="dateInputEvents">
        </div>
        <div id="locationInputDivEvents">
          <label id="locationLabelEvents" for="locationLabelEvents">Location: </label>
          <input id="locationInputEvents" type="text" name="locationInputEvents">
        </div>
        <div id="addressInputDivEvents">
          <label id="addressLabelEvents" for="addressLabelEvents">Street Address: </label>
          <input id="addressInputEvents" type="text" name="addressInputEvents">
        </div>
        <div id="cityInputDivEvents">
          <label id="cityLabelEvents" for="cityLabelEvents">City: </label>
          <input id="cityInputEvents" type="text" name="cityInputEvents">
        </div>
        <div id="stateInputDivEvents">
          <label id="stateLabelEvents" for="stateLabelEvents">State: </label>
          <input id="stateInputEvents" type="text" name="stateInputEvents" maxlength=2>
        </div>
        <div id="zipInputDivEvents">
          <label id="zipLabelEvents" for="zipLabelEvents">Zip Code: </label>
          <input id="zipInputEvents" type="text" name="zipInputEvents">
        </div>
        <div id="buttonDivEvents">
          <button type="button" id="eventsSubmitButton">Submit to a Higher Power</button>
          <button type="button" id="cancelButtonEvents">Cancel Culture</button>
        </div>
      </div>
    </div>
`
    targetFormLocation.innerHTML = eventsFormHtml;
    eventListenersEvents.saveEvent();
    eventListenersEvents.cancelEvent();
  },

  printEvents() {
    const targetHiddenIdInput = document.getElementById("hiddenUserId");
    targetHiddenIdInput.value = activeId
    eventListenersEvents.editEvent();
    eventListenersEvents.deleteEvent();
    eventListenersEvents.newEvents();

    API.get("events")
    .then(eventListenersEvents.getAndPrintUserEvents())
  },

  newEvents() {
    const targetNewEventButton = document.getElementById("newEventButton");

    targetNewEventButton.addEventListener("click", () => {
      eventListenersEvents.printForm();
    });
  },
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
      };

      if (targetNameInput.value === "") {
        window.alert("pretty please Name your event")
      } else if (targetDateInput.value === "") {
        window.alert("pretty please add a Date")
      } else if (targetLocationInput.value === "") {
        window.alert("pretty please add a Location")
      } else if (targetHiddenIdInput.value === "") {

        API.save(eventsEntry, "events").then(eventListenersEvents.getAndPrintUserEvents())
          .then(eventListenersEvents.clearForm)

      } else {

        eventsEntry.id = parseInt(targetHiddenIdInput.value);
        API.update(eventsEntry, "events")
          .then(eventListenersEvents.getAndPrintUserEvents())
          .then(eventListenersEvents.clearForm)
      }
    });
  },

  cancelEvent() {
    const targetButtonDiv = document.getElementById("buttonDivEvents");

    targetButtonDiv.addEventListener("click", event => {

      if (event.target.id.startsWith("cancelButton")) {
        eventListenersEvents.clearForm();
      }
    });
  },
  editEvent() {

    const targetDom = document.getElementById("printLocationEvents");

    targetDom.addEventListener("click", event => {
      if (event.target.id.startsWith("editButtonEvents--")) {

        eventListenersEvents.printForm();
        const eventToEdit = event.target.id.split("--")[1];

        eventListenersEvents.updateEventFormFields(eventToEdit);

        eventListenersEvents.printForm
        eventListenersEvents.updateEventFormFields(eventToEdit)
      }
    });
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
      });
  },

  deleteEvent() {
    const targetDom = document.getElementById("printLocationEvents");

    targetDom.addEventListener("click", event => {
      if (event.target.id.startsWith("deleteButtonEvents")) {
        const eventToDelete = event.target.id.split("--")[1];

        const alert = confirm("Are you sure you want to delete this event?")

        if (alert) {

          API.delete(eventToDelete, "events")
            .then(eventListenersEvents.getAndPrintUserEvents())
        }
      }
    });
  },

  clearForm() {
    const targetHiddenIdInput = document.getElementById("hiddenInputEvents");

    targetHiddenIdInput.value = ""

    const targetDom = document.getElementById("entryFormEvents");
    targetDom.innerHTML = `<button type="button" id="newEventButton">New Event</button>`
    eventListenersEvents.newEvents();
  }
};

export default eventListenersEvents;