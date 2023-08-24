import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProjectUrlsComponent } from './analysis-request/project-urls/project-urls.component';
import { AnalysisRequestComponent } from './analysis-request/analysis-request.component';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapGithub } from '@ng-icons/bootstrap-icons';
import { bootstrapTrash } from "@ng-icons/bootstrap-icons";
import { bootstrapPlus } from "@ng-icons/bootstrap-icons";
import { ConstraintComponent } from './analysis-request/constraint/constraint.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PreferenceComponent } from './analysis-request/preference/preference.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectUrlsComponent,
    AnalysisRequestComponent,
    ConstraintComponent,
    PreferenceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgIconsModule.withIcons({bootstrapGithub, bootstrapTrash, bootstrapPlus}),
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
