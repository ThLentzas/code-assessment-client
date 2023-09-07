import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ProjectUrlsComponent} from './manage-analysis-request/project-urls/project-urls.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ManageAnalysisRequestComponent} from './manage-analysis-request/manage-analysis-request.component';
import {ConstraintsDetailComponent} from './manage-analysis-request/constraints-detail/constraints-detail.component';
import {PreferencesDetailComponent} from './manage-analysis-request/preferences-detail/preferences-detail.component';
import {AnalysisComponent} from './analysis/analysis.component';
import {AnalysisReviewComponent} from './analysis/analysis-overeview/analysis-review.component';
import {AnalysisListComponent} from './analysis/analysis-list/analysis-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {NavbarComponent} from './components/navbar/navbar.component';
import {RefreshRequestComponent} from './analysis/refresh-request/refresh-request.component';
import {StickyNoteComponent} from './components/sticky-note/sticky-note.component';
import {ReportIssueComponent} from './analysis/analysis-overeview/report-issue/report-issue.component';
import {UserHistoryComponent} from './components/user-history/user-history.component';
import {RegisterComponent} from './components/register/register.component';
import {LayoutComponent} from './components/layout/layout.component';
import {LoginComponent} from './components/login/login.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {SettingsComponent} from './components/settings/settings.component';
import {AppNotificationModule} from "./app-notification.module";
import {AppMaterialsModule} from "./app-materials.module";
import {AppIconsModule} from "./app-icons.module";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


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
    UserProfileComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppNotificationModule,
    AppMaterialsModule,
    AppIconsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
  }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
