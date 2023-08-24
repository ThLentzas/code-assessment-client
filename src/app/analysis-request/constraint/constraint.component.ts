import { Component, OnInit } from '@angular/core';
import { QualityMetric } from './quality-metric';
import { QualityMetricOperator } from './quality-metric-operator';

@Component({
  selector: 'app-constraint',
  templateUrl: './constraint.component.html',
  styleUrls: ['./constraint.component.css']
})
export class ConstraintComponent implements OnInit {
  constraints = [{
    selectedMetric: '',
    selectedOperator: '',
    threshold: null
  }];
  qualityMetrics: string[];
  operators: string[];


  ngOnInit(): void {
    this.qualityMetrics = Object.keys(QualityMetric)
      .filter((key) => isNaN(Number(key)))
      .map((key) => key.replace(/_/g, ' '));
    this.operators = Object.keys(QualityMetricOperator)
      .filter((key) => isNaN(Number(key)));
  }

  onAddConstraint() {
    this.constraints.push({
      selectedMetric: '',
      selectedOperator: '',
      threshold: null
    });
  }

  onRemoveConstraint(index: number) {
    this.constraints.splice(index, 1);
  }
}
