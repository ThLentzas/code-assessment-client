import {Component, OnInit} from '@angular/core';
import {RegisterRequest} from "../../models/auth/register-request.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hidePassword = true;
  registerRequest: RegisterRequest = {};

  constructor(private authService: AuthService, private router: Router) {
  }

  /*
    We have to clean the token from the local storage in case a user manually navigates to /signup.
   */
  ngOnInit(): void {
    localStorage.removeItem('userData');
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser(this.registerRequest).subscribe({
        next: authResponse => {
          localStorage.setItem('userData', JSON.stringify(authResponse));
          this.router.navigate((['analysis']));
          form.reset();
        }
      }
    )
  }
}
