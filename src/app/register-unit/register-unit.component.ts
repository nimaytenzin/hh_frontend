import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataService } from '../service/data.service';

interface DropDownOptions{
  id:number,
  name:string
}

interface BooleanDropdown{
  name:string,
  value:boolean
}

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
interface DropDownNumber{
  value:number
}

interface Nationality{
  id: string,
  name: string
}

export class Household{
    structure_id: number;
    head: string;
    gender: string;
    cidHead: string;
    age:number;
    martialStatus: string;
    employment:string;
    employmentOrg: string;
    yearsInService: number;
    numberHousehold: number;
    incomeEarner: number;
    householdIncome: number;
    ownHouse: boolean;
    censusDzo: string;
    distToWork: number;
    commuteCost: number;
    houseOccupation: string;
    rent: number;
    typeRent: string;
    rooms: number;
    yearsResiding: number;
    rentIncreased: boolean;
    rentWaived: boolean;
    rentWaivedPrecent: number;
    compliantResponse:string;
    waterAdequacy:string;
    parkingAedequacy:string;
    accessAdequacy:String;
    hindrance:string;
    ownType: string;
    roomsOwned:number;
    howOwned: string;
    yearAcquisition: number;
    cost: number;
    meanFinance: string;
    emi:number
}


export class FamilyMember{
  household_id:number;
  cid:string;
  age:number;
  gender:string
}


@Component({
  selector: 'app-register-unit',
  templateUrl: './register-unit.component.html',
  styleUrls: ['./register-unit.component.scss']
})

export class RegisterUnitComponent implements OnInit {
  //form question hide show logic
  showRentalUnitDetails:boolean;
  showOwnedUnitDetails:boolean;
  showPurchasedUnitDetails:boolean = false;
  showConstructedUnitDetails:boolean = false;
  showHindranceRemarks:boolean

  householdForm:FormGroup;

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
  household:Household;
  familyMember:FamilyMember;


  disableForm = false;
  displayForm = true;
  displayCamera = false;
  showOtherType = false;
  displayResidentForm = false;
  displayShopForm = false;

  displayOtherUse = false;

  numberOfRooms:DropDownNumber[]=[
    {value:1},
    {value:2},
    {value:3},
    {value:4},
    {value:5},
    {value:6},
    {value:7},
    {value:8},
    {value:9},
    {value:10},
    {value:11},
    {value:12},
    {value:13},
    {value:14},
    {value:15},
    {value:16},
    {value:17},
    {value:18},
    {value:19},
    {value:20},
    {value:21},
    {value:22},
    {value:23},
    {value:24},
    {value:25}
  ]

  //married /single /divorced /widow/widower

  maritalStatusOptions:DropDownOptions[]=[
    {id:1, name: "Married"},
    {id:2, name: "Single"},
    {id:3, name: "Divorced"},
    {id:4, name: "Widow"},
    {id:5, name: "Widower"}
  ]

  // / civil servants /corporate employee / private employee /Self employee 
  employmentOptions:DropDownOptions[]=[
    {id:1, name: "Civil Servant"},
    {id:2, name: "Corporate Employee"},
    {id:3, name: "Private Employee"},
    {id:4, name: "Self Employee"}
  ]

  yesNoOptions: DropDownOptions[]=[
    {id:1, name: "Yes"},
    {id:2, name: "No"}
  ]

  booleanDropdownOptions: BooleanDropdown[]=[
    {name:"Yes", value: true},
    {name:"No", value: false}
  ]

  genders:DropDownOptions[]=[
    {id:1, name: "Male"},
    {id:2, name: "Female"}
  ]

  dzongkhags:DropDownOptions[]=[
    {id:1, name: "Bumthang"},
    {id:2, name: "Chhukha"},
    {id:3, name: "Dagana"},
    {id:4, name: "Gasa"},
    {id:5, name: "Haa"},
    {id:6, name: "Lhuntse"},
    {id:7, name: "Mongar"},
    {id:8, name: "Paro"},
    {id:9, name: "Pema Gatshel"},
    {id:10, name: "Punakha"},
    {id:11, name: "Samdrup Jongkhar"},
    {id:12, name: "Samtse"},
    {id:13, name: "Sarpang"},
    {id:14, name: "Thimphu"},
    {id:15, name: "Trashigang"},
    {id:16, name: "Trashi Yangtse"},
    {id:17, name: "Trongsa"},
    {id:18, name: "Tsirang"},
    {id:19, name: "Wangdue Phodrang"},
    {id:20, name: "Zhemgang"},
  ]

