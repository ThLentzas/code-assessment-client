import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserHistory} from "../../models/user/user-history.model";
import {AnalysisResponse} from "../../models/analysis/response/analysis-response.model";
import {AnalysisService} from "../../services/analysis.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  history: UserHistory
  startDate: Date;
  endDate: Date;

  constructor(private userService: UserService, private analysisService: AnalysisService, private router: Router) { }

  ngOnInit(): void {
    this.userService.fetchUserHistory(this.startDate, this.endDate)
      .subscribe(response => {
        this.history = response;
      });
  }

  onViewHistory():  void {
    this.userService.fetchUserHistory(this.startDate, this.endDate)
      .subscribe(response => {
        this.history = response;
      });
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
      this.analysisService.deleteAnalysis(analysisResponse.analysisId).subscribe(
        () => {
          const index = this.history.analyses.findIndex(toBeDeleted =>
            toBeDeleted.analysisId === analysisResponse.analysisId);
            this.history.analyses.splice(index, 1);
        });
  }
}
