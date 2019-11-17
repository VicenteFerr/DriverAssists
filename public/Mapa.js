L.mapquest.key = 'tcTFFbkihkDTEXvDXEdDdWtmm4KuPaMj'
var posUtil = document.getElementById("PosUtil");
var latUtil;
var lngUtil;
var latMark;
var lngMark;
var fgDis = 0;
var map = L.mapquest.map('Mapa', {
  center: [38.7398332, -9.1346822],
  layers: L.mapquest.tileLayer('map'),
  zoom: 16
});


function gerarMapa(){

fg = L.featureGroup();
fgSaved = L.featureGroup();

map.on('click', function(e){
	fg.removeLayer(fg.getLayers()[0]);
    L.marker(e.latlng).addTo(fg);
    //L.popup().setLatLng(e.latlng).openOn(this);
    L.mapquest.geocoding().reverse(e.latlng, popUpLocal);    
  });
  map.addControl(L.mapquest.control());
  map.addLayer(fg);
  
}

function popUpLocal(error, response){
	L.popup().setContent(response.results[0].locations[0].latLng.lat+","+response.results[0].locations[0].latLng.lng);
	latMark = response.results[0].locations[0].latLng.lat;
	lngMark = response.results[0].locations[0].latLng.lng;
	console.log(response.results[0].locations[0].latLng.lat+","+response.results[0].locations[0].latLng.lng)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
	latUtil = position.coords.latitude;
	lngUtil = position.coords.longitude;
  	posUtil.innerHTML = "A sua Localização Atual: <br>Longitude: "+lngUtil+"<br>Latitude: "+latUtil;
}

function gerarMarker(markerPopupText) {
	var pc; 
	if (document.getElementById("RespostaRes").checked) {
		pc = '#3dcf36';
	}
	if (document.getElementById("RespostaMrc").checked) {
		pc = '#cf7536';
	}
	if (document.getElementById("RespostaOtr").checked) {
		pc = '#368fcf';
	}
	if (document.getElementById("RespostaHtl").checked) {
		pc = '#cf3936';
	}
    L.marker([ latMark, lngMark ], {
        icon : L.mapquest.icons.marker({
            primaryColor : pc,
            secondaryColor : pc,
            shadow : false,
            size : 'md'
        }),
        draggable : false
    }).bindPopup(markerPopupText).addTo(fgSaved);

    document.getElementById("nomeMarker").value = "";
    document.getElementById("RespostaRes").checked = false;
    document.getElementById("RespostaMrc").checked = false;	
	document.getElementById("RespostaOtr").checked = false;
    document.getElementById("RespostaHtl").checked = false; 
    console.log(fgSaved)
}

function disMarkers(){
	console.log(fgDis);
	if (fgDis==0) {
		map.addLayer(fgSaved);
		fgDis = 1;
	}else{
		map.removeLayer(fgSaved);
		fgDis = 0;
	}
}

function gerarRotas(){
	dir = MQ.routing.directions();

	dir.route({
	  locations: [
	    { latLng: { lat: latUtil, lng: lngUtil } },
	    { latLng: { lat: latMark, lng: lngMark } }
	  ]
	});

	map.addLayer(MQ.routing.routeLayer({
	  directions: dir,
	  fitBounds: true
	}));
}





window.onload=gerarMapa();
window.onload=getLocation();