  unitOccupationOptions:DropDownOptions[]=[
    {id:1, name: "Owned"},
    {id:2, name: "Rented"},
  ]

  // NHDCL quarters /Employer provided housing / Private rented housing/others

  rentalTypes: DropDownOptions[]=[
    {id:1, name: "NHDCL quarters"},
    {id:2, name: "Employer provided housing"},
    {id:3, name: "Private rented housing"},
    {id:4, name: "Others"}  
  ]
  unitOwnershipOptions: DropDownOptions[]=[
    {id:1, name: "Building Owner"},
    {id:2, name: "Apartment Owner"}
    
  ]

  //Purchased/gifted/inherited/constructed on my own
  meansOfOwnership:DropDownOptions[]=[
    {id:1, name: "Purchased"},
    {id:2, name: "Gifted"},
    {id:3, name: "Inherited"},
    {id:4, name: "Constructed on my Own"}
  ]

  // Loan/savings/ loan+savings/borrowed from relatives
  meansOfFinance:DropDownOptions[]=[
    {id:1, name: "Loans"},
    {id:2, name: "Savings"},
    {id:3, name: "Loan + Savings"},
    {id:4, name: "Borrowed from relatives"}
  ]

  //Qualitative options  disagree/disagree/neutral/agree/strongly disagree

  likerthScale:DropDownOptions[]=[
    {id:1, name: "Strongly Disagree"},
    {id:2, name: "Disagree"},
    {id:3, name: "Neutral"},
    {id:4, name: "Agree"},
    {id:4, name: "Strongly Agree"}
  ]

  //lack of affordable finance scheme from banks/ owns home in other parts of Bhutan / no land /higher cost of construction/Other…specify


  hindrances:DropDownOptions[]=[
    {id:1, name: "Lack of affordable finance schemes from banks"},
    {id:2, name: "Owns home in other parts of Bhutan"},
    {id:3, name: "No land"},
    {id:4, name: "higher Cost of Construction"},
    {id:4, name: "Others"}
  ]

constructor(
  private fb: FormBuilder,
  private route: ActivatedRoute,
  public dialog: MatDialog,
  private dataService: DataService,
  private router: Router,
  private snackBar: MatSnackBar
) {
  this.household = new Household();
  this.familyMember = new FamilyMember();
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

  this.householdForm = this.fb.group({
    nameHoh:[],
    genderHoh:[],
    cidHoh:[],
    ageHoh:[],
    maritalStatusHoh:[],
    employmentStatusHoh:[],
    workAgencyHoh:[],
    serviceYearHoh:[],
    numberHouseholdMembers:[],
    numberIncomeEarners:[],
    monthlyIncome:[],
    ownHouse:[],
    censusDzongkhag:[],
    workPlaceDistance:[],
    commutingCost:[],
    houseOccupationStatus:[],
    monthlyRent:[],
    rentalType:[],
    numberOfRoomsRental:[],
    livingYears:[],
    rentIncrease:[],
    rentWaiver:[],
    rentWaiverPercentage:[],
    complaintResponse:[],
    waterAdequacy:[],
    parkingAdequacy:[],
    accessAdequacy:[],
    hindrance:[],
    hindranceOthers:[],
    ownedUnitType:[],
    numberOfRoomsOwnedUnit:[],
    meansOfOwning:[],
    acquisitionYear:[],
    costPrice:[],
    financeMode:[],
    monthlyEmi:[]
    })    
}


