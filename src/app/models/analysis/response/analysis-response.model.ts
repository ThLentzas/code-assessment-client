import { AnalysisReport } from './analysis-report.model';

export interface AnalysisResponse {
  analysisId: number;
  reports: AnalysisReport[][];
  createdDate: string;
}
