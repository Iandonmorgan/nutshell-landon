const eventListeners = {

  saveEvent() {
    const targetDomContainer = document.getElementById("container");

    targetDomContainer.addEventListener("click", () => {

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
      
      "userId": 1,
      "name": targetNameInput.value,
      "date": targetDateInput.value,
      "location": targetLocationInput.value,
      "address": targetAddressInput.value,
      "city": targetCityInput.value,
      "state": targetStateInput.value,
      "zipcode": targetZipInput.value
    }

  },
}