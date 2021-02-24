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
    structure_id: number;
    block_no: string;
    building_owner: string;
    cidOwner: string;
    contactOwner: number;
    constYear: number;
    floors: number;
    attic: boolean;
    basement: boolean
    buildingStyle:string;
    structureType: string;i
    materialType: string;
    roofMaterial: string;
    sewerTreatment: string;
    wasteCollection: string;
    wasteCollectionFrequency: string;
    waterSupply: string;
    buildingUse: string;
    residentialUnits: number;
    commercialUnits: number;
    officeUnits: number;
}


export class School{
  structure_id:number;
  user_id:number;
  schoolName:string;
  schoolEstablishmentYear:string;
  schoolStaffMale:string;
  schoolStaffFemale:string;
  studentsMale:string;
  studentsFemale:string;
  vehicles:string;
}

export class Institution{
  structure_id:number;
  user_id:number;
  instituteName:string;
  instituteEstablishmentYear:string;
  instituteStaffMale:string;
  instituteStaffFemale:string;
  instituteVehicle:string;
}



interface DropDownOptions {
  id: string;
  name: string;
}

interface BooleanDropdown {
  name: string;
  value:boolean
}

interface Floor{
  name:string;
  value:number
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
  institute: Institution;
  school: School;

  disableForm = false;
  displayForm = true;
  displayCamera = false;
  showOtherType = false;
  displaySchoolForm=false;
  displayInstitutionForm=false;
  
  //i have added from here


  buildingStyles: DropDownOptions[]=[
    {id:'1', name:"Contemporary"},
    {id:'2', name:"Traditional"},
    {id:'3', name:"Composite"}
  ]
  structureTypes :DropDownOptions[]=[
    {id:'1', name:"Framed"},
    {id:'2', name:"Load Bearing"},
    {id:'3', name:"Composite"},
    {id:'4', name:"Others"}
  ]

  materialTypes: DropDownOptions[]=[
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
  ]

  roofingMaterials: DropDownOptions[]=[
    {id:'1', name:"CGI"},
    {id:'2', name:"Fibre Glass"},
    {id:'3', name:"Slate"},
    {id:'4', name:"Tiles"},
    {id:'5', name:"Wooden Shingles"},
    {id:'6', name:"Others"}
  ]

  sewerTreatmentOptions: DropDownOptions[]=[
    {id:'1', name:"Individual Septic Tank"},
    {id:'2', name:"Communal Septic Tank"},
    {id:'3', name:"Sewerage"},
    {id:'5', name:"Others"}

  ]

  floors:Floor[]=[
    {name:'G', value:1},
    {name:'G+1', value:2},
    {name:'G+2', value:3},
    {name:'G+3', value:4},
    {name:'G+4', value:5},
    {name:'G+5', value:6},
    {name:'G+6', value:7},
    {name:'G+7', value:8}
  ]

  wasteCollectionOptions:DropDownOptions[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Dzongkhag"},
    {id:'2', name:"Private"},
    {id:'3', name:"Individual"}
  ];

  waterSupplyOptions:DropDownOptions[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Rural Water Supply"},
    {id:'3', name:"Private Individual"},
    {id:'4', name:"Private Community"},
    {id:'5', name:"Others"}
  ];

  buildingUses:DropDownOptions[]=[
    {id:'1', name:"Residential"},
    {id:'2', name:"Commercial"},
    {id:'3', name:"Mixed Use"},
    {id:'4', name:"Office"}
  ]

  atticOptions:BooleanDropdown[]=[
    { name: "Yes",value:true},
    { name: "No",value:false}
  ]

  basementOptions:BooleanDropdown[]=[
    { name: "Yes",value:true},
    { name: "No",value:false}
  ]


  
  buildingOwnership:OwnershipType[]=[
    {id:'1', name:"Singly Owned"},
    {id:'2', name:"Jointly Owned"},

  ];

  approvedDrawing:OwnershipType[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  occupancyCertificate:OwnershipType[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
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
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},
  ];

