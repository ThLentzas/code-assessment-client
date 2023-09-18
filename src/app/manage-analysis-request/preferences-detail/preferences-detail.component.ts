import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import { Preference } from '../../models/analysis/request/preference.model';
import { QualityAttribute } from '../../models/analysis/request/quality-attribute.model';
import { AnalysisService } from '../../services/analysis.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-preferences-detail',
  templateUrl: './preferences-detail.component.html',
  styleUrls: ['./preferences-detail.component.css']
})
export class PreferencesDetailComponent implements OnInit, DoCheck, OnDestroy {
  preferences: Preference[] = [];
  qualityAttributes: QualityAttribute[];
  preferenceSubscription: Subscription;
  dataLoaded = false;

  constructor(private analysisService: AnalysisService) {
    this.onAddPreference();
  }

  ngOnInit(): void {
    this.qualityAttributes = [
      {value: 'BUG_SEVERITY', viewValue: 'Bug Severity'},
      {value: 'COGNITIVE_COMPLEXITY', viewValue: 'Cognitive Complexity'},
      {value: 'COMMENT_RATE', viewValue: 'Comment Rate'},
      {value: 'COMPLEXITY', viewValue: 'Complexity'},
      {value: 'COMPREHENSION', viewValue: 'Comprehension'},
      {value: 'CYCLOMATIC_COMPLEXITY', viewValue: 'Cyclomatic Complexity'},
      {value: 'DUPLICATION', viewValue: 'Duplication'},
      {value: 'HOTSPOT_PRIORITY', viewValue: 'Hotspot Priority'},
      {value: 'MAINTAINABILITY', viewValue: 'Maintainability'},
      {value: 'METHOD_SIZE', viewValue: 'Method Size'},
      {value: 'QUALITY', viewValue: 'Quality'},
      {value: 'RELIABILITY', viewValue: 'Reliability'},
      {value: 'RELIABILITY_REMEDIATION_EFFORT', viewValue: 'Reliability Remediation Effort'},
      {value: 'SECURITY', viewValue: 'Security'},
      {value: 'SECURITY_REMEDIATION_EFFORT', viewValue: 'Security Remediation Effort'},
      {value: 'SIMPLICITY', viewValue: 'Simplicity'},
      {value: 'TECHNICAL_DEBT_RATIO', viewValue: 'Technical Debt Ratio'},
      {value: 'VULNERABILITY_SEVERITY', viewValue: 'Vulnerability Severity'}
    ];

    this.preferenceSubscription = this.analysisService.preferencesUpdated.subscribe({
      next: preferences => {
        if (this.dataLoaded === false && preferences.length > 0) {
          this.preferences = preferences;
          this.dataLoaded = true;
        }
      }
    });
  }

  ngDoCheck(): void {
    const preferences: Preference[] = this.preferences
      .map(preference => ({
        qualityAttribute: preference.qualityAttribute,
        weight: preference.weight !== null ? Number(preference.weight) : null
      }));

    this.analysisService.setPreferences(preferences);
  }

  ngOnDestroy(): void {
    if(this.preferenceSubscription) {
      this.preferenceSubscription.unsubscribe();
    }
  }

  onAddPreference() {
    const preference: Preference = {
      qualityAttribute: null,
      weight: null
    }

    this.preferences.push(preference);
  }

  onRemovePreference(index: number) {
    this.preferences.splice(index, 1);
  }


}
