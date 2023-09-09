import {Component, OnDestroy, OnInit} from '@angular/core';
import {Issue} from "../../../models/analysis/response/issues-report.model";
import {Subscription} from "rxjs";
import {OverviewService} from "../../../services/overview.service";
import {ActivatedRoute} from "@angular/router";
import {Hotspot} from "../../../models/analysis/response/hotspots-report.model";

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements OnInit, OnDestroy {
  bugs: Issue[];
  codeSmells: Issue[];
  vulnerabilities: Issue[];
  hotspots: Hotspot[];
  issueType: string;
  subscriptions: Subscription[] = [];
  selected: Issue | Hotspot;

  constructor(private overviewService: OverviewService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.issueType = params['type'];
      this.selected = null;
    });

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

    this.subscriptions.push(this.overviewService.hotspotsUpdated.subscribe(
      hotspots => {
        this.hotspots = hotspots;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  setSelected(selected: Issue | Hotspot) {
    this.selected = selected;
  }

  getSelectedAsIssue(): Issue {
    return this.selected as Issue;
  }

  getSelectedAsHotspot(): Hotspot {
    return this.selected as Hotspot;
  }

  getReadableIssueType(issueType: string): string {
    const issueTypeMapping: { [key: string]: string } = {
      "CODE_SMELL": "Code Smell",
      "BUG": "Bug",
      "VULNERABILITY": "Vulnerability",
    };

    return issueTypeMapping[issueType];
  }

  getReadableSecurityCategory(securityCategory: string): string {
    const mapping: { [key: string]: string } = {
      "buffer-overflow": "Buffer Overflow",
      "sql-injection": "SQL Injection",
      "rce": "Remote Code Execution",
      "object-injection": "Object Injection",
      "command-injection": "Command Injection",
      "path-traversal-injection": "Path Traversal Injection",
      "ldap-injection": "LDAP Injection",
      "xpath-injection": "XPath Injection",
      "log-injection": "Log Injection",
      "xxe": "XML External Entity",
      "xss": "Cross-Site Scripting (XSS)",
      "dos": "Denial of Service",
      "ssrf": "Server-Side Request Forgery",
      "csrf": "Cross-Site Request Forgery",
      "http-response-splitting": "HTTP Response Splitting",
      "open-redirect": "Open Redirect",
      "weak-cryptography": "Weak Cryptography",
      "auth": "Authentication",
      "insecure-conf": "Insecure Configuration",
      "file-manipulation": "File Manipulation",
      "encrypt-data": "Encryption of Sensitive Data",
      "traceability": "Traceability",
      "permission": "Permission",
      "others": "Others"
    };

    return mapping[securityCategory];
  }
}
