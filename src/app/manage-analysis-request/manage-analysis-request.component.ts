import { Component } from '@angular/core';
import {AnalysisRequest} from "../models/analysis/request/analysis-request.model";
import {AnalysisService} from "../analysis/analysis.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-analysis-request',
  templateUrl: './manage-analysis-request.component.html',
  styleUrls: ['./manage-analysis-request.component.css']
})
export class ManageAnalysisRequestComponent {
  request: AnalysisRequest;

  constructor(private analysisService: AnalysisService,
              private router: Router) {
  }

  onAnalyze() {
    this.request = {
      projectUrls: this.analysisService.getProjectUrls(),
      constraints: this.analysisService.getConstraints(),
      preferences: this.analysisService.getPreferences()
    };

    this.analysisService.fetchAnalysisResult().subscribe({
      next: response => {
        this.analysisService.setAnalysisResponse(response);
        this.analysisService.analysisResponseUpdated.next(this.analysisService.getAnalysisResponse());
        this.router.navigate(['/dashboard']);
      }
    })
  }
}
