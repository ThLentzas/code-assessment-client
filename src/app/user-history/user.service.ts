import {Injectable} from "@angular/core";
import {AnalysisResponse} from "../models/analysis/response/analysis-response.model";
import {BehaviorSubject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class UserService {
  history: AnalysisResponse[]
  historyUpdated = new BehaviorSubject<AnalysisResponse>(null);

  constructor(private http: HttpClient) {
  }

  fetchUserHistory(fromDate: Date, toDate: Date) {
    const from = fromDate.toString();
    const to = toDate.toString();

    const params = new HttpParams().set('from', from).set('to', to);

  }
}
