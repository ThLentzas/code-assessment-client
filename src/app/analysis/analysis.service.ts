import {Injectable} from "@angular/core";
import {Constraint} from "../models/constraint";
import {Preference} from "../models/preference";
import {HttpClient} from "@angular/common/http";
import {AnalysisRequest} from "../models/analysis-request";

@Injectable({providedIn: 'root'})
export class AnalysisService {
  private projectUrls: string[] = [];
  private constraints: Constraint[] = [];
  private preferences: Preference[] = [];

  constructor(private http: HttpClient) {
  }


  analyze(analysisRequest: AnalysisRequest) {
    this.http.post('http://localhost:8080/api/v1/analysis', analysisRequest)
      .subscribe({
        next: response => {
          console.log(response)
        },
        error: error => {
        }
      });
  };


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
