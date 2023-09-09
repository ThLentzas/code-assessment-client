import { Component } from '@angular/core';
import {PasswordResetRequest} from "../../models/auth/password-reset-request.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";

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
        this.notificationService.onInfo("A password reset link has been sent to your email");
        form.resetForm();
      }
    });
  }
}
