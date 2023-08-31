import {Component, OnInit} from '@angular/core';
import {AnalysisService} from "../analysis.service";
import {ActivatedRoute} from "@angular/router";
import {AnalysisReport} from "../../models/analysis/response/analysis-report.model";
import {IssueDetails} from "../../models/analysis/response/issues-report.model";
import {HotspotDetails} from "../../models/analysis/response/hotspots-report.model";

@Component({
  selector: 'app-analysis-review',
  templateUrl: './analysis-review.component.html',
  styleUrls: ['./analysis-review.component.css']
})
export class AnalysisReviewComponent implements OnInit {
  //We can not iterate through maps with *ngFor. We have to convert them into arrays.
  analysisReport: AnalysisReport;
  bugs: IssueDetails[];
  codeSmells: IssueDetails[];
  vulnerabilities: IssueDetails[];
  hotspots: HotspotDetails[];
  metrics: { key: string, value: number }[] = [];
  languages: { key: string, value: number }[] = [];

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

    this.metrics = Object.keys(this.analysisReport.qualityMetricsReport).map(key => {
      return {
        key: key.replace(/_/g, ' '),
        value: parseFloat(this.analysisReport.qualityMetricsReport[key].toFixed(6))
      };
    });

    console.log(this.metrics)
    this.languages = Object.keys(this.analysisReport.languages).map(key => {
      return {
        key: key,
        value: this.analysisReport.languages[key]
      };
    });

    this.bugs = this.analysisReport.issuesReport.issues.filter(issue =>
      issue.type === 'BUG');
    this.codeSmells = this.analysisReport.issuesReport.issues.filter(issue =>
      issue.type === 'CODE_SMELL');
    this.vulnerabilities = this.analysisReport.issuesReport.issues.filter(issue =>
      issue.type === 'VULNERABILITY');
    this.hotspots = this.analysisReport.hotspotsReport.hotspots;
  }
}
