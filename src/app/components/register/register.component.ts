import {Component, OnInit} from '@angular/core';
import {RegisterRequest} from "../../models/auth/register-request.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {StorageService} from "../../services/storage.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  registerRequest: RegisterRequest = {};

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  /*
    We have to clean the token from the local storage in case a user manually navigates to /signup.
   */
  ngOnInit(): void {
    this.storageService.removeItem('userData');
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser(this.registerRequest).subscribe({
        next: authResponse => {
          this.storageService.saveItem('userData', JSON.stringify(authResponse));
          this.router.navigate((['analysis']));
          form.reset();
        }, error: error => {
          this.notificationService.onError(error.error.message);
        }
      });
  }
}
