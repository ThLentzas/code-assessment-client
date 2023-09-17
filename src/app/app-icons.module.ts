import {NgModule} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {NgIconsModule} from '@ng-icons/core';
import {
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
  bootstrapClock,
  bootstrapGeoAltFill,
  bootstrapBuilding,
  bootstrapPersonCircle,
  bootstrapBoxArrowLeft
} from '@ng-icons/bootstrap-icons';


const icons = {
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
  bootstrapClock,
  bootstrapGeoAltFill,
  bootstrapBuilding,
  bootstrapPersonCircle,
  bootstrapBoxArrowLeft
};

@NgModule({
  imports: [
    NgIconsModule.withIcons(icons),
    NgOptimizedImage
  ],
  exports: [
    NgIconsModule,
    NgOptimizedImage
  ]
})
export class AppIconsModule {

}
