import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectUrlsComponent } from './manage-analysis-request/project-urls/project-urls.component';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';
import { bootstrapTrash } from "@ng-icons/bootstrap-icons";
import { bootstrapPlus } from "@ng-icons/bootstrap-icons";
import { bootstrapColumnsGap } from "@ng-icons/bootstrap-icons";
import { bootstrapPersonFill } from "@ng-icons/bootstrap-icons";
import { bootstrapFolder2Open } from "@ng-icons/bootstrap-icons";
import { bootstrapFileEarmarkText } from "@ng-icons/bootstrap-icons";
import { bootstrapGear } from "@ng-icons/bootstrap-icons";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ManageAnalysisRequestComponent } from './manage-analysis-request/manage-analysis-request.component';
import { ConstraintsDetailComponent } from './manage-analysis-request/constraints-detail/constraints-detail.component';
import { PreferencesDetailComponent } from './manage-analysis-request/preferences-detail/preferences-detail.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisReviewComponent } from './analysis/analysis-overeview/analysis-review.component';
import { AnalysisListComponent } from './analysis/analysis-list/analysis-list.component';
import { HttpClientModule } from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import { NavbarComponent } from './components/navbar/navbar.component';
import { RefreshRequestComponent } from './analysis/refresh-request/refresh-request.component';
import { StickyNoteComponent } from './components/sticky-note/sticky-note.component';
import {NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    ProjectUrlsComponent,
    ManageAnalysisRequestComponent,
    ConstraintsDetailComponent,
    PreferencesDetailComponent,
    AnalysisComponent,
    AnalysisReviewComponent,
    AnalysisListComponent,
    NavbarComponent,
    RefreshRequestComponent,
    StickyNoteComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      bootstrapGithub,
      bootstrapTrash,
      bootstrapPlus,
      bootstrapColumnsGap,
      bootstrapPersonFill,
      bootstrapFolder2Open,
      bootstrapFileEarmarkText,
      bootstrapGear
    }),
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
