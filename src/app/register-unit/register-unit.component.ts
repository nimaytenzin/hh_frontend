import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';


// Multi Unit Interface
interface Occupancy{
  id: string,
  name: string
}

interface FloorLevel{
  id: string,
  name: string
}

interface UnitOwnership{
  id: string,
  name: string
}

interface UnitUse{
  id: string,
  name: string
}


// residential interface
interface Parking{
  id: string,
  name: string
}
interface BusTransport{
  id: string,
  name: string
}

interface TaxiTransport{
  id: string,
  name: string
}

interface OwnLand{
  id: string,
  name: string
}

interface ownHouse{
  id: string,
  name: string
}

interface Religion{
  id: string,
  name: string
}

interface Nationality{
  id: string,
  name: string
}

export class Unit{
  structure_id:number;
  unitNumber:string;
  unitName:string;
  occupancyStatus:string;
  floorLevel:string;
  unitOwnership:string;
  rent:string;
  unitUse:string;
  remarks:string;
  contact:string;
  user_id:number;
}
export class Resident{
  unit_id:number;
  structure_id:number;
  headHousehold:string;
  contactNumberHead:string;
  cid:string;
  bhutaneseNationals:string;
  nonBhutaneseNationals
  nationalityRemarks:string;
  buddhismMale:string;
  buddhismFemale:string;
  hinduismMale:string;
  hinduismFemale:string;
  christianityMale:string;
  christianityFemale:string;
  otherMaleR:string;
  otherFemaleR:string;

  maleBelow6:string;
  femaleBelow6:string;
  male617:string;
  female617:string;
  male1824:string;
  female1824:string;
  male2559:string;
  female2559:string;
  male60:string;
  female60:string;
  armedMale:string;
  armedFemale:string;
  civilMale:string;
  civilFemale:string;
  farmerMale:string;
  farmerFemale:string;
  houseHusband:string;
  houseWife:string;
  jobSeekerMale:string;
  jobSeekerFemale:string;
  monk:string;
  nun:string;
  privateEmployeeMale:string;
  privateEmployeeFemale:string;
  retireeMale:string;
  retireeFemale:string;
  corporateMale:string;
  corporateFemale:string;
  studentMale:string;
  studentFemale:string;
  othersMale:string;
  othersFemale:string;
  familyIncome:string;
  differentlyAbled:string;
  electricCar:string;
  hybridCar:string;
  taxi:string;
  otherVehicle:string;
  resParking:string;
  workPlaceSchool:string;
  busTransport:string;
  ownLand:string;
  ownHouse:string;
  residentRemarks:string;
}


@Component({
  selector: 'app-register-unit',
  templateUrl: './register-unit.component.html',
  styleUrls: ['./register-unit.component.scss']
})

export class RegisterUnitComponent implements OnInit {
  multiUnitForm: FormGroup;
  residentForm: FormGroup;
  contactForm: FormGroup;
  showScanner = false;
  buildingId: number;
  qrId: string;
  houseHoldId: number;
  unitUse: string;
  shopUse: string;
  unitId: number;
  multiUnitUseControl: FormGroup;
  unit:Unit;
  resident:Resident;

  latitude: number;
  longitude: number;
  accuracy: number;

