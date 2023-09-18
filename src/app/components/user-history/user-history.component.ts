import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { UserHistory } from '../../models/user/user-history.model';
import { AnalysisResult } from '../../models/analysis/response/analysis-result.model';
import { UserService } from '../../services/user.service';
import { AnalysisService } from '../../services/analysis.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  history: UserHistory
  startDate: Date;
  endDate: Date;
  currentPage: number = 1;
  itemsPerPage: number = 14;
  currentDisplayed: number = 0;

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

  onAnalysis(analysisResult: AnalysisResult) {
    this.analysisService.setAnalysisResult(analysisResult);
    this.analysisService.analysisResultUpdated.next(this.analysisService.getAnalysisResult());

    this.router.navigate([
      '/dashboard',
      'analysis',
      this.analysisService.getAnalysisResult().analysisId]);
  }

  onDelete(analysisResult: AnalysisResult) {
    this.analysisService.deleteAnalysis(analysisResult.analysisId).subscribe({
      next: () => {
        this.fetchHistory();
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  onCopy(analysisResult: AnalysisResult) {
    this.analysisService.fetchAnalysisRequest(analysisResult.analysisId).subscribe({
      next: request => {
        this.analysisService.setProjectUrls(request.projectUrls);
        this.analysisService.setConstraints(request.constraints);
        this.analysisService.setPreferences(request.preferences);
        this.analysisService.projectUrlsUpdated.next(this.analysisService.getProjectUrls());
        this.analysisService.preferencesUpdated.next(this.analysisService.getPreferences());
        this.analysisService.constraintsUpdated.next(this.analysisService.getConstraints());

        this.router.navigate(['/analysis']);
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  fetchHistory() {
    this.userService.fetchUserHistory(this.startDate, this.endDate).subscribe({
      next: history => {
        this.history = history;
        this.currentDisplayed = Math.min(this.endItem, this.history?.analyses.length || 0);
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endItem(): number {
    return this.startItem + this.itemsPerPage;
  }

  get currentPageItems(): any[] {
    return this.history?.analyses.slice(this.startItem, this.endItem);
  }

  nextPage(): void {
    this.currentPage++;
    this.currentDisplayed = Math.min(this.endItem, this.history?.analyses.length || 0);
    this.fetchHistory();
  }

  prevPage(): void {
    this.currentPage--;
    this.currentDisplayed = this.startItem;
    this.fetchHistory();
  }
}
