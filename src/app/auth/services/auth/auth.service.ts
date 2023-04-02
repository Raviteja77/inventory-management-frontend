import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$ = new BehaviorSubject<any>('');
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(private http: HttpClient) { }

  register(postRegisterDetails: any) {
    return this.http.post(environment.endpoints.register, {
      email: postRegisterDetails.email,
      firstName: postRegisterDetails.firstName,
      lastName: postRegisterDetails.lastName,
      password: postRegisterDetails.password,
      status: true,
    }).subscribe({
      next: (response) =>
        console.log(response),
      error: (e) => console.error(e)
    });
  }

  login(postLoginDetails: any) {
    return this.http.post(environment.endpoints.login, {
      username: postLoginDetails.email,
      password: postLoginDetails.password,
    }).subscribe({
      next: (response: any) => {
        this.isAuthorized$$.next(response.token.isNotEmpty)
        console.log(response)
      },
      error: (e) => console.error(e)
    });
  }

  logout(authorizationToken: string) {
    return this.http.delete(environment.endpoints.logout, {
      headers: { Authorization: authorizationToken },
    });
  }
}