import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/auth/register-request.model";
import {LoginRequest} from "../models/auth/login-request.model";
import {AuthResponse} from "../models/auth/auth-response.model";
import {PasswordResetRequest} from "../models/auth/password-reset-request.model";
import {PasswordResetConfirmationRequest} from "../models/auth/password-reset-confirmation-request.model";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storageService: StorageService,
              private http: HttpClient) {
  }

  registerUser(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("http://localhost:8080/api/v1/auth/signup", registerRequest);
  }

  loginUser(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("http://localhost:8080/api/v1/auth/login", loginRequest);
  }

  resetPassword(passwordResetRequest: PasswordResetRequest): Observable<void> {
    return this.http.post<void>("http://localhost:8080/api/v1/auth/password_reset", passwordResetRequest)
  }

  confirmPasswordReset(passwordResetConfirmationRequest: PasswordResetConfirmationRequest): Observable<void> {
    return this.http.put<void>("http://localhost:8080/api/v1/auth/password_reset/confirm", passwordResetConfirmationRequest);
  }

  getAuthToken() {
    const user = this.storageService.getItem('userData');

    if (user !== null) {
      const authResponse: AuthResponse = JSON.parse(user);
      return authResponse.token;
    }
    return null;
  }
}
