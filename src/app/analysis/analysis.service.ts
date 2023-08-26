import {Injectable} from "@angular/core";
import {Constraint} from "../models/analysis/request/constraint.model";
import {Preference} from "../models/analysis/request/preference.model";
import {HttpClient} from "@angular/common/http";
import {AnalysisRequest} from "../models/analysis/request/analysis-request.model";
import {AnalysisResult} from "../models/analysis/response/analysis-result.model";
import {Observable, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AnalysisService {
  private projectUrls: string[] = [];
  private constraints: Constraint[] = [];
  private preferences: Preference[] = [];

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

  fetchAnalysisResult(): Observable<AnalysisResult> {
    return this.http.get<AnalysisResult>("http://localhost:8080/api/v1/analysis/4");
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

  setProjectUrls(projectUrls: string[]) {
    this.projectUrls = projectUrls;
  }

  setConstraints(constraints: Constraint[]) {
    this.constraints = constraints;
  }

  setPreferences(preferences: Preference[]) {
    this.preferences = preferences;
  }
}