  disableForm = false;
  displayForm = true;
  displayCamera = false;
  showOtherType = false;
  displayResidentForm = false;
  displayShopForm = false;
  displayOtherUse = false;

//Multi Units
occupancyStatus: Occupancy[]=[
  {id:'1', name:"Vacant"},
  {id:'2', name:"Occupied"},  
];
floorLevel: FloorLevel[]=[
  {id:'1', name:"Basement 2"},
  {id:'2', name:"Basement 1"},
  {id:'3', name:"Stilts"},
  {id:'4', name:"Ground Floor"},
  {id:'5', name:"First Floor"},
  {id:'6', name:"Second Floor"},
  {id:'7', name:"Third Floor"},
  {id:'8', name:"Fourth Floor"},
  {id:'9', name:"Fifth Floor"},
  {id:'10', name:"Sixth Floor"},
  {id:'11', name:"Attic"},
  {id:'12', name:"Jamthog"},
];
unitOwnership:UnitOwnership[]=[
  {id:'1', name:"Owned"},
  {id:'2', name:"Rented"},  
];
multiUnitUse:UnitUse[]=[
  {id:'56', name:"Residential"},
  {id:'1', name:"Agricultural Shed"},
  {id:'2', name:"Animal Shelter"},
  {id:'3', name:"Art Gallery"},
  {id:'4', name:"Auditorium"},
  {id:'5', name:"Bakery"},
  {id:'6', name:"Bank"},
  {id:'7', name:"Bar"},
  {id:'9', name:"Car Showroom"},
  {id:'10', name:"Carwash"},
  {id:'11', name:"Check Post"},
  {id:'12', name:"Chhukhor Mani"},
  {id:'13', name:"Clothing Shop"},
  {id:'14', name:"Cobler"},
  {id:'16', name:"Community Center"},
  {id:'17', name:"Conferenced Hall"},
  {id:'18', name:"Cottage Industry"},
  {id:'19', name:"Dairy Shop"},
  {id:'20', name:"Daycare Center"},
  {id:'21', name:"Drayang"},
  {id:'22', name:"Dry Cleaning/Laundry Room"},
  {id:'23', name:"Electronics/Repair Shop"},
  {id:'24', name:"Fire Station"},
  {id:'25', name:"Furniture Showroom"},
  {id:'26', name:"Game Parlour"},
  {id:'27', name:"Garage"},
  {id:'28', name:"General Shop"},
  {id:'29', name:"Godown/Store"},
  {id:'30', name:"Gold/BlackSmith"},
  {id:'31', name:"Grocery Shop"},
  {id:'32', name:"Gym"},
  {id:'33', name:"Handicraft"},
  {id:'34', name:"Hardware Shop"},
  {id:'35', name:"Hot Stone Bath"},
  {id:'36', name:"Internet Cafe"},
  {id:'37', name:"Library"},
  {id:'38', name:"Market Shed"},
  {id:'39', name:"Meat Shop"},
  {id:'40', name:"Mess"},
  {id:'41', name:"Mill"},
  {id:'42', name:"Museum"},
  {id:'43', name:"Music Studio"},
  {id:'44', name:"Night Club"},
  {id:'45', name:"Office"},
  {id:'46', name:"Pan Shop"},
  {id:'47', name:"Parking"},
  {id:'48', name:"Petrol Pump"},
  {id:'49', name:"Pharmacy"},
  {id:'50', name:"Photo Studio"},
  {id:'51', name:"Police Station"},
  {id:'52', name:"Public Toilet"},
  {id:'53', name:"Religious"},
  {id:'54', name:"Religious Item Shop"},
  {id:'57', name:"Resort/Hotel"},
  {id:'58', name:"Restaurant"},
  {id:'60', name:"Salon/Barber Shop"},
  {id:'61', name:"Sawmill"},
  {id:'62', name:"Scrap Yard"},
  {id:'63', name:"Show Room"},
  {id:'64', name:"Snooker Room"},
  {id:'65', name:"Spa and Sauna"},
  {id:'66', name:"Sports Shop"},
  {id:'67', name:"Sportsplex"},
  {id:'68', name:"Stationary Shop"},
  {id:'69', name:"Store"},
  {id:'70', name:"Swimming Pool"},
  {id:'71', name:"Tailor Shop"},
  {id:'72', name:"Toilet"},
  {id:'73', name:"Vegetable Shop"},
  {id:'74', name:"Workshop"},
  {id:'75', name:"WineShop"},
  {id:'76', name:"Others"},
];

//reidential
resParking:Parking[]=[
  {id:'1', name:"Designated"},
  {id:'2', name:"Un-designated"},
  {id:'3', name:"Private"},
]

busTransport:BusTransport[]=[
  {id:'1', name:"Yes"},
  {id:'2', name:"No"},
];

householdIncome:BusTransport[]=[
  {id:'1', name:"Below 10,000"},
  {id:'2', name:"10,000 - 20,000"},
  {id:'2', name:"20,000 - 30,000"},
  {id:'2', name:"30,000 - 40,000"},
  {id:'2', name:"40,000 - 50,000"},
  {id:'2', name:"Above 50,000"},

]

ownLand:OwnLand[]=[
  {id:'1', name:"Yes"},
  {id:'2', name:"No"},
];

ownHouse:ownHouse[]=[
  {id:'1', name:"Yes"},
  {id:'2', name:"No"},
];

religion:Religion[] =[
  {id:'1', name:"Buddhism"},
  {id:'2', name:"Hinduism"},
  {id:'3', name:"Christianity"},
  {id:'5', name:"Other"},
];

nationality:Nationality[] =[
  {id:'1', name:"Bhutanese"},
  {id:'2', name:"Non-Bhutanese"},
];
//


constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  public dialog: MatDialog,
  private dataService: DataService,
  private router: Router,
  private snackBar: MatSnackBar
) {
  this.unit = new Unit();
  this.resident = new Resident();
}

ngOnInit() {
  this.buildingId = Number(sessionStorage.getItem('buildingId'));
  this.reactiveForms();
}

changeDiff($event){
  this.displayResidentForm = false;
  this.displayShopForm = false;
  this.displayOtherUse = false;
  if($event.value === "Residential"){
    this.displayResidentForm=true;
  }else if($event.value === "Others"){
    this.displayOtherUse =true;
    this.displayShopForm = true;
  }else{ 
    this.displayShopForm = true;
  }
};

 // control
