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
  }

  ngDoCheck(): void {
    this.analysisService.setProjectUrls(this.projectUrls);
  }
}
