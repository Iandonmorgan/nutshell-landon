const htmlEvent = eventEntry => {
  return `
  <div class = "eventOnDom">
  <input type="hidden" id="hidden--${eventEntry.userId}"/>
  <div>${eventEntry.name}</div>
  <div>${eventEntry.date}</div>
  <div>${eventEntry.location}</div>
  <div>${eventEntry.address}</div>
  <div>${eventEntry.city}, ${eventEntry.state}</div>
  <div>${eventEntry.zipCode}</div>
  <button type="button" id="editButtonEvents--${eventEntry.id}">Edit</button>
  <button type="button" id="deleteButtonEvents--${eventEntry.id}">Delete</button>
  </div>
  `;
};

const renderHtmlEvents = (events, activeId) => {
  const targetDom = document.getElementById("printLocationEvents");

  targetDom.innerHTML = "";

  events.sort(function(a, b) {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  events.forEach(element => {
    targetDom.innerHTML += htmlEvent(element);
  });

};

export default renderHtmlEvents;
