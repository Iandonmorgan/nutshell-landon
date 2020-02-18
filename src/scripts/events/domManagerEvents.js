const htmlEvent = (eventEntry) => {
  return `
  <input type="hidden" id="hidden--${eventEntry.userId}"/>
  <div>${eventEntry.name}</div>
  <div>${eventEntry.date}</div>
  <div>${eventEntry.location}</div>
  <div>${eventEntry.address}</div>
  <div>${eventEntry.city}, ${eventEntry.state}</div>
  <div>${eventEntry.zipCode}</div>
  <button type="button" id="editButtonEvents--${eventEntry.id}">Edit</button>
  <button type="button" id="deleteButtonEvents--${eventEntry.id}">Delete</button>
  `
};

const renderHtmlEvents = (events) => {
  const targetDom = document.getElementById("printLocationEvents");

  targetDom.innerHTML = "";
  console.log(events)

  events.sort(function (a, b) {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });

  const soonestToLatest = events.reverse();

  soonestToLatest.forEach(element => {
    targetDom.innerHTML += htmlEvent(element)
  });
};

export default renderHtmlEvents