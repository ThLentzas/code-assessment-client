import { Injectable } from '@angular/core';
import { Constraint } from '../models/analysis/request/constraint.model';
import { Preference } from '../models/analysis/request/preference.model';
import { HttpClient } from '@angular/common/http';
import { AnalysisRequest } from '../models/analysis/request/analysis-request.model';
import { AnalysisResponse } from '../models/analysis/response/analysis-response.model';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { RefreshRequest } from '../models/analysis/request/refresh-request.model';
import { TreeNode } from '../models/analysis/request/tree-node.model';
import { NotificationService } from './notification.service';
import { TreeService } from './tree.service';


@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private projectUrls: string[] = [];
  private constraints: Constraint[] = [];
  private preferences: Preference[] = [];
  private analysisResponse: AnalysisResponse;
  analysisResponseUpdated = new BehaviorSubject<AnalysisResponse>(null);
  projectUrlsUpdated = new BehaviorSubject<string[]>([]);
  constraintsUpdated = new BehaviorSubject<Constraint[]>([]);
  preferencesUpdated = new BehaviorSubject<Preference[]>([]);

  constructor(private treeService: TreeService,
              private notificationService: NotificationService,
              private http: HttpClient) {
  }

  analyze(analysisRequest: AnalysisRequest) {
    try {
      this.validateAnalysisRequest(analysisRequest);

      return this.http.post('http://localhost:8080/api/v1/analysis', analysisRequest, {observe: 'response'});
    } catch (error) {
      this.notificationService.onError(error.message);
      return EMPTY;
    }
  }

  fetchAnalysisResult(analysisId: number): Observable<AnalysisResponse> {
    return this.http.get<AnalysisResponse>(`http://localhost:8080/api/v1/analysis/${analysisId}`);
  }

  updateAnalysisResult(analysisId: number, refreshRequest: RefreshRequest): Observable<AnalysisResponse> {
    try {
      this.validateConstraints(refreshRequest.constraints);
      this.validatePreferences(refreshRequest.preferences);

      return this.http.put<AnalysisResponse>(`http://localhost:8080/api/v1/analysis/${analysisId}`, refreshRequest);
    } catch (error) {
      this.notificationService.onError(error.message);
      return EMPTY;
    }
  }

  deleteAnalysis(analysisId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/v1/analysis/${analysisId}`);
  }

  fetchAnalysisRequest(analysisId: number): Observable<AnalysisRequest> {
    return this.http.get<AnalysisRequest>(`http://localhost:8080/api/v1/analysis/${analysisId}/request`);
  }

  private validateAnalysisRequest(analysisRequest: AnalysisRequest) {
      this.validateProjectUrls(analysisRequest.projectUrls);
      this.validateConstraints(analysisRequest.constraints);
      this.validatePreferences(analysisRequest.preferences);
  }

  private validateProjectUrls(projectUrls: string[]) {
    if (projectUrls.length === 1 && projectUrls[0] === '') {
      throw new Error('You must provide at least 1 Github Repository');
    }
  }

  private validateConstraints(constraints: Constraint[]) {
    if (constraints[0].qualityMetric === null
      && constraints[0].qualityMetricOperator === null
      && constraints[0].threshold === null) {
     constraints.length = 0;

     return;
    }

    for (const constraint of constraints) {
      if (constraint.qualityMetric === null &&
        (constraint.qualityMetricOperator !== null || constraint.threshold !== null)) {
        throw new Error('Quality metric field is required');
      }

      if (constraint.qualityMetricOperator === null &&
        (constraint.qualityMetric !== null || constraint.threshold !== null)) {
        throw new Error('Quality metric operator field is required');
      }

      if (constraint.threshold === null &&
        (constraint.qualityMetric !== null || constraint.qualityMetricOperator !== null)) {
        throw new Error('Threshold field is required');
      }

      if (constraint.threshold !== null && isNaN(constraint.threshold)) {
        throw new Error('Threshold must be a valid number');
      }

      if (constraint.threshold !== null && (constraint.threshold > 1 || constraint.threshold < 0)) {
        throw new Error('Threshold value must be between 0 - 1');
      }
    }
  }

  private validatePreferences(preferences: Preference[]) {
    if (preferences[0].qualityAttribute === null
      && preferences[0].weight === null) {
      preferences.length = 0;

      return;
    }

    for (const preference of preferences) {
      if (preference.qualityAttribute === null && preference.weight !== null) {
        throw new Error('Quality parameter field is required');
      }

      if (preference.qualityAttribute !== null && preference.weight === null) {
        throw new Error('Weight field is required');
      }

      if (preference.weight !== null && isNaN(preference.weight)) {
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
    let childNodesWithWeight = 0;

    for(const child  of node.children) {
      for (const preference of preferences) {
        if (child.name === preference.qualityAttribute) {
          childNodesWithWeight++;
          sum += preference.weight;
          if(sum > 1) {
            throw new Error('The sum of the weights for the child nodes of ' +
              this.readableQualityParameter(node.name) + ' can\'t be greater than 1');
          }
        }
      }

      /*
        If the child nodes of a parent node have all defined weight, meaning the user provided weight for all the
        child nodes of a parent node, and it's less than 1 then we notify the user
       */
      if(childNodesWithWeight === node.children.length && sum < 1) {
        throw new Error('The sum of the weights for the child nodes of ' +
          this.readableQualityParameter(node.name) + ' can\'t be less than 1');
      }
    }

    for(const child  of node.children) {
      this.validateChildNodesWeightsSum(child, preferences);
    }
  }

  private isLeafNode(node: TreeNode): boolean {
    return node.children.length === 0;
  }

  private readableQualityParameter(value) {
    return value
      .split('_')
      .map(word => word.toLowerCase())
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getProjectUrls(): string[] {
    return this.projectUrls;
  }

  getConstraints(): Constraint[] {
    return this.constraints;
  }

  getPreferences(): Preference[] {
    return this.preferences;
  }

  getAnalysisResponse(): AnalysisResponse {
    return this.analysisResponse;
  }

  setProjectUrls(projectUrls: string[]) {
    this.projectUrls = projectUrls;
  }

  setConstraints(constraints: Constraint[]) {
    this.constraints = constraints;
  }

  setPreferences(preferences: Preference[]) {
    this.preferences = preferences;
  }

  setAnalysisResponse(analysisResponse: AnalysisResponse) {
    this.analysisResponse = analysisResponse;
  }
}
