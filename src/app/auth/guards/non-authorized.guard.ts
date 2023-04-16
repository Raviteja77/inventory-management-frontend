import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NonAuthorizedGuard implements CanActivate {
  constructor(private router: Router, private auth_service: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      this.auth_service.isUserChanged$.subscribe(_ => {
        const userState = this.auth_service.getStoredUserStateManagement();
        if (userState.token) {
          this.router.navigate(['/items']);
          return false;
        }
        return true;
      });
      return true;
  }
}
