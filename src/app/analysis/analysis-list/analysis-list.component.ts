import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalysisResponse} from "../../models/analysis/response/analysis-response.model";
import {AnalysisService} from "../../services/analysis.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.css']
})
export class AnalysisListComponent implements OnInit, OnDestroy {
  analysisResponse: AnalysisResponse;
  subscription: Subscription;

  constructor(private analysisService: AnalysisService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.analysisService.analysisResponseUpdated.subscribe({
      next: analysisResponse => {
        for (const reportList of analysisResponse.reports) {
          for (const report of reportList) {
            if (this.isFirstDigitZero(report.rank)) {
              report.rank = Math.floor(report.rank * 100);
            }
          }
        }
        this.analysisResponse = analysisResponse;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onNewAnalysis() {
    this.router.navigate(['analysis']);
  }

  onUpdateResults() {
    const analysisId = this.getAnalysisId();
    this.router.navigate(['analysis', analysisId, 'refresh']);
  }

  getAnalysisId(): string {
    return this.route.snapshot.params['analysisId'];
  }

  private isFirstDigitZero(num: number) {
    return num.toString()[0] === '0' || num.toString()[0] === '1';
  }
}
