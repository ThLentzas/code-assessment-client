import { NgModule } from '@angular/core';
import { NotifierModule } from 'angular-notifier';


@NgModule({
  imports: [
    NotifierModule.withConfig()
  ],
  exports: [NotifierModule]
})
export class AppNotificationModule {

}
