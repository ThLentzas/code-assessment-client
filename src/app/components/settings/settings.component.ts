import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserPasswordUpdateRequest} from "../../models/user/user-password-update-request.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  email: string;
  emailPassword: string;

  constructor(private userService: UserService) {
  }

  onUpdatePassword(form: NgForm) {
    if(this.newPassword !== this.confirmPassword) {
      console.log('not the same');
    }

    if(this.newPassword === this.oldPassword) {
      console.log('same as old password');
    }

    const passwordUpdateRequest: UserPasswordUpdateRequest = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }

    this.userService.updateUserPassword(passwordUpdateRequest).subscribe({
      next: () => {
        form.reset();
      }
    })
  }

  onUpdateEmail(form: NgForm) {
  }
}

