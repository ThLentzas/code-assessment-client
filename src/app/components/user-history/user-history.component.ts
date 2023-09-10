import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserHistory} from "../../models/user/user-history.model";
import {AnalysisResponse} from "../../models/analysis/response/analysis-response.model";
import {AnalysisService} from "../../services/analysis.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  history: UserHistory
  startDate: Date;
  endDate: Date;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private analysisService: AnalysisService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fetchHistory();
  }

  onViewHistory(): void {
   this.fetchHistory();
  }

  onAnalysis(analysisResponse: AnalysisResponse) {
    this.analysisService.setAnalysisResponse(analysisResponse);
    this.analysisService.analysisResponseUpdated.next(this.analysisService.getAnalysisResponse());

    this.router.navigate([
      '/dashboard',
      'analysis',
      this.analysisService.getAnalysisResponse().analysisId]);
  }

  onDelete(analysisResponse: AnalysisResponse) {
    this.analysisService.deleteAnalysis(analysisResponse.analysisId).subscribe({
      next: () => {
        this.fetchHistory();
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  fetchHistory() {
    this.userService.fetchUserHistory(this.startDate, this.endDate).subscribe({
      next: history => {
        this.history = history;
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }
}