reactiveForms() {
  this.multiUnitForm = this.fb.group({
    multiUnitIdControl:[],
    unitNameControl:[],
    occupancyStatusControl:[],
    floorLevelControl:[],
    unitOwnershipControl:[],
    rentControl:[],
    multiUnitUseControl:[],
    otherUseRemarkControl:[],
    multiUnitRemarksControl:[]
  });
  this.residentForm = this.fb.group({
    headHouseholdControl:[],
    contactNumberHeadControl:[],
    cidControl:[],
    bhutaneseNationalsControl:[],
    nonBhutaneseNationalsControl:[],
    nationalityRemarksControl:[],
    buddhismMaleControl:[],
    buddhismFemaleControl:[],
    hinduismMaleControl:[],
    hinduismFemaleControl:[],
    christianityMaleControl:[],
    christianityFemaleControl:[],
    otherMaleRControl:[],
    otherFemaleRControl:[],
    maleBelow6Control:[],
    femaleBelow6Control:[],
    male617Control:[],
    female617Control:[],
    male1824Control:[],
    female1824Control:[],
    male2559Control:[],
    female2559Control:[],
    male60Control:[],
    female60Control:[],

    armedMaleControl:[],
    armedFemaleControl:[],
    civilMaleControl:[],
    civilFemaleControl:[],
    farmerMaleControl:[],
    farmerFemaleControl:[],
    houseHusbandControl:[],
    houseWifeControl:[],
    jobSeekerMaleControl:[],
    jobSeekerFemaleControl:[],
    monkControl:[],
    nunControl:[],
    privateEmployeeMaleControl:[],
    privateEmployeeFemaleControl:[],
    retireeMaleControl:[],
    retireeFemaleControl:[],
    corporateMaleControl:[],
    corporateFemaleControl:[],
    studentMaleControl:[],
    studentFemaleControl:[],
    othersMaleControl:[],
    othersFemaleControl:[],
    familyIncomeControl:[],
    differentlyAbledControl:[],
    electricCarControl:[],
    hybridCarControl:[],
    taxiControl:[],
    resParkingControl:[],
    otherVehicleControl:[],
    busTransportControl:[],
    ownLandControl:[],
    workPlaceSchoolControl:[],
    ownHouseControl:[],
    residentRemarksControl:[],
    });
  this.contactForm= this.fb.group({
      contactControl:[],
  });
    
}


  submit(){
    // this.router.navigate(['dashboard']);
    this.registerUnit();
    // this.snackBar.open('Unit Registration Complete', '', {
    //   duration: 5000,
    //   verticalPosition: 'bottom',
    //   panelClass: ['success-snackbar']
    // });
    // this.router.navigate(['dashboard',this.buildingId]);
  }
  registerResident(unitid){
    this.resident.unit_id = unitid;
    this.resident.structure_id= Number(sessionStorage.getItem('buildingId'));
    this.resident.headHousehold = this.residentForm.get('headHouseholdControl').value;
    this.resident.contactNumberHead = this.residentForm.get('contactNumberHeadControl').value;
    this.resident.cid = this.residentForm.get('cidControl').value;
    this.resident.bhutaneseNationals = this.residentForm.get('bhutaneseNationalsControl').value;
    this.resident.nonBhutaneseNationals= this.residentForm.get('nonBhutaneseNationalsControl').value;
    this.resident.nationalityRemarks = this.residentForm.get('nationalityRemarksControl').value;
    this.resident.buddhismMale = this.residentForm.get('buddhismMaleControl').value;
    this.resident.buddhismFemale = this.residentForm.get('buddhismFemaleControl').value;
    this.resident.hinduismMale = this.residentForm.get('hinduismMaleControl').value;
    this.resident.hinduismFemale = this.residentForm.get('hinduismFemaleControl').value;
    this.resident.christianityMale = this.residentForm.get('christianityMaleControl').value;
    this.resident.christianityFemale = this.residentForm.get('christianityFemaleControl').value;
    this.resident.otherMaleR = this.residentForm.get('otherMaleRControl').value;
    this.resident.otherFemaleR = this.residentForm.get('otherFemaleRControl').value;
    this.resident.maleBelow6= this.residentForm.get('maleBelow6Control').value;
    this.resident.femaleBelow6 = this.residentForm.get('femaleBelow6Control').value;
    this.resident.male617 = this.residentForm.get('male617Control').value;
    this.resident.female617 = this.residentForm.get('female617Control').value;
    this.resident.male1824 =  this.residentForm.get('male1824Control').value;
    this.resident.female1824 = this.residentForm.get('female1824Control').value;
    this.resident.male2559 = this.residentForm.get('male2559Control').value;
    this.resident.female2559 = this.residentForm.get('female2559Control').value;
    this.resident.male60 = this.residentForm.get('male60Control').value;
    this.resident.female60 = this.residentForm.get('female60Control').value;

   
    this.resident.armedMale = this.residentForm.get("armedMaleControl").value;
    this.resident.armedFemale = this.residentForm.get("armedFemaleControl").value;
    this.resident.civilMale = this.residentForm.get("civilMaleControl").value;
    this.resident.civilFemale = this.residentForm.get("civilFemaleControl").value;
    this.resident.farmerMale = this.residentForm.get("farmerMaleControl").value;
    this.resident.farmerFemale = this.residentForm.get("farmerFemaleControl").value;
    this.resident.houseHusband = this.residentForm.get("houseHusbandControl").value;
    this.resident.houseWife = this.residentForm.get("houseWifeControl").value;
    this.resident.jobSeekerMale = this.residentForm.get("jobSeekerMaleControl").value;
    this.resident.jobSeekerFemale = this.residentForm.get("jobSeekerFemaleControl").value;
    this.resident.monk = this.residentForm.get("monkControl").value;
    this.resident.nun = this.residentForm.get("nunControl").value;
    this.resident.privateEmployeeMale = this.residentForm.get("privateEmployeeMaleControl").value;
    this.resident.privateEmployeeFemale = this.residentForm.get("privateEmployeeFemaleControl").value;
    this.resident.retireeMale = this.residentForm.get("retireeMaleControl").value;
    this.resident.retireeFemale = this.residentForm.get("retireeFemaleControl").value;
    this.resident.corporateMale = this.residentForm.get("corporateMaleControl").value;
    this.resident.corporateFemale = this.residentForm.get("corporateFemaleControl").value;
    this.resident.studentMale = this.residentForm.get("studentMaleControl").value;
    this.resident.studentFemale = this.residentForm.get("studentFemaleControl").value;
    this.resident.othersMale = this.residentForm.get("othersMaleControl").value;
    this.resident.othersFemale = this.residentForm.get("othersFemaleControl").value;
    this.resident.familyIncome = this.residentForm.get("familyIncomeControl").value;
    this.resident.differentlyAbled = this.residentForm.get("differentlyAbledControl").value;
    this.resident.electricCar = this.residentForm.get("electricCarControl").value;
    this.resident.hybridCar = this.residentForm.get("hybridCarControl").value;
    this.resident.taxi = this.residentForm.get("taxiControl").value;
    this.resident.resParking = this.residentForm.get("resParkingControl").value;
    this.resident.otherVehicle = this.residentForm.get("otherVehicleControl").value;
    this.resident.busTransport = this.residentForm.get("busTransportControl").value;
    this.resident.ownLand = this.residentForm.get("ownLandControl").value;
    this.resident.workPlaceSchool = this.residentForm.get("workPlaceSchoolControl").value;
    this.resident.ownHouse = this.residentForm.get("ownHouseControl").value;
    this.resident.residentRemarks = this.residentForm.get("residentRemarksControl").value;

    this.dataService.postResident(this.resident).subscribe(response=>{
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
  registerUnit(){
    this.unit.structure_id=Number(sessionStorage.getItem('buildingId'));
    this.unit.unitNumber = this.multiUnitForm.get('multiUnitIdControl').value;
    this.unit.unitName = this.multiUnitForm.get('unitNameControl').value;
    this.unit.occupancyStatus = this.multiUnitForm.get('occupancyStatusControl').value;
    this.unit.floorLevel = this.multiUnitForm.get('floorLevelControl').value;
    this.unit.unitOwnership = this.multiUnitForm.get('unitOwnershipControl').value;
    this.unit.rent = this.multiUnitForm.get('rentControl').value;

    this.unitUse = this.multiUnitForm.get('multiUnitUseControl').value;
    if(this.unitUse=== "Others"){
      this.unitUse = this.multiUnitForm.get('otherUseRemarkControl').value;
    }
    this.unit.unitUse = this.unitUse;
    this.unit.remarks = this.multiUnitForm.get('multiUnitRemarksControl').value;
    this.unit.contact = this.contactForm.get('contactControl').value;
    this.unit.user_id = Number(sessionStorage.getItem('userId'));

    this.dataService.postUnit(this.unit).subscribe(response=>{
      if(response.success === "true"){
        this.unitId = response.data.id
        this.dataService.postProgress(this.buildingId).subscribe(resp=>{
          if(resp['success']==="true"){
            console.log("marked progress")
          }
        });
        if(this.unitUse === "Residential"){
          this.registerResident(this.unitId)
        }else{
          this.snackBar.open('Registration complete', '', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['dashboard',this.buildingId])
        }
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

getLocation(): void {
  if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      navigator.geolocation.getCurrentPosition((position) => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
        this.accuracy = position.coords.accuracy;
      }, error => {
        console.error('No support for geolocation');
      }, options);
  } else {
     console.error('No support for geolocation');
  }
}
}
