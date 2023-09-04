import {Component, OnInit} from '@angular/core';
import {AnalysisService} from "../../services/analysis.service";
import {ActivatedRoute} from "@angular/router";
import {AnalysisReport} from "../../models/analysis/response/analysis-report.model";
import {Issue} from "../../models/analysis/response/issues-report.model";
import {Hotspot} from "../../models/analysis/response/hotspots-report.model";
import {OverviewService} from "../../services/overview.service";

@Component({
  selector: 'app-analysis-review',
  templateUrl: './analysis-review.component.html',
  styleUrls: ['./analysis-review.component.css']
})
export class AnalysisReviewComponent implements OnInit {
  //We can not iterate through maps with *ngFor. We have to convert them into arrays.
  analysisReport: AnalysisReport;
  bugs: Issue[];
  codeSmells: Issue[];
  vulnerabilities: Issue[];
  hotspots: Hotspot[];
  metrics: { key: string, value: number }[] = [];
  languages: { key: string, value: number }[] = [];

  constructor(private analysisService: AnalysisService,
              private overviewService: OverviewService,
              private route: ActivatedRoute) {
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

    this.languages = Object.keys(this.analysisReport.languages).map(key => {
      return {
        key: key,
        value: this.analysisReport.languages[key]
      };
    });

    this.bugs = this.analysisReport.issuesReport.issues.filter(issue =>
      issue.type === 'BUG');
    this.overviewService.setBugs(this.bugs);
    this.overviewService.bugsUpdated.next(this.overviewService.getBugs());

    this.codeSmells = this.analysisReport.issuesReport.issues.filter(issue =>
      issue.type === 'CODE_SMELL');
    this.overviewService.setCodeSmells(this.codeSmells);
    this.overviewService.codeSmellsUpdated.next(this.overviewService.getCodeSmells());

    this.vulnerabilities = this.analysisReport.issuesReport.issues.filter(issue =>
      issue.type === 'VULNERABILITY');
    this.overviewService.setVulnerabilities(this.vulnerabilities)
    this.overviewService.vulnerabilitiesUpdated.next(this.overviewService.getVulnerabilities());

    this.hotspots = this.analysisReport.hotspotsReport.hotspots;
  }
}
