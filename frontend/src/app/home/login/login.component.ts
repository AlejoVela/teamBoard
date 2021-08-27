import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginData: any;
  public message: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;  

  constructor(
    private _userServices: UserService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.message = '';
    this.loginData = {};
  }

  ngOnInit(): void {
  }

  login () {
    if (
      !this.loginData.email ||
      !this.loginData.password
    ) {
      this.message = 'Failed process: Incomplete Data';
      console.log(this.message);
      this.openSnackBarError();
      this.loginData = {};
    } else {
      this._userServices.login(this.loginData).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken); //cuando el usuario se registra, guarda el token en el localstorage
          this._router.navigate(['/listTask']); //después lo redirigimos al componente saveTask
          this.loginData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      ); //suscribe nos dice que nos repondio el backend al frontend
    }
  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds *1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
