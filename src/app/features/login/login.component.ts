import { Component } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  manager = {
    email: '',
    password: ''
  }

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private auth_Service: AuthService) { }

  onFormSubmit(form: NgForm): void {
    this.auth_Service.login(form.form.value);
  }

}
