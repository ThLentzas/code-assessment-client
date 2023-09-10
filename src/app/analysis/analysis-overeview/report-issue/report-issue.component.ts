import {Component, OnInit} from '@angular/core';
import {Issue} from "../../../models/analysis/response/issues-report.model";
import {ActivatedRoute} from "@angular/router";
import {Hotspot} from "../../../models/analysis/response/hotspots-report.model";
import {AnalysisReport} from "../../../models/analysis/response/analysis-report.model";
import {OverviewService} from "../../../services/overview.service";


@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.css']
})
export class ReportIssueComponent implements OnInit {
  analysisReport: AnalysisReport;
  bugs: Issue[];
  codeSmells: Issue[];
  vulnerabilities: Issue[];
  hotspots: Hotspot[];
  issueType: string;
  selected: Issue | Hotspot;

  constructor(private overviewService: OverviewService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const analysisReport = localStorage.getItem('analysisReport');
    this.analysisReport = JSON.parse(analysisReport);

    this.route.queryParams.subscribe(params => {
      this.issueType = params['type'];
      this.selected = null;
    });

    const { bugs, codeSmells, vulnerabilities, hotspots } =
      this.overviewService.filterIssues(this.analysisReport);

    this.bugs = bugs;
    this.codeSmells = codeSmells;
    this.vulnerabilities = vulnerabilities;
    this.hotspots = hotspots;
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
