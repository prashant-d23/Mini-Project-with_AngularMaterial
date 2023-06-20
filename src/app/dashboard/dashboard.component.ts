import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from '../shared.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { DialogboxformComponent } from '../dialogboxform/dialogboxform.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


  displayedColumns : string[] = ["user_id","user_name","user_email","user_phone_no","user_pwd","user_gender","user_reg_date","actions"]
  dataSource!: MatTableDataSource<any>;

  //using viewchild we got the matpaginator in ts file
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(private http:SharedService, private dialog:MatDialog){

  }
  ngOnInit(){
    this.getUserList();
  }

  getUserList(){
    this.http.getDataFromServer('').subscribe((res:any)=>{
      console.log(res);
      if(res && res.status == 1 && res.data.length > 0){
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(rowData:any){
    console.log(rowData)
    let config = new MatDialogConfig();//we can apply css using this;
    config.width = "600px"
    config.height = "600px"

    config.data =
     {
      'action' : "EDIT",
      "rowData" : rowData
    }
    // config.panelClass = 'modal'
    this.dialog.open(DialogboxformComponent,config)
  }

  deleteData(row:any){
    let obj = {
      "user_id" : row.user_id
    }
    this.http.deleteData('remove_user/',obj).subscribe((response:any)=>{

    })
  }
}
