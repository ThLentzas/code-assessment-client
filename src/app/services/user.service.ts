import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {UserHistory} from "../models/user/user-history.model";

@Injectable({providedIn: 'root'})
export class UserService {
  history: UserHistory

  constructor(private http: HttpClient) {
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
