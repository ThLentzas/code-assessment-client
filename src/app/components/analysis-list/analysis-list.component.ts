import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnalysisService } from '../../services/analysis.service';
import { StorageService } from '../../services/storage.service';
import { AnalysisResult } from '../../models/analysis/response/analysis-result.model';


@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.css']
})
export class AnalysisListComponent implements OnInit, OnDestroy {
  analysisResult: AnalysisResult;
  subscription: Subscription;

  constructor(private analysisService: AnalysisService,
              private storageService: StorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const analysisResult = localStorage.getItem('analysisResult');

    if (analysisResult) {
      this.analysisResult = JSON.parse(analysisResult);
    }

    this.subscription = this.analysisService.analysisResultUpdated.subscribe({
      next: analysisResult => {
        if(analysisResult) {
          this.analysisResult = analysisResult;
          this.storageService.saveItem('analysisResult', JSON.stringify(this.analysisResult));
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onNewAnalysis() {
    this.router.navigate(['analysis']);
  }

  onUpdateResults() {
    const analysisId = this.getAnalysisId();
    this.router.navigate(['analysis', analysisId, 'refresh']);
  }

  getAnalysisId(): string {
    return this.route.snapshot.params['analysisId'];
  }

  public formatRank(rank : number) : number {
      return Math.floor(rank * 100)
  }
}
