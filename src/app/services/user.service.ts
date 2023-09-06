import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserHistory} from "../models/user/user-history.model";
import {UserProfile} from "../models/user/user-profile.model";
import {UserProfileUpdateRequest} from "../models/user/user-profile-update-request.model";
import {UserPasswordUpdateRequest} from "../models/user/user-password-update-request.model";

@Injectable({providedIn: 'root'})
export class UserService {
  history: UserHistory

  constructor(private http: HttpClient) {
  }

  fetchUserProfile(): Observable<UserProfile> {
    const user = localStorage.getItem('userData');
    const authResponse = JSON.parse(user);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authResponse.token}`);

    return this.http.get<UserProfile>('http://localhost:8080/api/v1/user/profile', { headers });
  }

  updateUserProfile(profileUpdateRequest: UserProfileUpdateRequest): Observable<void> {
    const user = localStorage.getItem('userData');
    const authResponse = JSON.parse(user);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authResponse.token}`);

    return this.http.put<void>('http://localhost:8080/api/v1/user/profile', profileUpdateRequest, { headers });
  }

  updateUserPassword(passwordUpdateRequest: UserPasswordUpdateRequest) {
    const user = localStorage.getItem('userData');
    const authResponse = JSON.parse(user);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authResponse.token}`);

    return this.http.put<void>(
      'http://localhost:8080/api/v1/user/settings/password',
      passwordUpdateRequest,
      { headers });
  }

  fetchUserHistory(fromDate: Date, toDate: Date): Observable<UserHistory> {
    const user = localStorage.getItem('userData');
    const authResponse = JSON.parse(user);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authResponse.token}`);

    if (fromDate && toDate) {
      const from = this.formatDate(fromDate);
      const to = this.formatDate(toDate);
      const params = new HttpParams().set('from', from).set('to', to);

      const options = {
        headers,
        params
      };

      return this.http.get<UserHistory>('http://localhost:8080/api/v1/user/history', options);
    }

    return this.http.get<UserHistory>('http://localhost:8080/api/v1/user/history', {headers});
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Months are 0-based, add 1 and pad with zeros
    const day = date.getDate().toString().padStart(2, '0');  // Pad with zeros
    return `${year}-${month}-${day}`;
  }

}
