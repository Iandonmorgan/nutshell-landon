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

  events.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
  console.log(events)

  const soonestToLatest = events.reverse();
  console.log(soonestToLatest);

  soonestToLatest.forEach(element => {
    targetDom.innerHTML += htmlEvent(element)
  });
}

export default renderHtmlEvents