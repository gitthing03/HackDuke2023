let map;

const greenImg = document.createElement("img");
const yellowImg = document.createElement("img");
const grayImg = document.createElement("img");

greenImg.src = green;
// greenImg.style.width = "30%";
// greenImg.style.height = "30%";
// greenImg.style.marginLeft = "20rem";
// greenImg.style.marginTop = "10rem";
yellowImg.src = yellow;
// yellowImg.style.width = "30%";
// yellowImg.style.height = "30%";
// yellowImg.style.marginLeft = "20rem";
// yellowImg.style.marginTop = "10rem";
grayImg.src = gray;
// grayImg.style.width = "30%";
// grayImg.style.height = "30%";
// grayImg.style.marginLeft = "20rem";
// grayImg.style.marginTop = "10rem";

const {PinElement} = await google.maps.importLibrary("marker");
const glyphSvgPinElementGreen = new PinElement({
  glyph: greenImg,
  scale: 3.5
});

const glyphSvgPinElementYellow = new PinElement({
  glyph: yellowImg,
  scale: 3.5
});

const glyphSvgPinElementGray = new PinElement({
  glyph: grayImg,
  scale: 3.5
});

// Construct Google Maps view
async function initMap() {
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    // Center at Penn
    center: { lat: 36.00015, lng: -78.94090 },
    zoom: 19.5,
    mapId: '88f3fbf147f53b26'
  });
  // Import and create markers for boxes
  const {AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  const infoWindow = new InfoWindow();

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
      newBox.addListener("click", ({domEvent, latLng}) => {
        const {target} = domEvent;
        infoWindow.close();
        fetch(`/api/getcount/${data[box].id}`)
        .then(response => response.json())
        .then((data) =>  {
          newBox.content = createContent(data);
          infoWindow.setContent(`${data.title} - STOCK: ${data.stock} `);
          infoWindow.open(newBox.map, newBox);
        });
        // infoWindow.setContent(`${data[box].title} - ${updateStock(data[box].id)} `);
        // infoWindow.open(newBox.map, newBox);
      });
    }
  });
}
initMap();

// Specifies the "content" field of each marker
// Each marker contains a div of the box's data
function createContent(box) {
  if (box.stock > 10) return glyphSvgPinElementGreen.element;
  if (box.stock > 5) return glyphSvgPinElementYellow.element;
  return glyphSvgPinElementGray.element;
}


// Update the stock number for a specific marker based on ID
function updateStock(id) {
  fetch(`/api/getcount/${id}`)
  .then(response => response.json())
  .then((data) =>  {
    return data.stock;
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
setInterval(initMap, 15000);