import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserProfileUpdateRequest} from "../../models/user/user-profile-update-request.model";
import {UserProfile} from "../../models/user/user-profile.model";
import {NotificationService} from "../../services/notification.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: UserProfile = {};
  tempUserProfile: UserProfile = {};
  isEditMode = false;

  constructor(private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.userService.fetchUserProfile().subscribe({
      next: profile => {
        this.profile = profile;
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.tempUserProfile = {...this.profile};
    }
  }

  saveChanges() {
    const profileUpdateRequest: UserProfileUpdateRequest = {};
    /*
      We create a request with only the updated fields the user provided.
     */
    for (const key in this.tempUserProfile) {
      if (this.tempUserProfile[key] !== this.profile[key]) {
        profileUpdateRequest[key] = this.tempUserProfile[key];
      }
    }
    this.profile = {...this.tempUserProfile};

    /*
      If the user provided an empty username as an updated value we decline the request. Username is mandatory and
      unique.
     */
    if(profileUpdateRequest.username?.length === 0) {
      return this.notificationService.onError("Username must have a value")
    }

    this.userService.updateUserProfile(profileUpdateRequest).subscribe({
      next: () => {
        this.toggleEditMode();
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }
}
