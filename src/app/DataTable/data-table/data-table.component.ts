import { Component,  ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/DataTable/dialog-box/dialog-box.component';

export interface UsersData {
  household_id:number;
  cid: string;
  age: number;
  gender:string;

}

const ELEMENT_DATA: UsersData[] = [
  // {cid:"10302000402", age: 24, gender: "Male"},
  // {cid:"10302000402", age: 24, gender: "Male"},
  // {cid:"10302000402", age: 24, gender: "Male"},
  // {cid:"10302000402", age: 24, gender: "Male"}
];

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent  {
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  
  displayedColumns: string[] = ['cid', 'age', 'gender', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    this.dataSource.push({
      cid:row_obj.cid,
      age:row_obj.age,
      gender:row_obj.gender,
      household_id:123
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.cid == row_obj.cid){
        value.gender = row_obj.gender;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.cid != row_obj.cid;
    });
  }

  logData(){
    console.log(this.dataSource)
  }
}
