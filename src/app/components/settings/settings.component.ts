import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserPasswordUpdateRequest} from "../../models/user/user-password-update-request.model";
import {NotificationService} from "../../services/notification.service";
import {UserEmailUpdateRequest} from "../../models/user/user-email-update-request.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  emailUpdateRequest: UserEmailUpdateRequest = {};

  constructor(private userService: UserService,
              private notificationService: NotificationService) {
  }

  onUpdatePassword(form: NgForm) {
    if(this.newPassword !== this.confirmPassword) {
      return this.notificationService.onError("Passwords do not match");
    }

    if(this.newPassword === this.oldPassword) {
      return this.notificationService.onError("New password can't be the same as old password");
    }

    const passwordUpdateRequest: UserPasswordUpdateRequest = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    this.userService.updateUserPassword(passwordUpdateRequest).subscribe({
      next: () => {
        this.notificationService.onSuccess("Passwords was updated successfully");
        form.reset();
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  onUpdateEmail(form: NgForm) {
    this.userService.updateUserEmail(this.emailUpdateRequest).subscribe({
      next: () => {
        this.notificationService.onInfo("A verification link has been sent to your email")
        form.reset();
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }
}
