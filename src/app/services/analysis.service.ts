import {Injectable} from "@angular/core";
import {Constraint} from "../models/analysis/request/constraint.model";
import {Preference} from "../models/analysis/request/preference.model";
import {HttpClient} from "@angular/common/http";
import {AnalysisRequest} from "../models/analysis/request/analysis-request.model";
import {AnalysisResponse} from "../models/analysis/response/analysis-response.model";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {RefreshRequest} from "../models/analysis/request/refresh-request.model";
import {TreeNode} from "../models/analysis/request/tree-node.model";
import {NotificationService} from "./notification.service";
import {TreeService} from "./tree.service";

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private projectUrls: string[] = [];
  private constraints: Constraint[] = [];
  private preferences: Preference[] = [];
  private analysisResponse: AnalysisResponse;
  analysisResponseUpdated = new BehaviorSubject<AnalysisResponse>(null);

  constructor(private treeService: TreeService,
              private notificationService: NotificationService,
              private http: HttpClient) {
  }

  analyze(analysisRequest: AnalysisRequest) {
    this.validateAnalysisRequest(analysisRequest);

    return this.http.post('http://localhost:8080/api/v1/analysis', analysisRequest, { observe: 'response' });
  }


  fetchAnalysisResult(analysisId: number): Observable<AnalysisResponse> {
    return this.http.get<AnalysisResponse>(
      `http://localhost:8080/api/v1/analysis/${analysisId}`);
  }

  updateAnalysisResult(analysisId: number, refreshRequest: RefreshRequest): Observable<AnalysisResponse> {
    try {
      this.validateConstraints(refreshRequest.constraints);
      this.validatePreferences(refreshRequest.preferences);
    } catch (error) {
      this.notificationService.onError(error.message);
      return EMPTY;
    }

    return this.http.put<AnalysisResponse>(`http://localhost:8080/api/v1/analysis/${analysisId}`, refreshRequest);
  }

  deleteAnalysis(analysisId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/v1/user/history/analysis/${analysisId}`);
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

  private validateProjectUrls(projectUrls: string[]) {
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
            throw new Error('The sum of the weights for the child nodes of  can\'t be greater than 1');
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
