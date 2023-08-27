import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnalysisResponse} from "../../models/analysis/response/analysis-response.model";
import {AnalysisService} from "../analysis.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.css']
})
export class AnalysisListComponent implements OnInit, OnDestroy {
  analysisResponse: AnalysisResponse;
  subscription: Subscription;

  constructor(private analysisService: AnalysisService) {
  }

  ngOnInit(): void {
    this.subscription = this.analysisService.analysisResponseUpdated.subscribe(
      analysisResponse => {
        for(const reportList of analysisResponse.reports) {
          for(const report of reportList) {
            report.rank = Math.floor(report.rank * 100);
          }
        }
        this.analysisResponse = analysisResponse;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
