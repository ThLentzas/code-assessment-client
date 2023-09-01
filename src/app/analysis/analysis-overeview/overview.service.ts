import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Issue} from "../../models/analysis/response/issues-report.model";

@Injectable({providedIn: 'root'})
export class OverviewService {
  bugs: Issue[];
  codeSmells: Issue[];
  vulnerabilities: Issue[];
  bugsUpdated = new BehaviorSubject<Issue[]>(null);
  codeSmellsUpdated = new BehaviorSubject<Issue[]>(null);
  vulnerabilitiesUpdated = new BehaviorSubject<Issue[]>(null);

  setBugs(bugs: Issue[]) {
    this.bugs = bugs;
  }

  getBugs(): Issue[] {
    return this.bugs;
  }

  setCodeSmells(codeSmells: Issue[]) {
    this.codeSmells = codeSmells;
  }

  getCodeSmells(): Issue[] {
    return this.codeSmells;
  }

  setVulnerabilities(vulnerabilities: Issue[]) {
    this.vulnerabilities = vulnerabilities;
  }

  getVulnerabilities(): Issue[] {
    return this.vulnerabilities;
  }
}
