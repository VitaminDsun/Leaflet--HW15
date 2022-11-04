console.log("hello");


// Create Url endpoints
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

let tetUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

d3.json(url).then(function (data) {
    createFeatures(data.features);

    // Create a legend
    let legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let limits = [0, 10, 30, 50, 70, 90];
      let colors = ["red","green","orange","gold","yellow","lightgreen"];
  
      for (i = 0; i < limits.length; i++) {
        div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
        limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
      }
      return div;
    };
  
    legend.addTo(map);
  });
  
  function createFeatures(earthquakeData) {
  
    // Determine Size by Magnitude of the Earthquake
    function markerSize(magnitude) {
      if (magnitude === 0) {
        return 1;
      }
      return magnitude * 5;
    }
  
    // color based by Magnitude of the Earthquake
    function chooseColor(depth) {
        if (depth <= 10) return "#green";
        else if (depth <= 30) return "#orange";
        else if (depth <= 60) return "#gold";
        else if (depth <= 90) return "#yellow";
        else return "#lightgreen";
    }
    }
  
     // info for the styleinfo for each the Earthquake
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: chooseColor(feature.geometry.coordinates[2]),
        color: "black",
        radius: markerSize(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }

    function     onEachFeature: function(feature, layer) {
        layer.bindPopup('magnitude: '+feature.properties.mag+"<br>Location: " + feature.properties.place)}
    }).addTo(earthquakes)
    eqs.addTo(eMap)
   }


    // GeoJSON layer
    let earthquakes = L.geoJSON(earthquakeData, {
      pointToLayer: function (feature, layer) {
        return L.circleMarker(layer);
      },
      style: styleInfo,
      onEachFeature: onEachFeature
    });
  
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    //base layers.
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
  
    // baseMaps object.
    let baseMaps = {
      "Street Map": street,
      "Topographic Map": topo
    };
  
    //overlay object.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create streetmap/earthquakes layers.
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [street, earthquakes]
    });
  
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }










// Create Base layer
let tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.opentopomap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let limits = [0, 10, 30, 50, 70, 90];
    let colors = ["lightgreen","green","yellow","gold","orange","red"];

    for (i = 0; i < limits.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
      limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
    }
    return div;
};

legend.addTo(map);
});
