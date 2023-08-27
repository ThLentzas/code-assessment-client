import {RouterModule, Routes} from "@angular/router";
import {AnalysisListComponent} from "./analysis/analysis-list/analysis-list.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
  {
    path: 'dashboard', component: AnalysisListComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
