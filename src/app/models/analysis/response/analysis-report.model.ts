import {HotspotsReport} from "./hotspots-report.model";
import {IssuesReport} from "./issues-report.model";
import {RuleDetails} from "./rule-details.model";

export interface AnalysisReport {
  reportId: number;
  analysisId: number;
  projectUrl: any;
  languages: { [key: string]: number };
  issuesReport: IssuesReport;
  hotspotsReport: HotspotsReport;
  ruleDetails: { [key: string]: RuleDetails };
  qualityMetricsReport: { [key: string]: number };
  rank: number;
}
