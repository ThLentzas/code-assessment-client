import {RouterModule, Routes} from "@angular/router";
import {AnalysisListComponent} from "./analysis/analysis-list/analysis-list.component";
import {NgModule} from "@angular/core";
import {ManageAnalysisRequestComponent} from "./manage-analysis-request/manage-analysis-request.component";
import {RefreshRequestComponent} from "./analysis/refresh-request/refresh-request.component";

const appRoutes: Routes = [{
    path: 'dashboard/analysis', component: ManageAnalysisRequestComponent
  }, {
    path: 'analysis/:analysisId/refresh', component: RefreshRequestComponent
  }, {
    path: 'dashboard/analysis/:analysisId', component: AnalysisListComponent
  }, {
    path: '', redirectTo: '/dashboard/analysis', pathMatch: 'full',
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
