import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';

// interface Building Form
interface OwnershipType {
  id: string;
  name: string;
}
export class Building{
    building_id: number;
    nameOfTheBuilding:string;
    nameOfTheBuildingOwner:string;
    contactNumberBuilding:string;
    ownershipType:string;
    associativePosition:string;
    existancyStatus: string;
    yearOfConstruction:string;
    yearOfRenovation:string;
    numberOfFloors:string;
    attic:string;
    basement:string;
    buildingStyle:string;
    structureType:string;
    materialType:string;
    roofType:string;
    roofingMaterial:string;
    emergencyExit:string;
    lift:string;
    sewerTreatment:string;
    wasteCollection:string;
    dryWasteCollection:string;
    wetWasteCollection:string;
    waterSupply:string;
    buildingUse:string;
    parking:string;
    buildingRemarksstring:String;
}

interface AssociativePosition {
  id: string;
  name: string;
}
interface ExistancyStatus {
  id: string;
  name: string;
}
interface Attic {
  id: string;
  name: string;
}

interface Basement {
  id: string;
  name: string;
}

interface BuildingStyle {
  id: string;
  name: string;
}
interface StructureType {
  id: string;
  name: string;
}
interface MaterialType {
  id: string;
  name: string;
}

interface RoofType {
  id: string;
  name: string;
}

interface RoofingMaterial {
  id: string;
  name: string;
}
interface EmergencyExit {
  id: string;
  name: string;
}
interface Lift {
  id: string;
  name: string;
}
//
interface SewerTreatment {
  id: string;
  name: string;
}

interface WasteCollection {
  id: string;
  name: string;
}
interface WaterSupply {
  id: string;
  name: string;
}
interface BuildingUse {
  id: string;
  name: string;
}

interface Parking{
  id:string;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  
  buildingForm: FormGroup;
  schoolForm: FormGroup;
  institutionForm: FormGroup;
  showScanner = false;
  buildingId: number;
  qrId: string;
  houseHoldId: number;
  unitUse: string;
  shopUse: string;
  unitId: number;
  
  latitude: number;
  longitude: number;
  accuracy: number;
  building: Building;

  disableForm = false;
  displayForm = true;
  displayCamera = false;
  showOtherType = false;
  displaySchoolForm=false;
  displayInstitutionForm=false;
  
  //i have added from here
  
