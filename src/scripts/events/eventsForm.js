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

export default eventsFormHtml