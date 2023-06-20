import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogboxform',
  templateUrl: './dialogboxform.component.html',
  styleUrls: ['./dialogboxform.component.css']
})
export class DialogboxformComponent implements OnInit {

  userForm!:FormGroup;

  constructor(private fb:FormBuilder, private http:SharedService,private route:ActivatedRoute, private router:Router, public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any){

    }

  ngOnInit() {
    console.log("data",this.data);
    this.createForm();
    if(this.data != undefined && this.data.action == "EDIT"){
      this.userForm.patchValue(this.data.rowData)
    }

  }

  createForm(){
    this.userForm = this.fb.group({
      'user_name' : ['',[Validators.required]],
      'user_email' : ['',[Validators.required]],
      'user_phone_no' : ['',[Validators.required]],
      'user_pwd' : ['',[Validators.required]],
      'user_gender' : ['',[Validators.required]],
    })
  }

  updateForm(){
    console.log(this.userForm.value);
    var obj = new FormData();

    obj.set('user_name',this.userForm.get('user_name')?.value)
    obj.set('user_email',this.userForm.get('user_email')?.value)
    obj.set('user_contact_no',this.userForm.get('user_phone_no')?.value)
    obj.set('user_password',this.userForm.get('user_pwd')?.value)
    obj.set('user_gender',this.userForm.get('user_gender')?.value)
  }

  updateUserData(){
    this.http.updateData('update_user',this.userForm.value).subscribe((response:any)=>{
      console.log(response)
    })
  }


}
