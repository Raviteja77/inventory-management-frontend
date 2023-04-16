import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userStateManagement: User = {
    token: '',
    isAuthorized: false,
    errorMessage: ''
  }

  private isUserChanged$$ = new BehaviorSubject<boolean>(false);
  public isUserChanged$ = this.isUserChanged$$.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  setUserStateManagement() {
    sessionStorage.setItem('userStateManagement', JSON.stringify(this.userStateManagement));
  }

  getStoredUserStateManagement() {
    const storedList = sessionStorage.getItem('userStateManagement');
    return storedList ? JSON.parse(storedList) : [];
  }

  register(postRegisterDetails: any) {
    return this.http.post(environment.endpoints.register, {
      email: postRegisterDetails.email,
      firstName: postRegisterDetails.firstName,
      lastName: postRegisterDetails.lastName,
      password: postRegisterDetails.password,
      status: true,
    }).subscribe({
      next: (response: any) => {
        console.log(response)
        if(response === 208) {
          alert("The entered email is already registered")
        } else if(response == 201) {
          this.router.navigate(['/login']);
        }
      },
      error: (e) => console.error(e)
    });
  }

  login(postLoginDetails: any) {
    return this.http.post(environment.endpoints.login, {
      username: postLoginDetails.email,
      password: postLoginDetails.password,
    }).subscribe({
      next: (response: any) => {
        this.userStateManagement.token = response.token;
        this.userStateManagement.isAuthorized = true;
        this.userStateManagement.errorMessage = '';
        this.setUserStateManagement();
        this.isUserChanged$$.next(true);
        console.log(response.token);
      },
      error: (e) => {
        this.userStateManagement.token = '';
        this.userStateManagement.isAuthorized = false;
        this.userStateManagement.errorMessage = 'Error in logging the user';
        this.setUserStateManagement();
        this.isUserChanged$$.next(true);
      }
    });
  }

  logout(authorizationToken: string) {
    return this.http.post(environment.endpoints.logout, {
      headers: { Authorization: authorizationToken },
    }).subscribe({
      next: (response: any) => {
        this.userStateManagement.token = '';
        this.userStateManagement.isAuthorized = false;
        this.userStateManagement.errorMessage = '';
        sessionStorage.clear();
        this.isUserChanged$$.next(true);
      },
      error: (e) => console.log(e)
    });
  }
}