import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {AnalysisService} from '../../services/analysis.service';
import {Constraint} from '../../models/analysis/request/constraint.model';
import {QualityMetric} from "../../models/analysis/request/quality-metric.model";
import {QualityMetricOperator} from "../../models/analysis/request/quality-metric-operator.model";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-constraints-detail',
  templateUrl: './constraints-detail.component.html',
  styleUrls: ['./constraints-detail.component.css']
})
export class ConstraintsDetailComponent implements OnInit, DoCheck, OnDestroy {
  constraints: Constraint[] = [];
  qualityMetrics: QualityMetric[];
  operators: QualityMetricOperator[];
  dataLoaded = false;
  constraintsSubscription: Subscription;

  constructor(private analysisService: AnalysisService) {
    this.onAddConstraint();
  }

  ngOnInit(): void {
    this.qualityMetrics = [
      {value: 'BUG_SEVERITY', viewValue: 'Bug Severity'},
      {value: 'COGNITIVE_COMPLEXITY', viewValue: 'Cognitive Complexity'},
      {value: 'COMMENT_RATE', viewValue: 'Comment Rate'},
      {value: 'CYCLOMATIC_COMPLEXITY', viewValue: 'Cyclomatic Complexity'},
      {value: 'DUPLICATION', viewValue: 'Duplication'},
      {value: 'HOTSPOT_PRIORITY', viewValue: 'Hotspot Priority'},
      {value: 'METHOD_SIZE', viewValue: 'Method Size'},
      {value: 'RELIABILITY_REMEDIATION_EFFORT', viewValue: 'Reliability Remediation Effort'},
      {value: 'SECURITY_REMEDIATION_EFFORT', viewValue: 'Security Remediation Effort'},
      {value: 'TECHNICAL_DEBT_RATIO', viewValue: 'Technical Debt Ratio'},
      {value: 'VULNERABILITY_SEVERITY', viewValue: 'Vulnerability Severity'}
    ];

    this.operators = [
      {value: '>'},
      {value: '>='},
      {value: '<'},
      {value: '<='},
      {value: '=='},
      {value: '<>'},
    ];

    this.constraintsSubscription = this.analysisService.constraintsUpdated.subscribe({
      next: constraints => {
        if (this.dataLoaded === false && constraints.length > 0) {
          this.constraints = constraints;
          this.dataLoaded = true;
        }
      }
    });
  }

  ngDoCheck(): void {
    const constraints: Constraint[] = this.constraints
      .map(constraint => ({
        qualityMetric: constraint.qualityMetric,
        qualityMetricOperator: constraint.qualityMetricOperator,
        threshold: constraint.threshold !== null ? Number(constraint.threshold) : null
      }));

    this.analysisService.setConstraints(constraints);
  }

  ngOnDestroy(): void {
    this.resetConstraints();
    if (this.constraintsSubscription) {
      this.constraintsSubscription.unsubscribe();
    }
  }

  onAddConstraint() {
    const constraint: Constraint = {
      qualityMetric: null,
      qualityMetricOperator: null,
      threshold: null
    };

    this.constraints.push(constraint);
  }

  onRemoveConstraint(index: number) {
    this.constraints.splice(index, 1);
  }

  resetConstraints() {
    this.constraints = [];
    this.onAddConstraint();
    this.analysisService.setConstraints(this.constraints);
  }
}
