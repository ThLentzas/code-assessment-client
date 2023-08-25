import {Constraint} from "./constraint";
import {Preference} from "./preference";

export interface AnalysisRequest {
  projectUrls: string[];
  constraints: Constraint[];
  preferences: Preference[];
}
