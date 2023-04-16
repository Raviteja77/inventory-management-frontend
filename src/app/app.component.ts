import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth/auth.service';
import { buttonText } from './shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  buttonText = buttonText;

  token: any;
  isAuthorized!: boolean;
  userName: string = '';

  constructor(private auth_service: AuthService) {
    this.auth_service.isUserChanged$.subscribe(_ => {
      const userState = this.auth_service.getStoredUserStateManagement();
      this.token = userState.token;
      this.isAuthorized = userState.isAuthorized;
    })
  }

  logoutUser(): void {
    this.auth_service.logout(this.token)
  }
}
