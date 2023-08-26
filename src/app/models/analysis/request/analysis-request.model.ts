import {Constraint} from "./constraint.model";
import {Preference} from "./preference.model";

export interface AnalysisRequest {
  projectUrls: string[];
  constraints: Constraint[];
  preferences: Preference[];
}
