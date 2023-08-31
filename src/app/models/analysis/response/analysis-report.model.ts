import {HotspotsReport} from "./hotspots-report.model";
import {IssuesReport} from "./issues-report.model";
import {RuleDetails} from "./rule-details.model";
import {QualityMetricsReport} from "./quality-metric-report.model";

export interface AnalysisReport {
  reportId: number;
  analysisId: number;
  projectUrl: any;
  languages: { [key: string]: number };
  issuesReport: IssuesReport;
  hotspotsReport: HotspotsReport;
  ruleDetails: { [key: string]: RuleDetails };
  qualityMetricsReport: QualityMetricsReport;
  rank: number;
}
