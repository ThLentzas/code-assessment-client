import {RouterModule, Routes} from "@angular/router";
import {AnalysisListComponent} from "./analysis/analysis-list/analysis-list.component";
import {NgModule} from "@angular/core";
import {ManageAnalysisRequestComponent} from "./manage-analysis-request/manage-analysis-request.component";
import {RefreshRequestComponent} from "./analysis/refresh-request/refresh-request.component";
import {AnalysisReviewComponent} from "./analysis/analysis-overeview/analysis-review.component";
import {ReportIssueComponent} from "./analysis/analysis-overeview/report-issue/report-issue.component";
import {RegisterComponent} from "./components/register/register.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {LoginComponent} from "./components/login/login.component";
import {UserHistoryComponent} from "./components/user-history/user-history.component";

const appRoutes: Routes = [
  {
    path: 'signup',
    component: RegisterComponent
  }, {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: 'analysis',
      component: ManageAnalysisRequestComponent
    }, {
      path: 'analysis/:analysisId/refresh',
      component: RefreshRequestComponent
    }, {
      path: 'dashboard/analysis/:analysisId',
      component: AnalysisListComponent
    }, {
      path: 'dashboard/analysis/:analysisId/reports/:reportId',
      component: AnalysisReviewComponent
    }, {
      path: 'dashboard/analysis/:analysisId/reports/:reportId/issues',
      component: ReportIssueComponent
    }, {
      path: 'history',
      component: UserHistoryComponent
    }, {
      path: '',
      redirectTo: '/analysis',
      pathMatch: 'full'
    }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
