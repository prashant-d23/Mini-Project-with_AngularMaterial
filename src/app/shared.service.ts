import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { }

  baseUrl:string = 'https://devrunner.co.in/machine_test/index.php/web_api/Users/'


  getDataFromServer(endPoint:string){

    const url = this.baseUrl + endPoint
    return this.http.get(url);
  }

  getLogIn(endPoint:string,email:string,password:string){
    let url = this.baseUrl + endPoint;
    let queryParams = new HttpParams().set('user_email',email).set('user_pwd',password)
    return this.http.get(url,{params:queryParams});
  }

  saveDataToServer(endPoint:string,body:any){
    const url = this.baseUrl + endPoint;
    return this.http.post(url,body);
  }

  updateData(endPoint:string,body:any){
    const url = this.baseUrl + endPoint;
    return this.http.put(url,body);
  }

  deleteData(endPoint:string,requestBody:any){
    const url = this.baseUrl + endPoint;
    return this.http.delete(url,{"body" : requestBody})
  }
}
