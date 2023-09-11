import { Component } from '@angular/core';
import {AnalysisRequest} from "../models/analysis/request/analysis-request.model";
import {AnalysisService} from "../services/analysis.service";
import {Router} from "@angular/router";
import {NotificationService} from "../services/notification.service";
import {Constraint} from "../models/analysis/request/constraint.model";
import {Preference} from "../models/analysis/request/preference.model";
import {TreeService} from "../services/tree.service";
import {TreeNode} from "../models/analysis/request/tree-node.model";
import {tap} from "rxjs";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-manage-analysis-request',
  templateUrl: './manage-analysis-request.component.html',
  styleUrls: ['./manage-analysis-request.component.css']
})
export class ManageAnalysisRequestComponent {
  constructor(private analysisService: AnalysisService,
              private treeService: TreeService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  onAnalyze() {
    let id;
    const analysisRequest: AnalysisRequest = {
      projectUrls: this.analysisService.getProjectUrls(),
      constraints: this.analysisService.getConstraints(),
      preferences: this.analysisService.getPreferences()
    };

    this.validateAnalysisRequest(analysisRequest);
    this.notificationService.onInfo("You will be redirected to your dashboard when the analysis is completed")
    this.analysisService.analyze(analysisRequest)
      .pipe(
        tap((response: HttpResponse<any>) => {
          const locationHeader = response.headers.get('Location');
          if (locationHeader) {
            id = +this.extractIdFromLocationHeader(locationHeader);
          }
        })
      )
      .subscribe({
        next: () => {
          this.fetchAnalysis(id);
        }
      });
  }

  fetchAnalysis(id: number) {
    this.analysisService.fetchAnalysisResult(id).subscribe({
      next: response => {
        this.analysisService.setAnalysisResponse(response);
        this.analysisService.analysisResponseUpdated.next(this.analysisService.getAnalysisResponse());
        this.router.navigate([
          '/dashboard',
          'analysis',
          this.analysisService.getAnalysisResponse().analysisId]);
      }, error: error => {
        this.notificationService.onError(error.error.message);
      }
    });
  }

  private validateAnalysisRequest(analysisRequest: AnalysisRequest) {
    try {
      this.validateProjectUrls(analysisRequest.projectUrls);
      this.validateConstraints(analysisRequest.constraints);
      this.validatePreferences(analysisRequest.preferences);
    } catch (error) {
      this.notificationService.onError(error.message);

      return;
    }
  }

  private validateProjectUrls(projectUrls: String[]) {
    if (projectUrls.length === 0) {
      throw new Error('You must provide at least 1 Github Repository');
    }
  }

  private validateConstraints(constraints: Constraint[]) {
    for (const constraint of constraints) {
      if ((constraint.qualityMetric === null && constraint.qualityMetricOperator !== null) ||
        (constraint.qualityMetric !== null && constraint.qualityMetricOperator === null)) {
        throw new Error('Invalid constraint requirements');
      }

      if (constraint.threshold !== null && (typeof constraint.threshold !== 'number' || isNaN(constraint.threshold))) {
        throw new Error('Threshold must be a valid number');
      }

      if (constraint.threshold !== null && (constraint.threshold > 1.0 || constraint.threshold < 0.0)) {
        throw new Error('Threshold value must be between 0 - 1');
      }
    }
  }

  private validatePreferences(preferences: Preference[]) {
    for (const preference of preferences) {
      if ((preference.qualityAttribute === null && preference.weight !== null) ||
        (preference.qualityAttribute !== null && preference.weight === null)) {
        throw new Error('Invalid preference requirements');
      }

      if (preference.weight !== null && (typeof preference.weight !== 'number' || isNaN(preference.weight))) {
        throw new Error('Weight must be a valid number');
      }

      if (preference.weight !== null && (preference.weight > 1.0 || preference.weight < 0.0)) {
        throw new Error('Weight value must be between 0 - 1');
      }

      const root = this.treeService.buildTree();
      this.validateChildNodesWeightsSum(root, preferences);
    }
  }

  private validateChildNodesWeightsSum(node: TreeNode, preferences: Preference[]) {
    if(this.isLeafNode(node)) {
      return;
    }

    let sum = 0;

    for(const child  of node.children) {
      for (const preference of preferences) {
        if (child.name === preference.qualityAttribute) {
          sum += preference.weight;
          if(sum > 1) {
            throw new Error('The sum of the weights for the child nodes of ' + node.name + ' can\'t be ' +
              'greater than 1');
          }
        }
      }
    }

    for(const child  of node.children) {
      this.validateChildNodesWeightsSum(child, preferences);
    }
  }

  private isLeafNode(node: TreeNode): boolean {
    return node.children.length === 0;
  }

  private extractIdFromLocationHeader(location: string): string {
    const parts = location.split('/');

    return parts[parts.length - 1];
  }
}
