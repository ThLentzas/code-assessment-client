import {Component, DoCheck} from '@angular/core';
import {AnalysisService} from "../../services/analysis.service";

@Component({
  selector: 'app-project-urls',
  templateUrl: './project-urls.component.html',
  styleUrls: ['./project-urls.component.css']
})
export class ProjectUrlsComponent implements DoCheck {
  projectUrls: string[] = [];

  constructor(private analysisService: AnalysisService) {
    this.onAddUrl();
  }

  ngDoCheck(): void {
    this.analysisService.setProjectUrls(this.projectUrls);
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
