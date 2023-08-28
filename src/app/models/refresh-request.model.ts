import {Constraint} from "./analysis/request/constraint.model";
import {Preference} from "./analysis/request/preference.model";

export interface RefreshRequest {
  constraints: Constraint[];
  preferences: Preference[];
}
