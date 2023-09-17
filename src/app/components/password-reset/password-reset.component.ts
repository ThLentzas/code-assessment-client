import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PasswordResetRequest } from '../../models/auth/password-reset-request.model';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  passwordResetRequest: PasswordResetRequest = {};

  constructor(private authService: AuthService, private notificationService: NotificationService) {
  }

  onSearch(form: NgForm) {
    this.authService.resetPassword(this.passwordResetRequest).subscribe({
      next: () => {
        this.notificationService.onInfo("If your email is registered, you will receive a password reset link.");
        form.resetForm();
      }
    });
  }
}
