import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import 'hammerjs';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth/auth.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {HttpModule} from '@angular/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {Ng5BreadcrumbModule} from 'ng5-breadcrumb';


import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {ExcategoryService} from './services/excategory.service';
import {MainComponent} from './components/main/main.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {MessageComponent} from './components/message/message.component';
import {UserService} from './services/user.service';
import {TokenStorage} from './services/auth/token/token-storage';
import {StopService} from './services/stop.service';
import {AdminGuardService} from './services/guard/admin-guard.service';
import {AuthGuardService} from './services/guard/auth-guard.service';
import {ClientGuardService} from './services/guard/client-guard.service';
import {DiagramService} from './services/diagram.service';
import {GlobalSearchService} from './services/global-search.service';
import {httpInterceptorProviders} from './services/auth/interceptors/http-providers';

import {TransitService} from './services/transit.service';
import {FeedbackService} from './services/feedback.service';
import {FeedbackCriteriaService} from './services/feedback-criteria.service';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {ExcategoryComponent} from './components/main/excategory/excategory.component';
import {NonExCategoryComponent} from './components/main/excategory/non-ex-category/non-ex-category.component';
import {MenuComponent} from './components/main/menu/menu.component';
import {BackToPreviousPageBtnComponent} from './components/main/back-button/back-to-previous-page-btn.component';
import {AddUserComponent} from './components/main/menu/add-user/add-user.component';
import {StopsGridComponent} from './components/main/excategory/non-ex-category/transits/transit/stops-grid.component';
import {AddQuestionComponent} from './components/main/menu/feedback-criteria/add-question/add-question.component';
import {AverageRateComponent} from './components/main/excategory/non-ex-category/transits/transit/average-rate/average-rate.component';
import {OneFeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/one-feedback-criteria/one-feedback-criteria.component';
import {AddFeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/add-feedback-criteria/add-feedback-criteria.component';
import {GlobalSearchComponent} from './components/main/menu/global-search/global-search.component';
import {TransitsComponent} from './components/main/excategory/non-ex-category/transits/transits.component';
import {MapsComponent} from './components/main/excategory/non-ex-category/transits/transit/maps/maps.component';
import {FeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/feedback-criteria.component';
import {AddFeedbackComponent} from './components/main/excategory/non-ex-category/transits/transit/add-feedback/add-feedback.component';
import {UserLoginComponent} from './components/main/menu/user-login/user-login.component';
import {
  RaitingDiagramComponent
} from './components/main/excategory/non-ex-category/transits/transit/raiting-diagram/raiting-diagram.component';
import {
  BusyStopsDiagramComponent
} from './components/main/excategory/non-ex-category/transits/transit/busy-stops-diagram/busy-stops-diagram.component';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    ExcategoryComponent,
    MenuComponent,
    NonExCategoryComponent,
    TransitsComponent,
    MainComponent,
    FeedbackCriteriaComponent,
    AddUserComponent,
    MessageComponent,
    StopsGridComponent,
    AddQuestionComponent,
    RaitingDiagramComponent,
    AverageRateComponent,
    OneFeedbackCriteriaComponent,
    AddFeedbackCriteriaComponent,
    GlobalSearchComponent,
    BusyStopsDiagramComponent,
    BackToPreviousPageBtnComponent,
    MapsComponent,
    AddFeedbackComponent,
    BackToPreviousPageBtnComponent,
    BackToPreviousPageBtnComponent,
    UserLoginComponent
  ],
  exports: [
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    SlideshowModule,
    HttpClientModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmDirectionModule,
    MatStepperModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBMbh1BuDtFteF5bxb03EKe2-hpKYre79g'}),
    NgxChartsModule,
    Ng5BreadcrumbModule.forRoot()
  ],
  providers: [
    httpInterceptorProviders,
    AdminGuardService,
    ClientGuardService,
    AuthGuardService,
    ExcategoryService,
    UserService,
    AuthService,
    TokenStorage,
    StopService,
    TransitService,
    ExcategoryService,
    DiagramService,
    GlobalSearchService,
    FeedbackService,
    FeedbackCriteriaService],
  bootstrap: [AppComponent],
  entryComponents: [AddQuestionComponent, AddFeedbackComponent]
})
export class AppModule {
}
