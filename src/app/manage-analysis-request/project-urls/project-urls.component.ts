import {Component, DoCheck, OnInit, OnDestroy} from '@angular/core';
import {AnalysisService} from '../../services/analysis.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-project-urls',
  templateUrl: './project-urls.component.html',
  styleUrls: ['./project-urls.component.css']
})
export class ProjectUrlsComponent implements DoCheck, OnInit, OnDestroy {
  projectUrls: string[] = [];
  dataLoaded = false;
  projectUrlsSubscription: Subscription;

  constructor(private analysisService: AnalysisService) {
    this.onAddUrl();
  }

  ngOnInit(): void {
    this.projectUrlsSubscription = this.analysisService.projectUrlsUpdated.subscribe({
      next: projectUrls => {
        if (projectUrls) {
          if (this.dataLoaded === false && projectUrls.length > 0) {
            this.projectUrls = projectUrls;
            this.dataLoaded = true;
          }
        }
      }
    });
  }

  ngDoCheck(): void {
    this.analysisService.setProjectUrls(this.projectUrls);
  }

  ngOnDestroy(): void {
    if (this.projectUrlsSubscription) {
      this.projectUrlsSubscription.unsubscribe();
    }
  }

  onAddUrl(): void {
    this.projectUrls.push('');
  }

  onRemoveUrl(index: number): void {
    if (this.projectUrls.length > 1) {
      this.projectUrls.splice(index, 1);
    }
  }
}
