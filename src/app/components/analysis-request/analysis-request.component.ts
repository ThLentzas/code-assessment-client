import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AnalysisRequest } from '../../models/analysis/request/analysis-request.model';
import { AnalysisService } from '../../services/analysis.service';
import { NotificationService } from '../../services/notification.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-analysis-request',
  templateUrl: './analysis-request.component.html',
  styleUrls: ['./analysis-request.component.css']
})
export class AnalysisRequestComponent {
  constructor(private analysisService: AnalysisService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  onAnalyze() {
    let id: number;
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
        this.analysisService.setAnalysisResult(response);
        this.analysisService.analysisResultUpdated.next(this.analysisService.getAnalysisResult());
        console.log(this.analysisService.getAnalysisResult())
        this.router.navigate([
          '/dashboard',
          'analysis',
          this.analysisService.getAnalysisResult().analysisId]);
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
