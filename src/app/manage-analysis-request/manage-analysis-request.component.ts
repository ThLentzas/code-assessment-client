import { Component } from '@angular/core';
import {AnalysisRequest} from "../models/analysis/request/analysis-request.model";
import {AnalysisService} from "../services/analysis.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-analysis-request',
  templateUrl: './manage-analysis-request.component.html',
  styleUrls: ['./manage-analysis-request.component.css']
})
export class ManageAnalysisRequestComponent {
  analysisRequest: AnalysisRequest;

  constructor(private analysisService: AnalysisService,
              private router: Router) {
  }

  onAnalyze() {
    this.analysisRequest = {
      projectUrls: this.analysisService.getProjectUrls(),
      constraints: this.analysisService.getConstraints(),
      preferences: this.analysisService.getPreferences()
    };

    this.analysisService.fetchAnalysisResult(1).subscribe({
      next: response => {
        this.analysisService.setAnalysisResponse(response);
        this.analysisService.analysisResponseUpdated.next(this.analysisService.getAnalysisResponse());
        this.router.navigate([
          '/dashboard',
          'analysis',
          this.analysisService.getAnalysisResponse().analysisId]);
      }
    })
  }
}
