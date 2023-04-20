import { Component } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  manager = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  }

  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(private auth_Service: AuthService) { }

  onFormSubmit(form: NgForm): void {
    if(form.form.value.firstName != '' && form.form.value.lastName != '' && form.form.value.email != '' && form.form.value.password != '') {
      this.auth_Service.register(form.form.value);
    } else {
      alert("Please enter all the required fields");
    }
  }

}
