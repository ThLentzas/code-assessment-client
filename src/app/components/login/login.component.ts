import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';
import { LoginRequest } from '../../models/auth/login-request.model';


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
