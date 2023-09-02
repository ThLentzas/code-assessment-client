import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Issue} from "../../models/analysis/response/issues-report.model";

@Injectable({providedIn: 'root'})
export class OverviewService {
  private bugs: Issue[];
  private codeSmells: Issue[];
  private vulnerabilities: Issue[];
  bugsUpdated = new BehaviorSubject<Issue[]>(null);
  codeSmellsUpdated = new BehaviorSubject<Issue[]>(null);
  vulnerabilitiesUpdated = new BehaviorSubject<Issue[]>(null);

  setBugs(bugs: Issue[]) {
    this.bugs = bugs;
  }

  setVulnerabilities(vulnerabilities: Issue[]) {
    this.vulnerabilities = vulnerabilities;
  }

  setCodeSmells(codeSmells: Issue[]) {
    this.codeSmells = codeSmells;
  }

  getBugs(): Issue[] {
    return this.bugs;
  }

  getCodeSmells(): Issue[] {
    return this.codeSmells;
  }

  getVulnerabilities(): Issue[] {
    return this.vulnerabilities;
  }
}
