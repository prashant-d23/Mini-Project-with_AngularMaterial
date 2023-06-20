import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm!:FormGroup;
  errorMessage:string = '';

  constructor(private fb:FormBuilder, private route:Router, private http:SharedService, private router:Router){}

  ngOnInit(){
    this.createForm();
  }
  createForm(){
    this.logInForm = this.fb.group({
      "user_email" : ['',[Validators.required]],
      "user_pwd" : ['',[Validators.required]]
    })
  }

  get email(){
    return this.logInForm.get('user_email')
  }
  get password(){
    return this.logInForm.get('user_pwd')
  }

  logIn(){
    console.log(this.logInForm.value)
    let data = this.logInForm.value;
    this.http.getLogIn('login?',data.user_email,data.user_pwd).subscribe((res:any)=>{
      if(res && res.status == 0){
        this.errorMessage = res.message;
      }else if(res && res.status == 1){
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
