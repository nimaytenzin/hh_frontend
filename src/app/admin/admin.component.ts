import { Component, OnInit, NgZone } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { HttpClient } from '@angular/common/http';
import { Data, Router } from '@angular/router';
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

interface Zone {
  id: string;
  name: string;
  map_image: string;
  dzongkhag_id: number;
  color_code: string;
  lat: number;
  lng: number;
  created_at: string;
  updated_date: string;
}

interface Subzone {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  zone_id: number;
}



interface Dzongkhag {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}


export class BuildingInfo{
  BuildingName: string;
  BuildingOwner: string;
  Contact:string;
  BuildingUse: string;
  Sewer: string;
  Water: string;
  Waste: string;
  Remarks: string;
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
  selectZone:boolean;
  clearData:boolean;

  residentialUnits = [];
  
  zoneForm: FormGroup;
  dzongkhags: Dzongkhag[] = [];
  zones: Zone[] = [];
  subZones: Subzone[] = [];
  isUserLoggedIn: boolean;
  dzongkhag: string;
  zoned: string;
  subZone: string;
  shop: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  json: any;
  bound: any;
  buildingGeojson: any;
  postiveCaseMap: any;
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
    iconSize: [12, 12]
  });
  redMarker = L.icon({
    iconUrl: 'assets/marker-red.png',
    iconSize: [12, 12]
  });
  yellowMarker = L.icon({
    iconUrl: 'assets/marker-yellow.png',
    iconSize: [12,12]
  })
  myMarker = L.icon({
    iconUrl: 'assets/mymarker.png',
    iconSize: [12, 12]
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

  setViewValue: boolean;


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
    this.buildingInfo = null;
    this.selectZone = false;
    this.clearData = false;
    this.setViewValue = true;
  }

  ngOnInit() {
   
    this.getDzongkhagList();
    this.reactiveForm();


    const zoneId = sessionStorage.getItem('zoneId');
    const subZoneId = sessionStorage.getItem('subZoneId');
    const dzongkhagId = sessionStorage.getItem('dzongkhagId')

    this.getZoneList(dzongkhagId);
    this.getSubzoneList(zoneId);
    this.renderMap(this.dataService);
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
        this.map.removeLayer(this.searchmarker);  
        this.searchmarker = null;
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
      this.searchmarker = L.geoJSON(<GeoJSON.Point>responseJson, {
        onEachFeature: (feature, layer) => {
            layer.on('click', (e) => {
              this.buildingId = feature.properties.structure_id;
              this.showBuilding(this.buildingId);
              this.toggleClearData();
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
  

  reactiveForm(){
    this.zoneForm = this.fb.group({
      dzongkhagControl:[],
      zoneControl:[],
      subZoneControl:[]
    });
    this.searchForm = this.fb.group({
      searchBuilding:[]
    });
  }

  getMyLocation(){
    this.map.locate({setView:this.setViewValue,watch:true,enableHighAccuracy:true});
    if(this.setViewValue === true){
      this.setViewValue =false
    }
    
  }

  renderMap(dataservice: DataService){
    var thimphuZone = "https://raw.githubusercontent.com/nimaytenzin/cdrs/main/ThimphuZonee.geojson";
    var heatmapURL = "https://raw.githubusercontent.com/nimaytenzin/cdrs/main/heatMap.geojson"; //hsp to kml to geojson

//marker Styles

    
  function zoneStyle(feature) {
    return {
    fillColor:'white',
    weight: 2,
    opacity: 1,
    color: 'yellow',
    dashArray: '3',
    fillOpacity: 0
   };
  }

   
    var sat = L.tileLayer('https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      minZoom: 9,
    });
    var osm = L.tileLayer('https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}@2x.png', {
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
  
    //heatmap begin
    // var cases =[]
    
    // fetch(heatmapURL)
    //   .then(res => res.json())
    //   .then(data => {
    //     for(let i =0; i < data.features.length; i++){
    //      cases.push([data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0],10])    
    //     } 
    //   })

    // var heatMap = L.heatLayer(cases, {radius: 30, gradient:{0.1: 'yellow', 1: 'red'}})

 
    //heatmap end

    var zoneMap = L.geoJSON(null, { 
      onEachFeature:  (feature, layer)=> {
        layer.on('click',(e) =>{
          layer.bindPopup(`${feature.properties.Zone}`)
        })},style:zoneStyle
  })

    fetch(thimphuZone)
      .then(res => res.json())
      .then( data => {
        zoneMap.addData(data);
      })


      var overlayMaps = {
        "Zone Map" : zoneMap,
        // "Heat Map": heatMap
      };

      var layer: L.GeoJSON[] = [];
      
      var url = "https://raw.githubusercontent.com/nimaytenzin/cdrs/main/positive";
      fetch(url) .then(res => res.json()) .then(data => {
          for(let i=0; i<data.length; i ++){
            layer[i] = L.geoJSON(null,  {
              onEachFeature:  (feature, layer)=> {
              layer.on('click',(e) =>{
                this.buildingId = feature.properties.id;
                this.showBuilding(this.buildingId);
                this.toggleClearData();
                layer.bindPopup(`Building ID : ${this.buildingId}`)
        
                      if(this.units !== undefined){
                        this.units = null;
                      }
                      this.http.get(`${this.API_URL}/getunits/${this.buildingId}`).subscribe((json: any) => {
                        this.units = json.data;
                      });
            
                      if(this.imgs !== undefined){
                        this.imgs = null
                      }
                      this.http.get(`${this.API_URL}/get-img/${this.buildingId}`).subscribe((json: any) => {
                        this.imgs= json.data;
                      });
              })},
                pointToLayer:  (feature, latlng) => { 
                  return L.circleMarker(latlng,data[i].style);
                }
            })           
              fetch(data[i].dataUrl)
                .then(res => res.json())
                .then(data => {
                  layer[i].addData(data).addTo(this.map)
                })
              overlayMaps[data[i].name] = layer[i]
          }        
      
          L.control.layers(baseMaps,overlayMaps).addTo(this.map);
      })
      
      var baseMaps = {
        "Satellite Image": sat,
        "OSM base map": osm 
      };
    
    // L.control.layers(baseMaps, overlayMaps).addTo(this.map);
  
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

  zoneSearch() {
      const zoneId = this.zoneForm.get('subZoneControl').value;
      const dzongkhagId = this.zoneForm.get('dzongkhagControl').value;
      console.log(zoneId)

      /**
       * this.http.get(`/assets/geojson/${zoneId}.geojson`)
       * 
       * 1) Define shape file with that links to corresponding id to the dzongkhags
       * 2) Export as Shapefiles 
       * 3) Export as Geojson and then upload to assets
       * 4) If the first get request for subzone is returned with an error of 404
       * 5) it will trigger the get request for dzongkhag and shows the boundary and bounds
       */

      this.http.get(`/assets/geojson/conv_T${zoneId}.geojson`)     
              .subscribe((response:any)=>{
                if(this.bound !== undefined){
                  this.map.removeLayer(this.bound)
                  this.bound = null;
                }
                this.bound= L.geoJSON(response,{
                  style: (feature)=>{
                    return {
                      color:"red",
                      fillOpacity:0
                    }
                  }
                }).addTo(this.map)
                this.map.fitBounds(this.bound.getBounds());
              },
              (error) => {
                  if(error){
                    this.http.get(`/assets/geojson/${dzongkhagId}.geojson`)
                        .subscribe(
                          (res: any) =>{
                            if(this.bound !== undefined){
                              this.map.removeLayer(this.bound)
                              this.bound = null;
                            }
                            this.bound = L.geoJSON(res, {
                              style: (feature) =>{
                                return {
                                  color: "yellow",
                                  fillOpacity: 0
                                }
                              }
                            }).addTo(this.map)
                            this.map.fitBounds(this.bound.getBounds())
                          }
                        )
                  }
              }
              
              )




              //end zone zoom to bound
      this.http.get(`${this.API_URL}/get-str/${zoneId}`).subscribe((json: any) => {
    
        this.json = json;
        this.http.get(`${this.API_URL}/get-resident-in-attic/${zoneId}`).subscribe((json:any)=>{
          this.residentAttic = json.data[0];
        })

        if(this.buildingGeojson !== undefined){
          this.map.removeLayer(this.buildingGeojson)
          this.buildingGeojson = null
        }

        this.buildingGeojson = L.geoJSON(this.json, {
                   onEachFeature: (feature, layer) => {
              layer.on('click', (e) => {
                this.buildingId = feature.properties.structure_id;
                this.showBuilding(this.buildingId);
                this.toggleClearData();
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
          });
          this.map.addLayer(this.buildingGeojson)
      });
 
  }

  //zone Search End

  
  showResident(unitid){
    this.resident = null;
    this.dataService.getResident(unitid).subscribe(resp=>{
      this.resident = resp.data;
      console.log(this.resident);
    });
  }

  toggleClearData(){
    if(this.clearData ===false){
      this.clearData = true
    }else{
      this.clearData = false
    }
  }

  showBuilding(unitid){
    // this.building = null;
    this.buildingInfo = null;
    this.buildingInfo = new BuildingInfo();
    this.dataService.getBuildingInfo(unitid).subscribe(resp=>{
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
      this.buildingInfo.Remarks = resp.data[0]['buildingRemarksstring'];
    });

  }

  getDzongkhagList() {
    this.dataService.getDzongkhags().subscribe(response => {
      this.dzongkhags = response.data;

      console.log(response.data)
    });
  }

  getZoneList(dzongkhagId) {
    this.dataService.getZones(dzongkhagId).subscribe(response => {
      this.zones = response.data;
      console.log(response.data)
    });
  }

  getSubzoneList(zoneId) {
    this.dataService.getSubZones(zoneId).subscribe(response => {
      this.subZones = response.data;
      console.log(response.data)
    });
  }

  reset(){
    this.toggleClearData();
    this.buildingInfo = null; 
    this.units = null;
    this.imgs = null;
    this.resident = null;
    if(this.bound !== null){
      this.map.removeLayer(this.bound)
      // this.bound = null;
    }
    if(this.buildingGeojson !== null){
      this.map.removeLayer(this.buildingGeojson);
      // this.buildingGeojson = null;
    }
    if(this.searchmarker !== undefined){
      this.map.removeLayer(this.searchmarker);
      // this.searchmarker = null;
    }
    
  }

  showSelectZone(){
    if(this.selectZone === false){
      this.selectZone = true
    }else{
      this.selectZone = false
    }

    if(this.clearData === false){
      this.clearData = true
    }else{
      this.clearData = false
    }
  }

} 

