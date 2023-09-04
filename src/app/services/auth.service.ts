import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RegisterRequest} from "../models/auth/register-request.model";
import {LoginRequest} from "../models/auth/login-request.model";
import {AuthResponse} from "../models/auth/auth-response.model";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  registerUser(registerRequest: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("http://localhost:8080/api/v1/auth/signup", registerRequest);
  }

  loginUser(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>("http://localhost:8080/api/v1/auth/login", loginRequest);
  }
}
