import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _userServices: UserService, private _router: Router) {}

  canActivate(): boolean {
    if ( !this._userServices.loggedIn() ) {
      this._router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
  
}
