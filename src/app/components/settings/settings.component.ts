import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { UserPasswordUpdateRequest } from '../../models/user/user-password-update-request.model';
import { UserEmailUpdateRequest } from '../../models/user/user-email-update-request.model';
import { UserAccountDeleteRequest } from '../../models/user/user-account-delete-request.model';
import { UserDTO } from '../../models/user/userDto-model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  accountDeleteRequest: UserAccountDeleteRequest ={};
  emailUpdateRequest: UserEmailUpdateRequest = {};
  userDTO: UserDTO;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.fetchUser().subscribe({
      next: userDTO => {
        this.userDTO = userDTO;
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  onUpdatePassword(form: NgForm) {
    if (this.newPassword !== this.confirmPassword) {
      return this.notificationService.onError("Passwords do not match");
    }

    if (this.newPassword === this.oldPassword) {
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
        this.notificationService.onInfo("A verification link will be sent shortly to your email")
        form.reset();
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  onDeleteAccount(form: NgForm) {
    console.log(this.accountDeleteRequest);
    this.userService.deleteUserAccount(this.accountDeleteRequest).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        form.reset();
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }
}
