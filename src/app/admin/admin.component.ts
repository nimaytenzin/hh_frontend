import { Component, OnInit, NgZone } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { environment } from '../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class Building {
  lat: number;
  lng: number;
  sub_zone_id: number;
}

export class BuildingInfo{
  BuildingName: string;
  BuildingOwner: string;
  Contact:string;
  BuildingUse: string;
  Sewer: string;
  Water: string;
  Waste: string;
}

interface IdName{
  id: string;
  name: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  API_URL =environment.API_URL;
  BASE_URL = environment.BASE_URL;
  searchForm: FormGroup;
  searchmarker: L.GeoJSON;
  searchedId: any;

  latitude: number;
  longitude: number;
  accuracy: number;
  json: any;
  bound: any;
  buildingId: number;
  imgs:any;
  units:any;
  isAddAllowed = false;
  buildings:any;
  building: any;
  buildingInfo: BuildingInfo;
  watchId;
  mylocation: L.Marker;
  mycircle: L.Circle;
  resident: any;
  showattic= false;
  residentAttic=[];

  map: L.Map;

  greenMarker = L.icon({
    iconUrl: 'assets/marker-green.png',
    iconSize: [15, 15]
  });
  redMarker = L.icon({
    iconUrl: 'assets/marker-red.png',
    iconSize: [15, 15]
  });
  yellowMarker = L.icon({
    iconUrl: 'assets/marker-yellow.png',
    iconSize: [15,15]
  })
  myMarker = L.icon({
    iconUrl: 'assets/mymarker.png',
    iconSize: [20, 20]
  });

