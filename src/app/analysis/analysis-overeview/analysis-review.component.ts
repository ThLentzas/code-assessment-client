import {Component, OnInit} from '@angular/core';
import {AnalysisService} from "../../services/analysis.service";
import {ActivatedRoute} from "@angular/router";
import {AnalysisReport} from "../../models/analysis/response/analysis-report.model";
import {Issue} from "../../models/analysis/response/issues-report.model";
import {Hotspot} from "../../models/analysis/response/hotspots-report.model";
import {StorageService} from "../../services/storage.service";
import {OverviewService} from "../../services/overview.service";

@Component({
  selector: 'app-analysis-review',
  templateUrl: './analysis-review.component.html',
  styleUrls: ['./analysis-review.component.css']
})
export class AnalysisReviewComponent implements OnInit {
  //We can not iterate through maps with *ngFor. We have to convert them into arrays.
  bugs: Issue[];
  codeSmells: Issue[];
  vulnerabilities: Issue[];
  hotspots: Hotspot[];
  metrics: { key: string, value: number }[] = [];
  languages: { key: string, value: number }[] = [];
  analysisReport: AnalysisReport;

  constructor(private analysisService: AnalysisService,
              private overviewService: OverviewService,
              private storageService: StorageService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*
      Returns the id as String, so we have to convert it to number.
     */
    const reportId = +this.route.snapshot.params['reportId'];
    const analysisResponse = JSON.parse(localStorage.getItem('analysisResponse'));

    for (const reports of analysisResponse.reports) {
      for (const report of reports) {
        if (report.reportId === reportId) {
          this.analysisReport = report;
          break;
        }
      }
    }

    this.metrics = Object.keys(this.analysisReport.qualityMetricsReport).map(key => {
      return {
        key: key.replace(/_/g, ' '),
        value: parseFloat(this.analysisReport.qualityMetricsReport[key].toFixed(6))
      };
    });

    this.languages = Object.keys(this.analysisReport.languages).map(key => {
      return {
        key: key,
        value: this.analysisReport.languages[key]
      };
    });
    
    const { bugs, codeSmells, vulnerabilities, hotspots } =
      this.overviewService.filterIssues(this.analysisReport);

    this.bugs = bugs;
    this.codeSmells = codeSmells;
    this.vulnerabilities = vulnerabilities;
    this.hotspots = hotspots;

    this.storageService.saveItem('analysisReport', JSON.stringify(this.analysisReport));
  }
}
