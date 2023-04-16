import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuthorized!: boolean;

  constructor(private auth_service: AuthService) {
    this.auth_service.isUserChanged$.subscribe(_ => {
      const userState = this.auth_service.getStoredUserStateManagement();
      this.isAuthorized = userState.isAuthorized;
    })
  }

}
