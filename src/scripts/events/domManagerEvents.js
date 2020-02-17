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

  const newArray = events.map(object =>  object.date);
  console.log(newArray);

  
  
  
  

  // for(let i = 0 ; i < events.length ; i++) {
  //   const date = Date.parse(events[i].date)
  //   if (
  // }
  // sortedArray.forEach(event => {
  // targetDom.innerHTML += htmlEvent(event)    
  // });
}

export default renderHtmlEvents