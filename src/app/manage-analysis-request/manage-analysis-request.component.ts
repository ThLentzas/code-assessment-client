import { Component } from '@angular/core';
import {AnalysisRequest} from "../models/analysis/request/analysis-request.model";
import {AnalysisService} from "../services/analysis.service";
import {Router} from "@angular/router";
import {NotificationService} from "../services/notification.service";
import {TreeService} from "../services/tree.service";
import {tap} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-manage-analysis-request',
  templateUrl: './manage-analysis-request.component.html',
  styleUrls: ['./manage-analysis-request.component.css']
})
export class ManageAnalysisRequestComponent {
  constructor(private analysisService: AnalysisService,
              private treeService: TreeService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  onAnalyze() {
    let id;
    const analysisRequest: AnalysisRequest = {
      projectUrls: this.analysisService.getProjectUrls(),
      constraints: this.analysisService.getConstraints(),
      preferences: this.analysisService.getPreferences()
    };

    this.notificationService.onInfo("You will be redirected to your dashboard when the analysis is completed")
    this.analysisService.analyze(analysisRequest)
      .pipe(
        tap((response: HttpResponse<any>) => {
          const locationHeader = response.headers.get('Location');
          if (locationHeader) {
            id = +this.extractIdFromLocationHeader(locationHeader);
          }
        })
      )
      .subscribe({
        next: () => {
          if(id) {
            this.fetchAnalysis(id);
          }
        }, error: error => {
          this.notificationService.onError(error.error.message);
        }
      });
  }

  fetchAnalysis(id: number) {
    this.analysisService.fetchAnalysisResult(id).subscribe({
      next: response => {
        this.analysisService.setAnalysisResponse(response);
        this.analysisService.analysisResponseUpdated.next(this.analysisService.getAnalysisResponse());
        this.router.navigate([
          '/dashboard',
          'analysis',
          this.analysisService.getAnalysisResponse().analysisId]);
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }



  private extractIdFromLocationHeader(location: string): string {
    const parts = location.split('/');

    return parts[parts.length - 1];
  }
}
