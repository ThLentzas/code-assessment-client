import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../models/auth/register-request.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  registerUser(registerRequest: RegisterRequest): Observable<void> {
    return this.http.post<void>("http://localhost:8080/api/v1/auth/signup", registerRequest);
  }

}
