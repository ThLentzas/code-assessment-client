import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "../../models/auth/login-request.model";
import {NotificationService} from "../../services/notification.service";
import {StorageService} from "../../services/storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = {};

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private storageService: StorageService,
              private router: Router) {
  }

  /*
    We have to clean the token from the local storage in case a user manually navigates to /login.
   */
  ngOnInit(): void {
    this.storageService.clearAll();
  }

  onLogin(form: NgForm) {
    this.authService.loginUser(this.loginRequest).subscribe({
        next: authResponse => {
          this.storageService.saveItem('userData', JSON.stringify(authResponse));
          this.router.navigate(['analysis']);
          form.reset();
        }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }
}