  buildingOwnership:IdName[]=[
    {id:'1', name:"Singly Owned"},
    {id:'2', name:"Jointly Owned"},
  ];
  approvedDrawing:IdName[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  occupancyCertificate:IdName[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  associativePosition: IdName[]=[
    {id:'1', name:"Main"},
    {id:'2', name:"Ancillary"},
  ];
  existancyStatus: IdName[]=[
    {id:'1', name:"Standing"},
    {id:'2', name:"Under Construction"},
    {id:'3', name:"Demolished"},
    {id:'4', name:"Abandoned"},
  ];
  attic: IdName[]=[
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},
  ];
  stilt: IdName[]=[
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},
   ];
  jamthog: IdName[]=[
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},
  ];
  basement: IdName[]=[
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},
  ];
  buildingStyle: IdName[]=[
    {id:'1', name:"Contemporary"},
    {id:'2', name:"Traditional"},
    {id:'3', name:"Composite"},
  ];
  structureType: IdName[]=[
    {id:'1', name:"Framed"},
    {id:'2', name:"Load Bearing"},
    {id:'3', name:"Composite"},
    {id:'4', name:"Others"},
  ];
  materialType: IdName[]=[
    {id:'1', name:"Brick Masonry"},
    {id:'2', name:"ACC Block"},
    {id:'3', name:"Rammed Earth"},
    {id:'4', name:"Steel"},
    {id:'5', name:"Concrete Block"},
    {id:'6', name:"Stabilized Mud Block"},
    {id:'7', name:"Stone Masonry"},
    {id:'8', name:"Reinforced Concrete"},
    {id:'9', name:"Timbers"},
    {id:'10', name:"Others"}
  ];
  waterSupply: IdName[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Rural Water Supply"},
    {id:'3', name:"Private Individual"},
    {id:'4', name:"Private Community"},
    {id:'5', name:"Others"}
  ];
  roofType: IdName[]=[
    {id:'1', name:"Gable"},
    {id:'2', name:"Hipped"},
    {id:'3', name:"Composite"},
    {id:'4', name:"Others"},
  ];
  roofingMaterial: IdName[]=[
    {id:'1', name:"CGI"},
    {id:'2', name:"Wooden Shingles"},
    {id:'3', name:"Slate"},
    {id:'4', name:"Composite"},
    {id:'6', name:"Others"},
  ];
  emergencyExit: IdName[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  lift: IdName[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
    {id:'3', name:"Provision Provided"},
  ];
  sewerTreatment: IdName[]=[
    {id:'1', name:"Individual Septic Tank"},
    {id:'2', name:"Combined Septic Tank"},
    {id:'3', name:"Thromde Sewerage Network"},
    {id:'4', name:"Pit Latrine"},
    {id:'5', name:"Others"},
  ];
  wasteCollection: IdName[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Dzongkhag"},
    {id:'2', name:"Private Company"},
    {id:'3', name:"Individual"},
  ];
   buildingUse: IdName[] = [
    {id:'1', name:"Residential"},
    {id:'2', name:"Commercial"},
    {id:'3', name:"Mixed Use"},
    {id:'4', name:"Institution"},
    {id:'5', name:"School"},
    {id:'6', name:"Religious"},
    {id:'7', name:"Hospital"},
    {id:'8', name:"Workshop"},
    {id:'9', name:"Sawmill"},
    {id:'10', name:"Industry"},
    {id:'11', name:"Others"},
  ];
  parking: IdName[]=[
    {id:'1', name:"Designated Onstreet"},
    {id:'2', name:"Un-designated Onstreet"},
    {id:'3', name:"Offstreet"},
    {id:'4', name:"Private Parking"}
  ];
  numberOfFloors: IdName[]=[
    {id:'1', name:"G"},
    {id:'2', name:"G+1"},
    {id:'3', name:"G+2"},
    {id:'4', name:"G+3"},
    {id:'5', name:"G+4"},
    {id:'6', name:"G+5"},
    {id:'7', name:"G+6"},
    {id:'8', name:"G+7"},

  ];


  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private zone: NgZone,
    private fb: FormBuilder,
  ) { 
    this.building = new Building();
    this.buildingInfo = new BuildingInfo();
  }

  ngOnInit() {
    this.renderMap();
    this.searchForm = this.fb.group({
      searchBuilding:[]
    });
  }

  submit(){
    let result = this.searchForm.get("searchBuilding").value;
    console.log(result);
    this.dataService.getStructure(result).subscribe(resp=>{
      let structure = resp;
      this.zoomToSearched(structure)
    });
  }

  zoomToSearched(response:any){
    let lat,lng,id = 0
    if(response.success === "false"){
      alert("Building not found");
    }else{
      if(this.searchmarker !== undefined){
        this.searchmarker = null
      }
      lat = response.data.lat
      lng = response.data.lng

      this.map.flyTo([lat,lng],18)
      var responseJson = {
        "type":"Point",
        "coordinates":[lng,lat],
        "properties":{
          "structure_id":response.data.id
        }
      };
      this.searchmarker = L.geoJSON(responseJson, {
        onEachFeature: (feature, layer) => {
            layer.on('click', (e) => {
              this.buildingId = feature.properties.structure_id;
              this.showBuilding(this.buildingId);
              this.resident = null;

              this.http.get(`${this.API_URL}/getunits/${this.buildingId}`).subscribe((json: any) => {
                this.units = json.data;
              });

              this.http.get(`${this.API_URL}/get-img/${this.buildingId}`).subscribe((json: any) => {
                this.imgs= json.data;
              });
              
            });
          }, pointToLayer: (feature, latLng) => {
              return L.marker(latLng,{icon: this.myMarker});
          }
        }).addTo(this.map);
    }
  }
  

  getMyLocation(){
    this.map.locate({setView:true,watch:true,enableHighAccuracy:true});
  }

  renderMap(){
    var sat = L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      minZoom: 9,
    });
    var osm = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 9,
    });
    this.map = L.map('map',{
      center:[27.4712,89.64191],
      zoom: 13,
      maxZoom: 20,
      minZoom: 9,
      layers: [sat]
    });
    var baseMaps = {
      "Satellite Image": sat,
      "OSM base map": osm 
    };

    L.control.layers(baseMaps,null,{position:"bottomleft"}).addTo(this.map);
    this.onMapReady(this.map);
  
    this.map.on('locationerror',(err)=>{
          if (err.code === 0) {
            this.snackBar.open('Couldnot pull your location, please try again later', '', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
          if (err.code === 1) {
            this.snackBar.open('Location service is disabled, please enable it and try again', '', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
          if (err.code === 2) {
            this.snackBar.open('Your location couldnot be determined', '', {
              verticalPosition: 'top',
              duration: 3000
            });
          }
          if (err.code === 3) {
              this.snackBar.open('Couldnot get your location', '', {
                verticalPosition: 'top',
                duration: 3000
              });
            }
    });

    this.map.on('locationfound',(e)=>{
      var radius = e.accuracy;
      if(this.mylocation !== undefined){
        this.map.removeLayer(this.mylocation);
      }
      this.mylocation = L.marker(e.latlng,{icon: this.myMarker}).addTo(this.map);

      if(radius<100){
        if(this.mycircle !== undefined){
          this.map.removeLayer(this.mycircle);
        }
        this.mycircle = L.circle(e.latlng,radius).addTo(this.map);
      }
    });


    let newMarker: any;
    this.map.on('click', <LeafletMouseEvent>($e) => {
      if (this.isAddAllowed) {
        if (newMarker !== undefined) {
          this.map.removeLayer(newMarker);
        }
        newMarker = L.marker($e.latlng, {icon: this.myMarker}).addTo(this.map);
      }
    });
  }

  onMapReady(map: L.Map) {
    const zoneId = Number(sessionStorage.getItem('subZoneId'));
    const geojson = this.http.get(`/assets/geojson/conv_T${zoneId}.geojson`).subscribe((json:any)=>{
      this.bound= L.geoJSON(json,{
        style: (feature)=>{
          return {
            color:"red",
            fillOpacity:0
          }
        }
      }).addTo(this.map);
      this.map.fitBounds(this.bound.getBounds());
    })

    this.http.get(`${this.API_URL}/get-str/${zoneId}`).subscribe((json: any) => {
      this.json = json;
      console.log(json);
      this.http.get(`${this.API_URL}/get-resident-in-attic/${zoneId}`).subscribe((json:any)=>{
        this.residentAttic = json.data[0];
        console.log( this.residentAttic.length);
        console.log(this.residentAttic);
      })
      const geoJson = L.geoJSON(this.json, {
        onEachFeature: (feature, layer) => {
            layer.on('click', (e) => {
              this.buildingId = feature.properties.structure_id;
              this.showBuilding(this.buildingId);
              this.resident = null;

              this.http.get(`${this.API_URL}/getunits/${this.buildingId}`).subscribe((json: any) => {
                this.units = json.data;
              });

              this.http.get(`${this.API_URL}/get-img/${this.buildingId}`).subscribe((json: any) => {
                this.imgs= json.data;
              });
            });
          }, pointToLayer: (feature, latLng) => {
            if(feature.properties.status == 'INCOMPLETE'){
              return L.marker(latLng, {icon: this.redMarker});
            }else if(feature.properties.status == "PROGRESS"){
              return L.marker(latLng, {icon: this.yellowMarker});
            }else if(this.showattic){
              for(var i = 0;i<this.residentAttic.length;i++){
                // if(this.residentAttic[i]['structure_id'] == this.);
                // if()
              }
              return L.marker(latLng,{icon: this.myMarker});
            } else{
              return L.marker(latLng, {icon: this.greenMarker});
            }
          }
        }).addTo(map);
    });
  }

  
  showResident(unitid){
    this.resident = null;
    this.dataService.getResident(unitid).subscribe(resp=>{
      this.resident = resp.data;
      console.log(this.resident);
    });

  }

  showBuilding(unitid){
    this.building = null;
    this.buildingInfo = null;
    this.buildingInfo = new BuildingInfo();
    this.dataService.getBuildingInfo(unitid).subscribe(resp=>{
      console.log(resp.data);
      this.buildingInfo.BuildingName = resp.data[0]['nameOfTheBuilding'];
      this.buildingInfo.BuildingOwner = resp.data[0]['nameOfTheBuildingOwner'];
      this.buildingInfo.Contact = resp.data[0]['contactNumberBuilding'];
      this.buildingInfo.Water = resp.data[0]['waterSupply'];
      // this.buildingInfo.BuildingUse = this.buildingUse(resp.data[0]['buildingUse']);
      var useIndex = Number(resp.data[0]['buildingUse'])-1;
      var sewerIndex = Number(resp.data[0]['sewerTreatment'])-1;
      var wasteIndex = Number(resp.data[0]['wasteCollection'])-1;
      this.buildingInfo.BuildingUse = this.buildingUse[useIndex]['name'];
      this.buildingInfo.Sewer = this.sewerTreatment[sewerIndex]['name'];
      this.buildingInfo.Waste = this.wasteCollection[wasteIndex]['name'];
    });

  }

} 

