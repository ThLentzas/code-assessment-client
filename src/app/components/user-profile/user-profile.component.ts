import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserProfileUpdateRequest} from "../../models/user/user-profile-update-request.model";
import {UserProfile} from "../../models/user/user-profile.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  profile: UserProfile = {};
  tempUserProfile: UserProfile = {};
  isEditMode = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.fetchUserProfile().subscribe({
      next: profile => {
        this.profile = profile;
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
      console.log('error dog');
    }

    this.userService.updateUserProfile(profileUpdateRequest).subscribe({
        next: () => {
          this.toggleEditMode();
        }
      });
  }
}
