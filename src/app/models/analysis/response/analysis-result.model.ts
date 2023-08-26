import {AnalysisReport} from "./analysis-report.model";

export interface AnalysisResult {
  analysisId: number;
  reports: AnalysisReport[][];
  createdDate: string;
}
