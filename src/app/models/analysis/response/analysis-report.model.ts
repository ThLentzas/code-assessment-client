import { HotspotsReport } from './hotspots-report.model';
import { IssuesReport } from './issues-report.model';
import { QualityMetricsReport } from './quality-metric-report.model';


export interface AnalysisReport {
  reportId: number;
  analysisId: number;
  projectUrl: any;
  languages: { [key: string]: number };
  issuesReport: IssuesReport;
  hotspotsReport: HotspotsReport;
  qualityMetricsReport: QualityMetricsReport;
  rank: number;
}
