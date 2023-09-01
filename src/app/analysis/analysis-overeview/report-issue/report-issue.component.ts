import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from "../../../models/analysis/response/issues-report.model";
import {Subscription} from "rxjs";
import {OverviewService} from "../overview.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements OnInit, OnDestroy {
  bugs: Issue[];
  codeSmells: Issue[];
  vulnerabilities: Issue[];
  issueType: string;
  subscriptions: Subscription[] = [];
  selectedIssue: Issue;

  constructor(private overviewService: OverviewService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.overviewService.bugsUpdated.subscribe(
      bugs => {
        this.bugs = bugs;
      }));

    this.subscriptions.push(this.overviewService.codeSmellsUpdated.subscribe(
      codeSmells => {
        this.codeSmells = codeSmells;
      }));

    this.subscriptions.push(this.overviewService.vulnerabilitiesUpdated.subscribe(
      vulnerabilities => {
        this.vulnerabilities = vulnerabilities;
      }));

    this.route.queryParams.subscribe(params => {
      this.issueType = params['type'];
    });

    if (this.issueType === 'BUG') {
      this.selectedIssue = this.bugs[0];
    } else if (this.issueType === 'CODE_SMELL') {
      this.selectedIssue = this.codeSmells[0];
    } else {
      this.selectedIssue = this.vulnerabilities[0];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectIssue(issue: Issue) {
    this.selectedIssue = issue;
  }
}
