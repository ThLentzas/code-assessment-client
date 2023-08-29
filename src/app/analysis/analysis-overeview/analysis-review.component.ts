import {Component, OnInit} from '@angular/core';
import {AnalysisService} from "../analysis.service";
import {ActivatedRoute} from "@angular/router";
import {AnalysisReport} from "../../models/analysis/response/analysis-report.model";

@Component({
  selector: 'app-analysis-review',
  templateUrl: './analysis-review.component.html',
  styleUrls: ['./analysis-review.component.css']
})
export class AnalysisReviewComponent implements OnInit {
  analysisReport: AnalysisReport;

  constructor(private analysisService: AnalysisService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*
      Returns the id as String, so we have to convert it to number.
     */
    const reportId = +this.route.snapshot.params['reportId'];

    for (const reportList of this.analysisService.getAnalysisResponse().reports) {
      for (const report of reportList) {
        if (report.reportId === reportId) {
          this.analysisReport = report;
        }
      }
    }
  }
}
