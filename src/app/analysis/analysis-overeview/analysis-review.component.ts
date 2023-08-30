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
  metrics = [
    { name: 'BUG_SEVERITY', value: 0 },
    { name: 'COGNITIVE_COMPLEXITY', value: 61.2 },
    { name: 'COMMENT_RATE', value: 66.6 },
    { name: 'CYCLOMATIC_COMPLEXITY', value: 77.5 },
    { name: 'DUPLICATION', value: 100 },
    { name: 'HOTSPOT_PRIORITY', value: 4.1 },
    { name: 'METHOD_SIZE', value: 100 },
    { name: 'RELIABILITY_REMEDIATION_EFFORT', value: 100 },
    { name: 'SECURITY_REMEDIATION_EFFORT', value: 100 },
    { name: 'TECHNICAL_DEBT_RATIO', value: 99.1 },
    { name: 'VULNERABILITY_SEVERITY', value: 100 }
  ];

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
          console.log(report.qualityMetricsReport);
        }
      }
    }
  }
}