  submit(){

    this.household.head = this.householdForm.get('nameHoh').value;
    this.household.gender = this.householdForm.get('genderHoh').value;
    this.household.cidHead = this.householdForm.get('cidHoh').value
    this.household.age = this.householdForm.get('ageHoh').value;
    this.household.martialStatus = this.householdForm.get('maritalStatusHoh').value;
    this.household.employment = this.householdForm.get('employmentStatusHoh').value;
    this.household.employmentOrg = this.householdForm.get('workAgencyHoh').value;
    this.household.yearsInService = this.householdForm.get('serviceYearHoh').value;
    this.household.numberHousehold = this.householdForm.get('numberHouseholdMembers').value;
    this.household.incomeEarner = this.householdForm.get('numberIncomeEarners').value;
    this.household.householdIncome = this.householdForm.get('monthlyIncome').value;
    this.household.ownHouse = this.householdForm.get('ownHouse').value;
    this.household.censusDzo = this.householdForm.get('censusDzongkhag').value;
    this.household.distToWork = this.householdForm.get('workPlaceDistance').value;
    this.household.commuteCost = this.householdForm.get('commutingCost').value;
    this.household.houseOccupation = this.householdForm.get('houseOccupationStatus').value;
    this.household.rent = this.householdForm.get('monthlyRent').value;
    this.household.typeRent = this.householdForm.get('rentalType').value;
    this.household.rooms = this.householdForm.get('numberOfRoomsRental').value;
    this.household.yearsResiding = this.householdForm.get('livingYears').value;
    this.household.rentIncreased = this.householdForm.get('rentIncrease').value;
    this.household.rentWaived  = this.householdForm.get('rentWaiver').value;
    this.household.rentWaivedPrecent = this.householdForm.get('rentWaiverPercentage').value;
    this.household.compliantResponse = this.householdForm.get('complaintResponse').value;
    this.household.waterAdequacy = this.householdForm.get('waterAdequacy').value;
    this.household.accessAdequacy = this.householdForm.get('accessAdequacy').value;
    this.household.parkingAedequacy = this.householdForm.get('parkingAdequacy').value;

    if(this.householdForm.get('hindrance').value === "Others"){
      this.household.hindrance = this.householdForm.get('hindranceOthers').value 
    } else{
      this.household.hindrance = this.householdForm.get('hindrance').value 

    }

    // this.household.hindrance = this.householdForm.get('hindrance').value 
    this.household.ownType = this.householdForm.get('ownedUnitType').value
    this.household.yearAcquisition = this.householdForm.get('acquisitionYear').value 
    this.household.cost = this.householdForm.get('costPrice').value 
    this.household.meanFinance = this.householdForm.get('financeMode').value 
    this.household.emi  = this.householdForm.get('monthlyEmi').value 

    /**
     * this.householdForm.get('constructionCost').value;
     * || this.householdForm.get('hindranceOthers').value
     * || this.householdForm.get('constructionYear').value;
     * || this.householdForm.get('financeModeConstructed') .value;
     * || this.householdForm.get('purchasedEmi').value;
     */



    console.log(this.household)
    // this.router.navigate(['dashboard']);

    // this.registerUnit();
    // this.snackBar.open('Unit Registration Complete', '', {
    //   duration: 5000,
    //   verticalPosition: 'bottom',
    //   panelClass: ['success-snackbar']
    // });
    // this.router.navigate(['dashboard',this.buildingId]);

  }
  // registerResident(unitid){
  //   this.resident.unit_id = unitid;
  //   this.resident.structure_id= Number(sessionStorage.getItem('buildingId'));
  //   this.resident.headHousehold = this.residentForm.get('headHouseholdControl').value;
  //   this.resident.contactNumberHead = this.residentForm.get('contactNumberHeadControl').value;
  //   this.resident.cid = this.residentForm.get('cidControl').value;
  //   this.resident.bhutaneseNationals = this.residentForm.get('bhutaneseNationalsControl').value;
  //   this.resident.nonBhutaneseNationals= this.residentForm.get('nonBhutaneseNationalsControl').value;
  //   this.resident.nationalityRemarks = this.residentForm.get('nationalityRemarksControl').value;
  //   this.resident.buddhismMale = this.residentForm.get('buddhismMaleControl').value;
  //   this.resident.buddhismFemale = this.residentForm.get('buddhismFemaleControl').value;
  //   this.resident.hinduismMale = this.residentForm.get('hinduismMaleControl').value;
  //   this.resident.hinduismFemale = this.residentForm.get('hinduismFemaleControl').value;
  //   this.resident.christianityMale = this.residentForm.get('christianityMaleControl').value;
  //   this.resident.christianityFemale = this.residentForm.get('christianityFemaleControl').value;
  //   this.resident.otherMaleR = this.residentForm.get('otherMaleRControl').value;
  //   this.resident.otherFemaleR = this.residentForm.get('otherFemaleRControl').value;
  //   this.resident.maleBelow6= this.residentForm.get('maleBelow6Control').value;
  //   this.resident.femaleBelow6 = this.residentForm.get('femaleBelow6Control').value;
  //   this.resident.male617 = this.residentForm.get('male617Control').value;
  //   this.resident.female617 = this.residentForm.get('female617Control').value;
  //   this.resident.male1824 =  this.residentForm.get('male1824Control').value;
  //   this.resident.female1824 = this.residentForm.get('female1824Control').value;
  //   this.resident.male2559 = this.residentForm.get('male2559Control').value;
  //   this.resident.female2559 = this.residentForm.get('female2559Control').value;
  //   this.resident.male60 = this.residentForm.get('male60Control').value;
  //   this.resident.female60 = this.residentForm.get('female60Control').value;

   
  //   this.resident.armedMale = this.residentForm.get("armedMaleControl").value;
  //   this.resident.armedFemale = this.residentForm.get("armedFemaleControl").value;
  //   this.resident.civilMale = this.residentForm.get("civilMaleControl").value;
  //   this.resident.civilFemale = this.residentForm.get("civilFemaleControl").value;
  //   this.resident.farmerMale = this.residentForm.get("farmerMaleControl").value;
  //   this.resident.farmerFemale = this.residentForm.get("farmerFemaleControl").value;
  //   this.resident.houseHusband = this.residentForm.get("houseHusbandControl").value;
  //   this.resident.houseWife = this.residentForm.get("houseWifeControl").value;
  //   this.resident.jobSeekerMale = this.residentForm.get("jobSeekerMaleControl").value;
  //   this.resident.jobSeekerFemale = this.residentForm.get("jobSeekerFemaleControl").value;
  //   this.resident.monk = this.residentForm.get("monkControl").value;
  //   this.resident.nun = this.residentForm.get("nunControl").value;
  //   this.resident.privateEmployeeMale = this.residentForm.get("privateEmployeeMaleControl").value;
  //   this.resident.privateEmployeeFemale = this.residentForm.get("privateEmployeeFemaleControl").value;
  //   this.resident.retireeMale = this.residentForm.get("retireeMaleControl").value;
  //   this.resident.retireeFemale = this.residentForm.get("retireeFemaleControl").value;
  //   this.resident.corporateMale = this.residentForm.get("corporateMaleControl").value;
  //   this.resident.corporateFemale = this.residentForm.get("corporateFemaleControl").value;
  //   this.resident.studentMale = this.residentForm.get("studentMaleControl").value;
  //   this.resident.studentFemale = this.residentForm.get("studentFemaleControl").value;
  //   this.resident.othersMale = this.residentForm.get("othersMaleControl").value;
  //   this.resident.othersFemale = this.residentForm.get("othersFemaleControl").value;
  //   this.resident.familyIncome = this.residentForm.get("familyIncomeControl").value;
  //   this.resident.differentlyAbled = this.residentForm.get("differentlyAbledControl").value;
  //   this.resident.electricCar = this.residentForm.get("electricCarControl").value;
  //   this.resident.hybridCar = this.residentForm.get("hybridCarControl").value;
  //   this.resident.taxi = this.residentForm.get("taxiControl").value;
  //   this.resident.resParking = this.residentForm.get("resParkingControl").value;
  //   this.resident.otherVehicle = this.residentForm.get("otherVehicleControl").value;
  //   this.resident.busTransport = this.residentForm.get("busTransportControl").value;
  //   this.resident.ownLand = this.residentForm.get("ownLandControl").value;
  //   this.resident.workPlaceSchool = this.residentForm.get("workPlaceSchoolControl").value;
  //   this.resident.ownHouse = this.residentForm.get("ownHouseControl").value;
  //   this.resident.residentRemarks = this.residentForm.get("residentRemarksControl").value;

