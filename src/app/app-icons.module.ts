import {NgOptimizedImage} from "@angular/common";
import {NgModule} from "@angular/core";
import {NgIconsModule} from '@ng-icons/core';
import {bootstrapGithub} from '@ng-icons/bootstrap-icons';
import {bootstrapTrash} from "@ng-icons/bootstrap-icons";
import {bootstrapPlus} from "@ng-icons/bootstrap-icons";
import {bootstrapColumnsGap} from "@ng-icons/bootstrap-icons";
import {bootstrapPersonFill} from "@ng-icons/bootstrap-icons";
import {bootstrapFolder2Open} from "@ng-icons/bootstrap-icons";
import {bootstrapFileEarmarkText} from "@ng-icons/bootstrap-icons";
import {bootstrapGear} from "@ng-icons/bootstrap-icons";
import {bootstrapBug} from "@ng-icons/bootstrap-icons";
import {bootstrapPersonFillGear} from "@ng-icons/bootstrap-icons";
import {bootstrapShieldFillCheck} from "@ng-icons/bootstrap-icons";
import {bootstrapShieldFillExclamation} from "@ng-icons/bootstrap-icons";
import {bootstrapArrowCounterclockwise} from "@ng-icons/bootstrap-icons";
import {bootstrapArrowRepeat} from "@ng-icons/bootstrap-icons";
import {bootstrapBarChartFill} from "@ng-icons/bootstrap-icons";
import {bootstrapClock} from "@ng-icons/bootstrap-icons";
import {bootstrapGeoAltFill} from "@ng-icons/bootstrap-icons";
import {bootstrapBuilding} from "@ng-icons/bootstrap-icons";
import {bootstrapPersonCircle} from "@ng-icons/bootstrap-icons";
import {bootstrapBoxArrowLeft} from "@ng-icons/bootstrap-icons";

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
