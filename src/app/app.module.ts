import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProjectUrlsComponent } from './components/analysis-request/project-urls/project-urls.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConstraintsDetailComponent } from './components/analysis-request/constraints-detail/constraints-detail.component';
import { PreferencesDetailComponent } from './components/analysis-request/preferences-detail/preferences-detail.component';
import { AnalysisReviewComponent } from './components/analysis-list/analysis-review/analysis-review.component';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RefreshRequestComponent } from './components/analysis-list/refresh-request/refresh-request.component';
import { StickyNoteComponent } from './components/sticky-note/sticky-note.component';
import { ReportIssueComponent } from './components/analysis-list/analysis-review/report-issue/report-issue.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppNotificationModule } from './app-notification.module';
import { AppMaterialsModule } from './app-materials.module';
import { AppIconsModule } from './app-icons.module';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { AnalysisRequestComponent } from './components/analysis-request/analysis-request.component';
import { EmailUpdateErrorComponent } from './components/email-update-error/email-update-error.component';
import { PasswordResetErrorComponent } from './components/password-reset-error/password-reset-error.component';




@NgModule({
  declarations: [
    AppComponent,
    ProjectUrlsComponent,
    AnalysisRequestComponent,
    ConstraintsDetailComponent,
    PreferencesDetailComponent,
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
    PageNotFoundComponent,
    PasswordResetComponent,
    PasswordResetConfirmComponent,
    AnalysisRequestComponent,
    EmailUpdateErrorComponent,
    PasswordResetErrorComponent
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
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
