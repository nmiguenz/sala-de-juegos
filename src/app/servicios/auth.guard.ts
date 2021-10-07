import { AuthService } from 'src/app/servicios/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  usuario : any;

  constructor(private authService : AuthService){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return false;

    if(this.authService.estaLogueado){
      return true;
    }
    else{
      return false;
    }

  }
}
