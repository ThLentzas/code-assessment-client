import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  firstname = 'asdf';
  lastname = 'asdf';
  username = 'username';
  bio = '';
  location = 'asdf';
  company = 'asdf';

  tempFirstname = '';
  tempLastname = '';
  tempBio = '';
  tempLocation = '';
  tempCompany = '';

  isEditMode = false;

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.tempFirstname = this.firstname;
      this.tempLastname = this.lastname;
      this.tempBio = this.bio;
      this.tempLocation = this.location;
      this.tempCompany = this.company;
    }
  }

  saveChanges() {
    this.firstname = this.tempFirstname;
    this.lastname = this.tempLastname;
    this.bio = this.tempBio;
    this.location = this.tempLocation;
    this.company = this.tempCompany;

    this.toggleEditMode();
  }
}
