import {Component, DoCheck, OnInit} from '@angular/core';
import {Preference} from "../../models/analysis/request/preference.model";
import {AnalysisService} from "../../services/analysis.service";
import {QualityAttribute} from "../../models/analysis/request/quality-attribute.model";

@Component({
  selector: 'app-preferences-detail',
  templateUrl: './preferences-detail.component.html',
  styleUrls: ['./preferences-detail.component.css']
})
export class PreferencesDetailComponent implements OnInit, DoCheck {
  preferences = [{
    selectedAttribute: '',
    weight: null
  }];
  qualityAttributes: QualityAttribute[];

  constructor(private analysisService: AnalysisService) {
  }

  ngOnInit(): void {
    this.qualityAttributes = [
      {value: 'QUALITY', viewValue: 'Quality'},
      {value: 'COMPREHENSION', viewValue: 'Comprehension'},
      {value: 'SIMPLICITY', viewValue: 'Simplicity'},
      {value: 'MAINTAINABILITY', viewValue: 'Maintainability'},
      {value: 'RELIABILITY', viewValue: 'Reliability'},
      {value: 'COMPLEXITY', viewValue: 'Complexity'},
      {value: 'SECURITY', viewValue: 'Security'},
      {value: 'COMMENT_RATE', viewValue: 'Comment Rate'},
      {value: 'METHOD_SIZE', viewValue: 'Method Size'},
      {value: 'DUPLICATION', viewValue: 'Duplication'},
      {value: 'BUG_SEVERITY', viewValue: 'Bug Severity'},
      {value: 'TECHNICAL_DEBT_RATIO', viewValue: 'Technical Debt Ratio'},
      {value: 'RELIABILITY_REMEDIATION_EFFORT', viewValue: 'Reliability Remediation Effort'},
      {value: 'CYCLOMATIC_COMPLEXITY', viewValue: 'Cyclomatic Complexity'},
      {value: 'COGNITIVE_COMPLEXITY', viewValue: 'Cognitive Complexity'},
      {value: 'VULNERABILITY_SEVERITY', viewValue: 'Vulnerability Severity'},
      {value: 'HOTSPOT_PRIORITY', viewValue: 'Hotspot Priority'},
      {value: 'SECURITY_REMEDIATION_EFFORT', viewValue: 'Security Remediation Effort'}
    ];
  }

  ngDoCheck(): void {
    const validPreferences: Preference[] = this.preferences
      .filter(preference =>
        preference.selectedAttribute !== ''
        && preference.weight !== null)
      .map(preference => {
        return {
          qualityAttribute: preference.selectedAttribute,
          weight: Number(preference.weight)
        };
      });

    this.analysisService.setPreferences(validPreferences);
  }

  onAddPreference() {
    this.preferences.push({
      selectedAttribute: '',
      weight: null
    });
  }

  onRemovePreference(index: number) {
    this.preferences.splice(index, 1);
  }
}
