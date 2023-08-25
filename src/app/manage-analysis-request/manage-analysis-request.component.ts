import { Component } from '@angular/core';
import {AnalysisRequest} from "../models/analysis-request";
import {AnalysisService} from "../analysis/analysis.service";

@Component({
  selector: 'app-manage-analysis-request',
  templateUrl: './manage-analysis-request.component.html',
  styleUrls: ['./manage-analysis-request.component.css']
})
export class ManageAnalysisRequestComponent {
  request: AnalysisRequest;

  constructor(private analysisService: AnalysisService) {
  }

  onAnalyze() {
    this.request = {
      projectUrls: this.analysisService.getProjectUrls(),
      constraints: this.analysisService.getConstraints(),
      preferences: this.analysisService.getPreferences()
    };

    this.analysisService.analyze(this.request)
  }
}
