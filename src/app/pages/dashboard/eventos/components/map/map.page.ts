import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker, Polyline } from '@capacitor/google-maps';
import { LoadingController, ModalController } from '@ionic/angular';
import { Evento } from 'src/app/shared/repos/evento.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @Input() visor:boolean = false;
  @Input() evento?:Evento
  apiKey = environment.map;

  mapRef: any;
  
  newMap!:GoogleMap;
  marker!:string;
  markerSelected?:any;
  lineId!:string;
  
    constructor(
      private modal:ModalController,
      private loading:LoadingController,
      private genericService:GenericService
    ) { }
  
    ngOnInit() {
      this.initMap()
    }
  
  coords: any
    async initMap(){
      const load = await this.loading.create({
        animated:true,
        spinner: 'dots',
        translucent:true,
        message:'Cargando el mapa...'
      });
      await load.present();
      if( document.getElementById('map')){
        this.mapRef =  document.getElementById('map');
      }
      if(!this.visor){
       const {coords} = await Geolocation.getCurrentPosition();
       this.coords = coords
      }else{
        if(this.evento)
        this.coords = {latitude:this.evento.mapLat,longitude:this.evento.mapLong};
      }
      
      this.newMap = await GoogleMap.create({
        id: 'my-map', // Unique identifier for this map instance
        element: this.mapRef, // reference to the capacitor-google-map element
        apiKey: this.apiKey, // Your Google Maps API Key
        config: {
          center: {
            // The initial position to be rendered by the map
            lat: this.coords.latitude,
            lng: this.coords.longitude,
          },
          streetViewControl:!this.visor,
          zoom: 18, // The initial zoom level to be rendered by the map
          fullscreenControl:false,
          mapTypeControl:false
        },
      });
 
      if(this.visor){
        this.marker = await this.createMarker(this.coords);
        this.makers.push(this.marker)
        this.markerSelected = this.coords;
      }
        
      if(!this.visor){
        this.newMap.setOnMapClickListener( async (coords) => {
          this.newMap.removeMarker(this.marker)
          this.marker = await this.createMarker(coords);
          this.markerSelected=coords;
        })
      }
      
      await load.dismiss();
    }
  
  
    async createPolyline(coords:any){
      const line:Polyline ={
        strokeColor:"red",
        path:[
          {
            lat: coords.latitude,
            lng: coords.longitude,
          },
          {
            lat: coords.latitude-0.01,
            lng: coords.longitude,
          },
        ],
        geodesic:false,
        strokeWeight:5
      }
    const polilyne = await this.newMap.addPolylines([line])
    
      
    }
  
    async createMarker(coords:any){
     const marker =  await this.newMap.addMarker({
      coordinate: {
        lat: coords.latitude,
        lng: coords.longitude,
      },
      });
      return marker;
    }
  
    makers: string[] =[]
    async getRoute(origin:any,destination:any) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      }, async (response:any, status:any)  => {
        if (status === google.maps.DirectionsStatus.OK) {
          const coordenadas = [];
          for(const cords of response.routes[0].overview_path){
            coordenadas.push(
              {
                lat: cords.lat(),
                lng: cords.lng(),
              },
            )
          }
         const a = await this.newMap.addPolylines([{
          strokeColor:"red",
          path:coordenadas,
          geodesic:false,
          strokeWeight:5
         }])
        } else {
          alert('Could not display directions due to: ' + status);
        }
      });
  
    }

    dismiss(isSave: boolean = true){
      if(isSave){
        this.modal.dismiss(this.markerSelected);
      }else{
      this.modal.dismiss();
      }
    }
  
    @Input() text!:string;
    placeMarkers:any=[]
    search(){
      this.genericService.placeGoogleMaps(this.text).subscribe(async (res:any) => {
        this.newMap.removeMarkers(this.makers);
        this.makers = [];
        this.markerSelected=null;
        for(const place of res.places){
          await this.createMarker(place.location);
        }
        this.newMap.setCamera({
          zoom:8,
          coordinate:res.places[0].locations
        })
      }, (err:any) => {
      })
    }

}