  //   this.dataService.postResident(this.resident).subscribe(response=>{
  //     if(response.success === "true"){
  //       this.snackBar.open('Registration complete', '', {
  //         duration: 5000,
  //         verticalPosition: 'bottom',
  //         panelClass: ['success-snackbar']
  //       });
  //       this.router.navigate(['dashboard',this.buildingId])
  //     }else if (response.success === "false"){
  //       this.snackBar.open('Cannot register unit', '', {
  //         duration: 5000,
  //         verticalPosition: 'bottom',
  //         panelClass: ['error-snackbar']
  //       });
  //     }else if(response.success === "error"){
  //       this.snackBar.open('Error Registering unit', '', {
  //         duration: 5000,
  //         verticalPosition: 'bottom',
  //         panelClass: ['error-snackbar']
  //       });
  //     }
  //   })
  // }
  // registerUnit(){
  //   this.unit.structure_id=Number(sessionStorage.getItem('buildingId'));
  //   this.unit.unitNumber = this.multiUnitForm.get('multiUnitIdControl').value;
  //   this.unit.unitName = this.multiUnitForm.get('unitNameControl').value;
  //   this.unit.occupancyStatus = this.multiUnitForm.get('occupancyStatusControl').value;
  //   this.unit.floorLevel = this.multiUnitForm.get('floorLevelControl').value;
  //   this.unit.unitOwnership = this.multiUnitForm.get('unitOwnershipControl').value;
  //   this.unit.rent = this.multiUnitForm.get('rentControl').value;

