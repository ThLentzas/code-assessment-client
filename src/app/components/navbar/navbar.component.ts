import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from '../../services/analysis.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private analysisService: AnalysisService,
              private router: Router) {
  }
  onDashboard() {
    let analysisResponse = this.analysisService.getAnalysisResult();

    if (!analysisResponse) {
      const storedResponse = localStorage.getItem('analysisResponse');
      if (storedResponse) {
        analysisResponse = JSON.parse(storedResponse);
      }
    }

    if(analysisResponse) {
      this.router.navigate([
        '/dashboard',
        'analysis',
        analysisResponse.analysisId
      ]);
    }
  }

  onLogout() {
    this.router.navigate(['/login']);
  }
}
