import { RouterModule, Routes } from '@angular/router';
import { AnalysisListComponent } from './components/analysis-list/analysis-list.component';
import { NgModule } from '@angular/core';
import { AnalysisReviewComponent } from './components/analysis-list/analysis-review/analysis-review.component';
import { AnalysisRequestComponent}  from './components/analysis-request/analysis-request.component';
import { RefreshRequestComponent } from './components/analysis-list/refresh-request/refresh-request.component';
import { ReportIssueComponent } from './components/analysis-list/analysis-review/report-issue/report-issue.component';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { isAuthenticated } from './services/access-guard.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { PasswordResetConfirmComponent } from './components/password-reset-confirm/password-reset-confirm.component';
import { EmailUpdateErrorComponent } from './components/email-update-error/email-update-error.component';
import { PasswordResetErrorComponent } from './components/password-reset-error/password-reset-error.component';


const appRoutes: Routes = [{
    path: 'signup',
    component: RegisterComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'password_reset',
    component: PasswordResetComponent
  }, {
    path: 'password_reset_error',
    component: PasswordResetErrorComponent
  }, {
    path: 'password_reset/confirm',
    component: PasswordResetConfirmComponent
  }, {
    path: '',
    component: LayoutComponent,
    canActivate: [isAuthenticated],
    children: [{
      path: 'analysis',
      component: AnalysisRequestComponent
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
      path: 'settings',
      component: SettingsComponent
    }, {
      path: 'email_update_error',
      component: EmailUpdateErrorComponent
    }, {
      path: 'profile',
      component: UserProfileComponent
    }, {
      path: '',
      redirectTo: '/analysis',
      pathMatch: 'full'
    }, {
      path: '**',
      component: PageNotFoundComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
