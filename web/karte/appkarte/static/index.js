let map;

// Construct Google Maps view
async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    // Center at Penn
    center: { lat: 36.00015, lng: -78.94090 },
    zoom: 19.5,
    mapId: '88f3fbf147f53b26'
  });
  // Import and create markers for boxes
  const {AdvancedMarkerElement} = await google.maps.importLibrary("marker");
  fetch("/api/getmarkers")
  .then(response => response.json())
  .then((data) =>  {
    for (const box of Object.keys(data)) {
      const newBox = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: {lat: parseFloat(data[box].lat), lng: parseFloat(data[box].long)},
        title: data[box].title,
        content: createContent(data[box])
      });
      newBox.addListener('click', ({domEvent, latLng}) => {
        const {target} = domEvent;
        // Handle event
      });
    }
  });
}
initMap();

// Specifies the "content" field of each marker
// Each marker contains a div of the box's data
function createContent(box) {
  const content = document.createElement("div");
  content.innerHTML = `
    <div id=${box.id}stock>${box.title} - ${box.stock}</div>`;
  return content;
}

// Update the stock number for a specific marker based on ID
function updateStock(id) {
  fetch(`/api/getcount/${id}`)
  .then(response => response.json())
  .then((data) =>  {
    document.getElementById(`${id}stock`).innerHTML = `${data["title"]} - ${data["stock"]}`;
  });
}

// Update the stock number for every marker
function updateAllBoxes() {
  fetch(`/api/getall`)
  .then(response => response.json())
  .then((data) => {
    for (const id of Object.keys(data)) {
      updateStock(id);
    }
  });
}

// Update every box periodically
setInterval(updateAllBoxes, 3000);