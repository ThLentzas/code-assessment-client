import {Injectable} from "@angular/core";
import {Constraint} from "../models/analysis/request/constraint.model";
import {Preference} from "../models/analysis/request/preference.model";
import {HttpClient} from "@angular/common/http";
import {AnalysisRequest} from "../models/analysis/request/analysis-request.model";
import {AnalysisResponse} from "../models/analysis/response/analysis-response.model";
import {BehaviorSubject, Observable} from "rxjs";
import {RefreshRequest} from "../models/analysis/request/refresh-request.model";

@Injectable({providedIn: 'root'})
export class AnalysisService {
  private projectUrls: string[] = [];
  private constraints: Constraint[] = [];
  private preferences: Preference[] = [];
  private analysisResponse: AnalysisResponse;
  analysisResponseUpdated = new BehaviorSubject<AnalysisResponse>(null);

  constructor(private http: HttpClient) {
  }

  analyze(analysisRequest: AnalysisRequest){
    this.http.post('http://localhost:8080/api/v1/analysis', analysisRequest)
      .subscribe({
        next: response => {
          console.log(response)
        },
        error: error => {
        }
      });
  };

  fetchAnalysisResult(analysisId: number): Observable<AnalysisResponse> {
    const user = localStorage.getItem('userData');
    const authResponse = JSON.parse(user);
    const headers = { 'Authorization': `Bearer ${authResponse.token}` }

    return this.http.get<AnalysisResponse>(
      `http://localhost:8080/api/v1/analysis/${analysisId}`,
      { headers });
  }

  updateAnalysisResult(analysisId: number, refreshRequest: RefreshRequest): Observable<AnalysisResponse> {
    return this.http.put<AnalysisResponse>(`http://localhost:8080/api/v1/analysis/${analysisId}`, refreshRequest);
  }

  deleteAnalysis(analysisId: number): Observable<void> {
    const user = localStorage.getItem('userData');
    const authResponse = JSON.parse(user);
    const headers = { 'Authorization': `Bearer ${authResponse.token}` }

    return this.http.delete<void>(`http://localhost:8080/api/v1/user/history/analysis/${analysisId}`, {headers});
  }

  getProjectUrls(): string[] {
    return this.projectUrls;
  }

  getConstraints(): Constraint[] {
    return this.constraints;
  }

  getPreferences(): Preference[] {
    return this.preferences;
  }

  getAnalysisResponse(): AnalysisResponse {
    return this.analysisResponse;
  }

  setProjectUrls(projectUrls: string[]) {
    this.projectUrls = projectUrls;
  }

  setConstraints(constraints: Constraint[]) {
    this.constraints = constraints;
  }

  setPreferences(preferences: Preference[]) {
    this.preferences = preferences;
  }

  setAnalysisResponse(analysisResponse: AnalysisResponse) {
    this.analysisResponse = analysisResponse;
  }
}