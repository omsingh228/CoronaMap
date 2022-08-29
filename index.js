function updateMap() {
    fetch("/data.json")
        .then(response => response.json()) //Json Promise...
        .then(rsp => {
            console.log(rsp.data);
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;


                //To make marker color light to dark as cases increase
                let cases = element.infected;
                if (cases > 128) {
                    markerColor = `rgb(0,128,0)`
                }
                else {
                    markerColor = `rgb(0,${cases.infected},0)`
                }
                //Mark on map


                //Copied from  https://docs.mapbox.com/mapbox-gl-js/example/drag-a-marker/ (Draggable-Marker)
                const marker = new mapboxgl.Marker({
                    // draggable: true
                    draggable: false, //Made changes
                    color: markerColor
                })
                    // .setLngLat([0, 0])
                    .setLngLat([element.longitude, element.latitude]) //Made changes
                    .addTo(map);
            });
        })

    
    }
//     map.on('load', () => {
//         map.addSource('states', {
//         'type': 'geojson',
//         'data': 'data.json'
//         });
// })

setInterval(() => {
    updateMap();
}, 20000);
