import {Injectable} from "@angular/core";
import {AnalysisReport} from "../models/analysis/response/analysis-report.model";


@Injectable({providedIn: 'root'})
export class OverviewService {
  filterIssues(analysisReport: AnalysisReport) {
    return {
      bugs: analysisReport.issuesReport.issues.filter(issue => issue.type === 'BUG'),
      codeSmells: analysisReport.issuesReport.issues.filter(issue => issue.type === 'CODE_SMELL'),
      vulnerabilities: analysisReport.issuesReport.issues.filter(issue => issue.type === 'VULNERABILITY'),
      hotspots: analysisReport.hotspotsReport.hotspots
    };
  }
}
