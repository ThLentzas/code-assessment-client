import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetConfirmationRequest } from '../../models/auth/password-reset-confirmation-request.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css']
})
export class PasswordResetConfirmComponent implements OnInit{
  password: string;
  confirmPassword: string;
  token: string;

  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onReset(form: NgForm) {
    if(this.password !== this.confirmPassword) {
      return this.notificationService.onError("Passwords don't match");
    }

    const passwordResetConfirmRequest : PasswordResetConfirmationRequest = {
      token: this.token,
      password: this.password
    }

    this.authService.confirmPasswordReset(passwordResetConfirmRequest).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.router.navigate(['login']);
          this.notificationService.onSuccess("A confirmation email was sent about your recent password changes");
          form.resetForm();
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['password_reset_error']);
        } else {
          this.notificationService.onError(error.error.message);
        }
      }
    });
  }
}
