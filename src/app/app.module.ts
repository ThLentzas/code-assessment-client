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
import { bootstrapBug } from "@ng-icons/bootstrap-icons";
import { bootstrapPersonFillGear } from "@ng-icons/bootstrap-icons";
import { bootstrapShieldFillCheck } from "@ng-icons/bootstrap-icons";
import { bootstrapShieldFillExclamation } from "@ng-icons/bootstrap-icons";
import { bootstrapArrowCounterclockwise } from "@ng-icons/bootstrap-icons";
import { bootstrapArrowRepeat } from "@ng-icons/bootstrap-icons";
import { bootstrapBarChartFill } from "@ng-icons/bootstrap-icons";
import { bootstrapClock } from "@ng-icons/bootstrap-icons";
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
import { ReportIssueComponent } from './analysis/analysis-overeview/report-issue/report-issue.component';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { UserHistoryComponent } from './components/user-history/user-history.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


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
    ReportIssueComponent,
    UserHistoryComponent,
    RegisterComponent,
    LayoutComponent,
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgIconsModule.withIcons({
      bootstrapGithub,
      bootstrapTrash,
      bootstrapPlus,
      bootstrapColumnsGap,
      bootstrapPersonFill,
      bootstrapFolder2Open,
      bootstrapFileEarmarkText,
      bootstrapGear,
      bootstrapBug,
      bootstrapPersonFillGear,
      bootstrapShieldFillCheck,
      bootstrapShieldFillExclamation,
      bootstrapArrowCounterclockwise,
      bootstrapArrowRepeat,
      bootstrapBarChartFill,
      bootstrapClock
    }),
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
