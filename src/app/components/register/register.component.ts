import {Component} from '@angular/core';
import {RegisterRequest} from "../../models/auth/register-request.model";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hidePassword = true;
  registerRequest: RegisterRequest = {};

  constructor(private authService: AuthService, private router: Router) {
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
