import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserHistory } from '../models/user/user-history.model';
import { UserProfile } from '../models/user/user-profile.model';
import { UserProfileUpdateRequest } from '../models/user/user-profile-update-request.model';
import { UserPasswordUpdateRequest } from '../models/user/user-password-update-request.model';
import { UserEmailUpdateRequest } from '../models/user/user-email-update-request.model';
import { UserDTO } from '../models/user/userDto-model';
import {UserAccountDeleteRequest} from "../models/user/user-account-delete-request.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  history: UserHistory

  constructor(private http: HttpClient) {
  }

  fetchUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>('http://localhost:8080/api/v1/user');
  }

  fetchUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('http://localhost:8080/api/v1/user/profile');
  }

  updateUserProfile(profileUpdateRequest: UserProfileUpdateRequest): Observable<void> {
    return this.http.put<void>('http://localhost:8080/api/v1/user/profile', profileUpdateRequest);
  }

  updateUserPassword(passwordUpdateRequest: UserPasswordUpdateRequest): Observable<void>  {
    return this.http.put<void>('http://localhost:8080/api/v1/user/settings/password', passwordUpdateRequest);
  }

  updateUserEmail(emailUpdateRequest: UserEmailUpdateRequest): Observable<void>  {
    return this.http.post<void>('http://localhost:8080/api/v1/user/settings/email', emailUpdateRequest);
  }

  fetchUserHistory(fromDate: Date, toDate: Date): Observable<UserHistory> {
    if (fromDate && toDate) {
      const from = this.formatDate(fromDate);
      const to = this.formatDate(toDate);
      const params = new HttpParams().set('from', from).set('to', to);

      return this.http.get<UserHistory>('http://localhost:8080/api/v1/user/history', { params });
    }

    return this.http.get<UserHistory>('http://localhost:8080/api/v1/user/history');
  }

  deleteUserAccount(accountDeleteRequest: UserAccountDeleteRequest): Observable<void> {
    return this.http.put<void>('http://localhost:8080/api/v1/user/settings/account', accountDeleteRequest);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
