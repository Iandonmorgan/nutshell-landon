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

  events.sort(function(a, b) {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  }).reverse();
  
  console.log(events)

  const soonestToLatest = events.reverse();
  console.log(soonestToLatest);

  soonestToLatest.forEach(element => {
    targetDom.innerHTML += htmlEvent(element)
  });

  // const newArray = events.map(function(object) {return `[${object.date}, ${object.id}]`}).sort();
  // console.log(newArray);
  
  // newArray.forEach(element => {
  //   events.forEach(object => {
  //     if (object.date === element.date) {
  //       targetDom.innerHTML += htmlEvent(object);
  //     }
  //   })
  // });








  // for(let i = 0 ; i < events.length ; i++) {
  //   const date = Date.parse(events[i].date)
  //   if (
  // }
  // sortedArray.forEach(event => {
  // targetDom.innerHTML += htmlEvent(event)    
  // });
}

export default renderHtmlEvents