import { NgModule } from '@angular/core';
import {
  MdcChipsModule,
  MdcAppBarModule,
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcIconToggleModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcImageListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTextFieldModule,
  MdcThemeModule,
  MdcToolbarModule,
  MdcTypographyModule,
} from '@angular-mdc/web';

@NgModule({
  exports: [
    MdcAppBarModule,
    MdcButtonModule,
    MdcCardModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcElevationModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconModule,
    MdcIconToggleModule,
    MdcLinearProgressModule,
    MdcListModule,
    MdcImageListModule,
    MdcMenuModule,
    MdcRadioModule,
    MdcRippleModule,
    MdcSelectModule,
    MdcSliderModule,
    MdcSnackbarModule,
    MdcSwitchModule,
    MdcTextFieldModule,
    MdcThemeModule,
    MdcToolbarModule,
    MdcTypographyModule,
    MdcChipsModule
  ]
})
export class AppMaterialModule { }
