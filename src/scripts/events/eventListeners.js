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
      const targetAddressInput = document.getElementById("adressInputEvents");
      const targetCityInput = document.getElementById("cityInputEvents");
      const targetStateInput = document.getElementById("stateInputEvents");
      const targetZipInput = document.getElementById("zipInputEvents");
      const targetHiddenIdInput = document.getElementById("hiddenInputEvents");

    })

    const eventsEntry = {
      "userId": parseInt(targetUserId.value),
      "name": targetNameInput.value,
      "date": targetDateInput.value,
      "location": targetLocationInput.value,
      "address": targetAddressInput.value,
      "city": targetCityInput.value,
      "state": targetStateInput.value,
      "zipcode": targetZipInput.value
    }

    // API.save(eventsEntry, events)
    // .then(() => API.get(events).then)

    API.save(eventsEntry, events).then(() => API.get().then(renderHtmlEvents))
      .then(eventListeners.clearForm)

  },
  clearForm() {
    const targetNameInput = document.getElementById("nameInputEvents");
      const targetDateInput = document.getElementById("dateInputEvents");
      const targetLocationInput = document.getElementById("locationInputEvents");
      const targetAddressInput = document.getElementById("adressInputEvents");
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
      targetHiddenIdInput = ""
  }
}