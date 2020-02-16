const htmlEvent = (eventEntry) => {
  return `
  <div>${eventEntry.name}</div>
  <div>${eventEntry.date}</div>
  <div>${eventEntry.location}</div>
  <div>${eventEntry.address}</div>
  <div>${eventEntry.city}, ${eventEntry.state}</div>
  <div>${eventEntry.zipCode}</div>
  `
};

const renderHtmlEvents = (events) => {
  const targetDom = document.getElementById("printLocationEvents");

  targetDom.innerHTML = "";

  events.forEach(event => {
  targetDom.innerHTML += htmlEvent(event)    
  });
}

export default renderHtmlEvents