import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AnalysisService} from "../../analysis/analysis.service";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private analysisService: AnalysisService, private router: Router) {
  }

  onDashboard() {
    if(this.analysisService.getAnalysisResponse()) {
      this.router.navigate([
        '/dashboard',
        'analysis',
        this.analysisService.getAnalysisResponse().analysisId]);
    }
  }
}
