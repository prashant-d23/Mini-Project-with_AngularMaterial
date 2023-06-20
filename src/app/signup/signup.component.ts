import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm!:FormGroup;

  selectedId!:any;

  constructor(private fb:FormBuilder, private http:SharedService,private route:ActivatedRoute, private router:Router){}

  ngOnInit() {
    this.createForm();

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

  submitForm(){
    console.log(this.userForm.value);
    var obj = new FormData();

    obj.set('user_name',this.userForm.get('user_name')?.value)
    obj.set('user_email',this.userForm.get('user_email')?.value)
    obj.set('user_contact_no',this.userForm.get('user_phone_no')?.value)
    obj.set('user_password',this.userForm.get('user_pwd')?.value)
    obj.set('user_gender',this.userForm.get('user_gender')?.value)

    if(this.selectedId == null){
      this.http.saveDataToServer('/Register',obj).subscribe((res:any)=>{
        console.log("Posted ", res);
        alert("Signup Successfull");
        this.userForm.reset();
        this.router.navigate(['/login'])


      })
    }else{
      // this.updateId();
    }
  }

}
