var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
  },

  pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
//'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA'
//'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamdpbHBhbGFjaW9zIiwiYSI6ImNqYW1vdTIzNzRldG4yd3A3OTU2dmxpZ2IifQ.VhGDMhzfMAndfDrZ9QkFeg'
//'https://api.mapbox.com/styles/v1/wproject/cjajd62tnapl22rmtyu3y8qgp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3Byb2plY3QiLCJhIjoiY2phamN3MnVyM2ZtdzMzbG9nNnhtcGR4dyJ9.DnsM2TgtG5sg_dQZrcGzfA'

    L.tileLayer('https://api.mapbox.com/styles/v1/wproject/cjajd62tnapl22rmtyu3y8qgp/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid3Byb2plY3QiLCJhIjoiY2phamN3MnVyM2ZtdzMzbG9nNnhtcGR4dyJ9.DnsM2TgtG5sg_dQZrcGzfA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(miMapa);

    app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);

    miMapa.on('click', function(evento){
      var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
      app.pintaMarcador(evento.latlng, texto, miMapa);
    });
  },

  pintaMarcador: function(latlng, texto, mapa){
    var marcador = L.marker(latlng).addTo(mapa);
    marcador.bindPopup(texto).openPopup();
  },

  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code + ': ' + error.message);
  }

};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();
  }, false);
}
