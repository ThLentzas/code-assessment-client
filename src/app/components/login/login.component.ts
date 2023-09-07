import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "../../models/auth/login-request.model";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest: LoginRequest = {};

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  onSubmit(form: NgForm) {
    this.authService.loginUser(this.loginRequest).subscribe({
        next: authResponse => {
          localStorage.setItem('userData', JSON.stringify(authResponse));
          this.router.navigate((['analysis']));
          this.notificationService.onSuccess("Welcome dog");
          form.reset();
        }
      }
    )
  }
}
