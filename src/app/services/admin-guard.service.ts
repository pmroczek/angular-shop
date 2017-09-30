import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  public canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }
}