  //   this.unitUse = this.multiUnitForm.get('multiUnitUseControl').value;
  //   if(this.unitUse=== "Others"){
  //     this.unitUse = this.multiUnitForm.get('otherUseRemarkControl').value;
  //   }
  //   this.unit.unitUse = this.unitUse;
  //   this.unit.remarks = this.multiUnitForm.get('multiUnitRemarksControl').value;
  //   this.unit.contact = this.contactForm.get('contactControl').value;
  //   this.unit.user_id = Number(sessionStorage.getItem('userId'));

  //   this.dataService.postUnit(this.unit).subscribe(response=>{
  //     if(response.success === "true"){
  //       this.unitId = response.data.id
  //       this.dataService.postProgress(this.buildingId).subscribe(resp=>{
  //         if(resp['success']==="true"){
  //           console.log("marked progress")
  //         }
  //       });
  //       if(this.unitUse === "Residential"){
  //         this.registerResident(this.unitId)
  //       }else{
  //         this.snackBar.open('Registration complete', '', {
  //           duration: 5000,
  //           verticalPosition: 'bottom',
  //           panelClass: ['success-snackbar']
  //         });
  //         this.router.navigate(['dashboard',this.buildingId])
  //       }
  //     }else if (response.success === "false"){
  //       this.snackBar.open('Cannot register unit', '', {
  //         duration: 5000,
  //         verticalPosition: 'bottom',
  //         panelClass: ['error-snackbar']
  //       });
  //     }else if(response.success === "error"){
  //       this.snackBar.open('Error Registering unit', '', {
  //         duration: 5000,
  //         verticalPosition: 'bottom',
  //         panelClass: ['error-snackbar']
  //       });
  //     }
  //   });
  // }


houseOccupationListener(e){
  if(e.value === "Owned"){
    this.showOwnedUnitDetails = true;
    this.showRentalUnitDetails = false;
  }else{  
    this.showOwnedUnitDetails = false;
    this.showRentalUnitDetails = true;
  }
}



meansOfOwnershipListner(e){ 
  if(e.value === "Constructed on my Own" || e.value === "Purchased"){
    this.showPurchasedUnitDetails = true;
  }else{
    this.showPurchasedUnitDetails = false;
  }
}

hindranceRemarksShow(e){
  if(e.value === "Others"){
    this.showHindranceRemarks = true
   
  }else{
    this.showHindranceRemarks = false
  }
}
}
