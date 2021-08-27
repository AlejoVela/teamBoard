import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private env: string;

  constructor(private _http : HttpClient) { 
    this.env = environment.APP_URL;
  } 

  login(user: any) {
    return this._http.post<any>(this.env + 'user/login', user);
  }
  registerUser(user: any) {
    return this._http.post<any>(this.env + 'user/registerUser', user);
  }
  loggedIn(){
    return !!localStorage.getItem('token');//truco para decir si existe o no, retorna true si existe
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
