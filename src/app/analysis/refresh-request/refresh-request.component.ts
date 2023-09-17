import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnalysisService } from '../../services/analysis.service';
import { NotificationService } from '../../services/notification.service';
import { RefreshRequest } from '../../models/analysis/request/refresh-request.model';


@Component({
  selector: 'app-refresh-request',
  templateUrl: './refresh-request.component.html',
  styleUrls: ['./refresh-request.component.css']
})
export class RefreshRequestComponent implements OnInit {
  analysisId: number;
  refreshRequest: RefreshRequest;

  constructor(private analysisService: AnalysisService,
              private notificationService: NotificationService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.analysisId = this.route.snapshot.params['analysisId'];
  }

  onUpdate() {
    this.refreshRequest = {
      constraints: this.analysisService.getConstraints(),
      preferences: this.analysisService.getPreferences()
    };

    this.analysisService.updateAnalysisResult(this.analysisId, this.refreshRequest).subscribe({
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
}
