import renderHtmlEvents from "./domManagerEvents.js";
import eventsFormHtml from "./eventsForm.js";
import API from "../data.js";

const activeId = 3;

const eventListenersEvents = {

  getAndPrintUserEvents() {
    let renderArray = [];

    API.get("events").then(events => {
      events.filter(object => {
        if (object.userId === activeId) {
          renderArray.push(object);
        }
        renderHtmlEvents(renderArray);
      });
      const firstEventOnDom = document.querySelector(".eventOnDom");
      firstEventOnDom.classList.add("firstEvent");
    });
  },

  printForm() {
    const targetFormLocation = document.getElementById("entryFormEvents");

    targetFormLocation.innerHTML = eventsFormHtml;
    eventListenersEvents.saveEvent();
    eventListenersEvents.cancelEvent();
  },

  printEvents() {
    const targetHiddenIdInput = document.getElementById("hiddenUserId");
    targetHiddenIdInput.value = activeId;
    eventListenersEvents.editEvent();
    eventListenersEvents.deleteEvent();
    eventListenersEvents.newEvents();

    eventListenersEvents.getAndPrintUserEvents();
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
      const targetLocationInput = document.getElementById(
        "locationInputEvents"
      );
      const targetAddressInput = document.getElementById("addressInputEvents");
      const targetCityInput = document.getElementById("cityInputEvents");
      const targetStateInput = document.getElementById("stateInputEvents");
      const targetZipInput = document.getElementById("zipInputEvents");
      const targetHiddenIdInput = document.getElementById("hiddenInputEvents");

      const eventsEntry = {
        userId: parseInt(targetUserId.value),
        name: targetNameInput.value,
        date: targetDateInput.value,
        location: targetLocationInput.value,
        address: targetAddressInput.value,
        city: targetCityInput.value,
        state: targetStateInput.value,
        zipCode: targetZipInput.value
      };

      if (targetNameInput.value === "") {
        window.alert("pretty please Name your event");
      } else if (targetDateInput.value === "") {
        window.alert("pretty please add a Date");
      } else if (targetLocationInput.value === "") {
        window.alert("pretty please add a Location");
      } else if (targetHiddenIdInput.value === "") {
        API.save(eventsEntry, "events")
          .then(eventListenersEvents.getAndPrintUserEvents())
          .then(eventListenersEvents.clearForm);
      } else {
        eventsEntry.id = parseInt(targetHiddenIdInput.value);
        API.update(eventsEntry, "events")
          .then(eventListenersEvents.getAndPrintUserEvents())
          .then(eventListenersEvents.clearForm);
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

        eventListenersEvents.printForm;
        eventListenersEvents.updateEventFormFields(eventToEdit);
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

    API.get(`events/${eventId}`).then(event => {
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

        const alert = confirm("Are you sure you want to delete this event?");

        if (alert) {
          API.delete(eventToDelete, "events").then(
            eventListenersEvents.getAndPrintUserEvents()
          );
        }
      }
    });
  },

  clearForm() {
    const targetHiddenIdInput = document.getElementById("hiddenInputEvents");

    targetHiddenIdInput.value = "";

    const targetDom = document.getElementById("entryFormEvents");
    targetDom.innerHTML = `<button type="button" id="newEventButton">New Event</button>`;
    eventListenersEvents.newEvents();
  }
};

export default eventListenersEvents;
