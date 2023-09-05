import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "../../models/auth/login-request.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(form: NgForm) {
    this.loginRequest = form.value;
    console.log(this.loginRequest);
    this.authService.loginUser(this.loginRequest).subscribe({
        next: authResponse => {
          localStorage.setItem('userData', JSON.stringify(authResponse));
          this.router.navigate((['analysis']));
          console.log(this.loginRequest);
          form.reset();
        }
      }
    )
  }
}