  ownership:OwnershipType[]=[
    {id:'1', name:"Single Owned"},
    {id:'2', name:"Family Owned"},
    {id:'3', name:"Joint Owned"},
  ];
  associativePosition: AssociativePosition[]=[
    {id:'1', name:"Main"},
    {id:'2', name:"Ancillary"},
  ];
  existancyStatus:ExistancyStatus []=[
    {id:'1', name:"Standing"},
    {id:'2', name:"Under Construction"},
    {id:'3', name:"Demolished"},
    {id:'4', name:"Abandoned"},
  ];
  attic:Attic []=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  basement:Basement[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  buildingStyle:BuildingStyle []=[
    {id:'1', name:"Contemporary"},
    {id:'2', name:"Traditional"},
    {id:'3', name:"Composite"},
  ];
  structureType:StructureType []=[
    {id:'1', name:"Framed"},
    {id:'2', name:"Load Bearing"},
    {id:'3', name:"Composite"},
    {id:'4', name:"Others"},
  ];
  materialType:MaterialType[]=[
    {id:'1', name:"Brick Masonry"},
    {id:'2', name:"ACC Block"},
    {id:'3', name:"Rammed Earth"},
    {id:'4', name:"Steel"},
    {id:'5', name:"Hollow Block"},
    {id:'6', name:"Stabilized Mud Block"},
    {id:'7', name:"Stone Masonry"},
    {id:'8', name:"Reinforced Concrete"},
    {id:'9', name:"Timbers"},
    {id:'10', name:"Others"},
  ];
  roofType: RoofType[]=[
    {id:'1', name:"Gable"},
    {id:'2', name:"Gable with Jamthog"},
    {id:'3', name:"Hipped"},
    {id:'4', name:"Hipped with Jamthog"},
  ];
  roofingMaterial:RoofingMaterial[]=[
    {id:'1', name:"CGI"},
    {id:'2', name:"Fibre Glass"},
    {id:'3', name:"Slate"},
    {id:'4', name:"Tiles"},
    {id:'5', name:"Wooden Shingle"},
    {id:'6', name:"Others"},
  ];
  emergencyExit:EmergencyExit[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  lift:Lift[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  sewerTreatment:SewerTreatment[]=[
    {id:'1', name:"Individual Septic Tank"},
    {id:'2', name:"Communal Septic Tank"},
    {id:'3', name:"Sewerage"},
    {id:'4', name:"Others"},
  ];
  wasteCollection:WasteCollection[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Private"},
  ];
  
  waterSupply:WaterSupply[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Royal Water Supply"},
    {id:'3', name:"Private Individual"},
    {id:'4', name:"Private Community"},
  ];
  buildingUse: BuildingUse[] = [
    {id:'1', name:"Residential"},
    {id:'2', name:"Commercial"},
    {id:'3', name:"Mixed User"},
    {id:'4', name:"Institution"},
    {id:'5', name:"School"},
    {id:'6', name:"Religious"},
    {id:'7', name:"Hospital"},
    {id:'8', name:"Others"},
  ];
  parking:Parking[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {
    this.building = new Building();
  }

  ngOnInit() {
    this.buildingId = Number(sessionStorage.getItem('buildingId'));
    this.reactiveForms();
  }


  changeDiff($event){
    this.displayInstitutionForm = false;
    this.displaySchoolForm = false;

    if($event.value==="4"){
      this.displayInstitutionForm= true;
    }
    if($event.value==="5"){
      this.displaySchoolForm= true;
    }
  }

   // control

   reactiveForms() {
    this.buildingForm = this.fb.group({
      nameOfTheBuildingControl:[],
      nameOfTheBuildingOwnerControl:[],
      contactNumberBuildingControl:[],
      ownershipTypeControl:[],
      associativePositionControl:[],
      existancyStatusControl:[],
      yearOfConstructionControl:[],
      yearOfRenovationControl:[],
      numberOfFloorsControl:[],
      atticControl:[],
      basementControl:[],
      buildingStyleControl:[],
      structureTypeControl:[],
      materialTypeControl:[],
      roofTypeControl:[],
      roofingMaterialControl:[],
      emergencyExitControl:[],
      liftControl:[],
      sewerTreatmentControl:[],
      wasteCollectionControl:[],
      dryWasteCollectionControl:[],
      wetWasteCollectionControl:[],
      waterSupplyControl:[],
      buildingUseControl:[],
      parkingControl:[],
      buildingRemarksControl:[],
      });
    this.schoolForm = this.fb.group({
        schoolNameControl:[],
        schoolEstablishmentYearControl:[],
        schoolStaffMaleControl:[],
        schoolStaffFemaleControl:[],
        studentsMaleControl:[],
        studentsFemaleControl:[],
        });
    this.institutionForm = this.fb.group({
      instituteNameControl:[],
      instituteEstablishmentYearControl:[],
      institueStaffMaleControl:[],
      instituteStaffFemaleControl:[],
      instituteVehicleControl:[],
      });
  }


  submit(){
    this.registerBuilding();
  }
  registerBuilding(){
    // this.building.building_id=Number(sessionStorage.getItem('buildingId'));
    this.building.building_id=Number(sessionStorage.getItem('buildingId'));
    this.building.nameOfTheBuilding=this.buildingForm.get('nameOfTheBuildingControl').value;
    this.building.nameOfTheBuildingOwner=this.buildingForm.get('nameOfTheBuildingOwnerControl').value;
    this.building.contactNumberBuilding=this.buildingForm.get('nameOfTheBuildingOwnerControl').value;
    this.building.ownershipType=this.buildingForm.get('ownershipTypeControl').value;
    this.building.associativePosition=this.buildingForm.get('associativePositionControl').value;
    this.building.existancyStatus=this.buildingForm.get('existancyStatusControl').value;
    this.building.yearOfConstruction=this.buildingForm.get('yearOfConstructionControl').value;
    this.building.yearOfRenovation=this.buildingForm.get('yearOfRenovationControl').value;
    this.building.numberOfFloors=this.buildingForm.get('numberOfFloorsControl').value;
    this.building.attic=this.buildingForm.get('atticControl').value;
    this.building.basement=this.buildingForm.get('basementControl').value;
    this.building.buildingStyle=this.buildingForm.get('buildingStyleControl').value;
    this.building.structureType=this.buildingForm.get('structureTypeControl').value;
    this.building.materialType=this.buildingForm.get('materialTypeControl').value;
    this.building.roofType=this.buildingForm.get('roofTypeControl').value;
    this.building.roofingMaterial=this.buildingForm.get('roofingMaterialControl').value;
    this.building.emergencyExit=this.buildingForm.get('emergencyExitControl').value;
    this.building.lift=this.buildingForm.get('liftControl').value;
    this.building.sewerTreatment=this.buildingForm.get('sewerTreatmentControl').value;
    this.building.wasteCollection=this.buildingForm.get('wasteCollectionControl').value;
    this.building.dryWasteCollection=this.buildingForm.get('dryWasteCollectionControl').value;
    this.building.wetWasteCollection=this.buildingForm.get('wetWasteCollectionControl').value;
    this.building.waterSupply=this.buildingForm.get('waterSupplyControl').value;
    this.building.buildingUse=this.buildingForm.get('buildingUseControl').value;
    this.building.parking=this.buildingForm.get('parkingControl').value;
    this.building.buildingRemarksstring=this.buildingForm.get('buildingRemarksControl').value;

    this.dataService.postBuilding(this.building).subscribe(response=>{
      console.log(response.status);
      if(response.success === "true"){
        this.router.navigate(['dashboard',this.buildingId]);
        this.snackBar.open('Building Registration Complete', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      }else if(response.success === "false"){
        this.snackBar.open('Could not register Household'+response.msg, '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }else{
        this.snackBar.open('Error registering Building', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    })
  }
}