  stilt: Attic[]=[
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},
   ];
  jamthog: Attic[]=[
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},
  ];

  basement:Basement[]=[
    {id:'1', name:"0"},
    {id:'2', name:"1"},
    {id:'3', name:"2"},

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


  materialType:StructureType []=[
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
  waterSupply:WaterSupply[]=[
    {id:'1', name:"Thromde"},
    {id:'2', name:"Rural Water Supply"},
    {id:'3', name:"Private Individual"},
    {id:'4', name:"Private Community"},
    {id:'5', name:"Others"}
  ];


  roofType: RoofType[]=[
    {id:'1', name:"Gable"},
    {id:'2', name:"Hipped"},
    {id:'3', name:"Composite"},
    {id:'4', name:"Others"},
  ];
  roofingMaterial:RoofingMaterial[]=[
    {id:'1', name:"CGI"},
    {id:'2', name:"Wooden Shingles"},
    {id:'3', name:"Slate"},

    {id:'4', name:"Composite"},

    {id:'6', name:"Others"},
  ];
  emergencyExit:EmergencyExit[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
  ];
  lift:Lift[]=[
    {id:'1', name:"Yes"},
    {id:'2', name:"No"},
    {id:'3', name:"Provision Provided"},
  ];
  sewerTreatment:SewerTreatment[]=[
    {id:'1', name:"Individual Septic Tank"},

    {id:'2', name:"Combined Septic Tank"},
    {id:'3', name:"Thromde Sewerage Network"},
    {id:'4', name:"Pit Latrine"},
    {id:'5', name:"Others"},

  ];

   buildingUse: BuildingUse[] = [
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
  parking:Parking[]=[
    {id:'1', name:"Designated Onstreet"},
    {id:'2', name:"Un-designated Onstreet"},
    {id:'3', name:"Offstreet"},
    {id:'4', name:"Private Parking"}
  ];
  numberOfFloors:Parking[]=[
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
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar

  ) {
    this.building = new Building();
    this.institute = new Institution();
    this.school = new School();
  }

  ngOnInit() {
    this.buildingId = Number(sessionStorage.getItem('buildingId'));
    this.dataService.getBuildingInfo(this.buildingId).subscribe(resp=>{
      if(resp['success']=="true"){
        this.snackBar.open('Building registration already complete', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['dashboard',this.buildingId])
      }
    })
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

  selectMaterial($event){
    let materialtypedata = [];
    materialtypedata = $event.source.value;
    this.building.materialType = materialtypedata.toString();
  }
  selectWatersupply($event){
    let watersuplydata =[];
    watersuplydata = $event.source.value;
    this.building.waterSupply = watersuplydata.toString();
  }
   // control

   reactiveForms() {
    this.buildingForm = this.fb.group({
      blockNumber:[],
      nameOfBuildingOwner:[],
      cidOwner:[],
      contactOwner:[],
      buildingUse:[],
      constructionYear:[],
      numberOfFloors:[],
      attic:[],
      basement:[],
      buildingStyle:[],
      structureType:[],
      materialType:[],
      roofingMaterial:[],
      sewerTreatment:[],
      wasteCollection:[],
      wasteCollectionFrequency:[],
      waterSupply:[],
      residentialUnits:[],
      commercialUnits:[],
      officeUnits:[]
      });
  }


  submit(){



    this.registerBuilding();
    // this.router.navigate(['dashboard',this.buildingId]);
    console.log(this.building)
  }
  registerBuilding(){

    this.building.structure_id = Number(sessionStorage.getItem('buildingId'));
    this.building.block_no = this.buildingForm.get('blockNumber').value;
    this.building.building_owner = this.buildingForm.get('nameOfBuildingOwner').value;
    this.building.cidOwner = this.buildingForm.get('cidOwner').value;
    this.building.cidOwner = this.buildingForm.get('cidOwner').value;
    this.building.buildingUse = this.buildingForm.get('buildingUse').value;
    this.building.constYear = this.buildingForm.get('constructionYear').value;
    this.building.floors = this.buildingForm.get('numberOfFloors').value;
    this.building.attic = this.buildingForm.get('attic').value;
    this.building.basement = this.buildingForm.get('basement').value;
    this.building.buildingStyle = this.buildingForm.get('buildingStyle').value;
    this.building.structureType = this.buildingForm.get('structureType').value;
    this.building.materialType = this.buildingForm.get('materialType').value;
    this.building.roofMaterial = this.buildingForm.get('roofingMaterial').value;
    this.building.sewerTreatment = this.buildingForm.get('sewerTreatment').value;
    //buildingOwnership
    this.building.wasteCollection = this.buildingForm.get('wasteCollection').value
    this.building.wasteCollectionFrequency = this.buildingForm.get('wasteCollectionFrequency').value
    this.building.waterSupply = this.buildingForm.get('waterSupply').value
    this.building.residentialUnits = this.buildingForm.get('residentialUnits').value
    this.building.commercialUnits = this.buildingForm.get('commercialUnits').value
    this.building.officeUnits = this.buildingForm.get('officeUnits').value


    // this.building.structure_id =Number(sessionStorage.getItem('buildingId'));
    // this.building.nameOfTheBuilding=this.buildingForm.get('nameOfTheBuildingControl').value;
    // this.building.buildingOwnership=this.buildingForm.get('buildingOwnershipControl').value;

    // this.building.nameOfTheBuildingOwner=this.buildingForm.get('nameOwnerControl').value;
    // this.building.contactNumberBuilding=this.buildingForm.get('contactNumberBuildingControl').value;
    // this.building.approvedDrawing=this.buildingForm.get('approvedDrawingsControl').value;

    // this.building.occupancyCertificate=this.buildingForm.get('occupancyCertificateControl').value;
    // this.building.associativePosition=this.buildingForm.get('associativePositionControl').value;
    // this.building.existancyStatus=this.buildingForm.get('existancyStatusControl').value;
    // this.building.yearOfConstruction=this.buildingForm.get('yearOfConstructionControl').value;
    // this.building.yearOfRenovation=this.buildingForm.get('yearOfRenovationControl').value;
    // this.building.numberOfFloors=this.buildingForm.get('numberOfFloorsControl').value;
    // this.building.attic=this.buildingForm.get('atticControl').value;
    // this.building.stilt=this.buildingForm.get('stiltControl').value;
    // this.building.jamthog=this.buildingForm.get('atticControl').value;
    // this.building.basement=this.buildingForm.get('jamthogControl').value;
    // this.building.buildingStyle=this.buildingForm.get('buildingStyleControl').value;
    // this.building.structureType=this.buildingForm.get('structureTypeControl').value;
    // this.building.roofType=this.buildingForm.get('roofTypeControl').value;
    // this.building.roofingMaterial=this.buildingForm.get('roofingMaterialControl').value;
    // this.building.emergencyExit=this.buildingForm.get('emergencyExitControl').value;
    // this.building.lift=this.buildingForm.get('liftControl').value;
    // this.building.sewerTreatment=this.buildingForm.get('sewerTreatmentControl').value;
    // this.building.wasteCollection=this.buildingForm.get('wasteCollectionControl').value;
    // this.building.dryWasteCollection=this.buildingForm.get('dryWasteCollectionControl').value;
    // this.building.wetWasteCollection=this.buildingForm.get('wetWasteCollectionControl').value;
    // this.building.buildingUse=this.buildingForm.get('buildingUseControl').value;
    // this.building.parking=this.buildingForm.get('parkingControl').value;
    // this.building.buildingRemarksstring=this.buildingForm.get('buildingRemarksControl').value;
    // this.building.user_id = Number(sessionStorage.getItem('userId'));

    this.dataService.postBuilding(this.building).subscribe(response=>{
      console.log(response.status);
      if(response.success === "true"){
        if(this.building.buildingUse === "4"){
          this.registerInstitute();
        }else if(this.building.buildingUse === "5"){
          this.registerSchool();
        }else{
          this.snackBar.open('Registration complete', '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['dashboard',this.buildingId])
        }
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
  registerSchool(){
        this.school.structure_id = Number(sessionStorage.getItem('buildingId'));
        this.school.user_id = Number(sessionStorage.getItem('userId'));
        this.school.schoolName =this.schoolForm.get('schoolNameControl').value;
        this.school.schoolEstablishmentYear =this.schoolForm.get('schoolEstablishmentYearControl').value;
        this.school.schoolStaffMale =this.schoolForm.get('schoolStaffMaleControl').value;
        this.school.schoolStaffFemale=this.schoolForm.get('schoolStaffFemaleControl').value;
        this.school.studentsMale=this.schoolForm.get('studentsMaleControl').value;
        this.school.studentsFemale=this.schoolForm.get('studentsFemaleControl').value;
        this.school.vehicles=this.schoolForm.get('vehicleNumberControl').value;
        this.dataService.postSchool(this.school).subscribe(response=>{
          if(response.success === "true"){
            this.snackBar.open('Registration complete', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar']
            });
            this.router.navigate(['dashboard',this.buildingId])
          }else if (response.success === "false"){
            this.snackBar.open('Cannot register unit', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar']
            });
          }else if(response.success === "error"){
            this.snackBar.open('Error Registering unit', '', {
              duration: 5000,
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar']
            });
          }
        });
  }
  registerInstitute(){
    this.institute.structure_id = Number(sessionStorage.getItem('buildingId'));
    this.institute.user_id = Number(sessionStorage.getItem('userId'));
    this.institute.instituteName = this.institutionForm.get('instituteNameControl').value;
    this.institute.instituteEstablishmentYear = this.institutionForm.get('instituteEstablishmentYearControl').value;
    this.institute.instituteStaffMale= this.institutionForm.get('institueStaffMaleControl').value;
    this.institute.instituteStaffFemale= this.institutionForm.get('instituteStaffFemaleControl').value;
    this.institute.instituteVehicle= this.institutionForm.get('instituteVehicleControl').value;
    this.dataService.postInstitute(this.institute).subscribe(response=>{
       if(response.success === "true"){
        this.snackBar.open('Registration complete', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['dashboard',this.buildingId])
      }else if (response.success === "false"){
        this.snackBar.open('Cannot register unit', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }else if(response.success === "error"){
        this.snackBar.open('Error Registering unit', '', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    })
  }
}
