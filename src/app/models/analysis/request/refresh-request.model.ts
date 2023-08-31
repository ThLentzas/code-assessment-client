import {Constraint} from "./constraint.model";
import {Preference} from "./preference.model";

export interface RefreshRequest {
  constraints: Constraint[];
  preferences: Preference[];
}
