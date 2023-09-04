import {Component, DoCheck, OnInit} from '@angular/core';
import {AnalysisService} from '../../services/analysis.service';
import {Constraint} from '../../models/analysis/request/constraint.model';
import {QualityMetric} from "../../models/analysis/request/quality-metric.model";
import {QualityMetricOperator} from "../../models/analysis/request/quality-metric-operator.model";


@Component({
  selector: 'app-constraints-detail',
  templateUrl: './constraints-detail.component.html',
  styleUrls: ['./constraints-detail.component.css']
})
export class ConstraintsDetailComponent implements OnInit, DoCheck {
  constraints = [{
    selectedMetric: '',
    selectedOperator: '',
    threshold: null
  }];
  qualityMetrics: QualityMetric[];
  operators: QualityMetricOperator[];

  constructor(private analysisService: AnalysisService) {
  }

  ngOnInit():void {
    this.qualityMetrics = [
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

    this.operators = [
      {value: '>'},
      {value: '>='},
      {value: '<'},
      {value: '<='},
      {value: '=='},
      {value: '<>'},
    ]
  }

  ngDoCheck(): void {
    const validConstraints: Constraint[] = this.constraints
      .filter(constraint =>
        constraint.selectedMetric !== ''
        && constraint.selectedOperator !== ''
        && constraint.threshold !== null)
      .map(constraint => {
        return {
          qualityMetric: constraint.selectedMetric,
          qualityMetricOperator: constraint.selectedOperator,
          threshold: Number(constraint.threshold)
        };
      });

    this.analysisService.setConstraints(validConstraints);
  }

  onAddConstraint(){
    this.constraints.push({
      selectedMetric: '',
      selectedOperator: '',
      threshold: null
    });
  }

  onRemoveConstraint(index:number){
    this.constraints.splice(index, 1);
  }
}
