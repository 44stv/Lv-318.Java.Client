import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import 'hammerjs';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth/auth.service';
import {SocialService} from './services/auth/social.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from 'src/app/app-routing.module';
import {HttpModule} from '@angular/http';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {Ng5BreadcrumbModule} from 'ng5-breadcrumb';
import {MomentModule} from 'angular2-moment/moment.module';
import {AppMaterialModule} from './material.module';
import {
  AuthServiceConfig,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialLoginModule
} from 'angular-6-social-login';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {StarRatingModule} from 'angular-star-rating';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {MdcIconButtonModule} from '@angular-mdc/web';


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
import {StopService} from './services/stop.service';
import {AdminGuardService} from './services/guard/admin-guard.service';
import {AuthGuardService} from './services/guard/auth-guard.service';
import {ClientGuardService} from './services/guard/client-guard.service';
import {DiagramService} from './services/diagram.service';
import {GlobalSearchService} from './services/global-search.service';
import {AdminComponent} from './components/admin/admin.component';

import {ChooseTransitComponent} from './components/main/choose-transit/choose.transit.component';
import {TransitService} from './services/transit.service';
import {FeedbackService} from './services/feedback.service';
import {FeedbackCriteriaService} from './services/feedback-criteria.service';
import {AgmCoreModule} from '@agm/core';
import {AgmDirectionModule} from 'agm-direction';
import {ExcategoryComponent} from './components/main/excategory/excategory.component';
import {NonExCategoryComponent} from './components/main/excategory/non-ex-category/non-ex-category.component';
import {MenuComponent} from './components/main/menu/menu.component';
import {SearchFieldComponent} from './components/main/menu/search-field/search-field.component';
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
import {MyRateComponent} from './components/main/excategory/non-ex-category/transits/transit/my-rate/my-rate.component';
import {CommentComponent} from './components/main/excategory/non-ex-category/transits/transit/comments/top-level-comments/comment/comment.component';
import {CommentsComponent} from './components/main/excategory/non-ex-category/transits/transit/comments/comments.component';
import {CommentService} from './services/comment.service';
import {
  RaitingDiagramComponent
} from './components/main/excategory/non-ex-category/transits/transit/raiting-diagram/raiting-diagram.component';
import {
  BusyStopsDiagramComponent
} from './components/main/excategory/non-ex-category/transits/transit/busy-stops-diagram/busy-stops-diagram.component';
import {
  BusyHoursDiagramComponent
} from './components/main/excategory/non-ex-category/transits/transit/busy-hours-diagram/busy-hours-diagram.component';
import {InterceptorService} from './services/auth/interceptors/interceptor.service';
import {ForbiddenComponent} from './components/main/errors/forbidden/forbidden.component';
import {UpdateRoleComponent} from './components/admin/update-role/update-role.component';
import {AddCategoryComponent} from './components/admin/add-category/add-category.component';
import {AddTopCategoryComponent} from './components/admin/add-category/add-top-category/add-top-category.component';


import {
  RegistarationConfirmationComponent
} from './components/main/menu/add-user/registaration-confirmation/registaration-confirmation.component';
import {ForgetPasswordComponent} from './components/main/menu/user-login/forget-password/forget-password.component';
import {
  ForgetPasswordConfirmationComponent
} from './components/main/menu/user-login/forget-password/forget-password-confirmation/forget-password-confirmation.component';
import {LocationPickerComponent} from './components/main/menu/search-field/location-picker/location-picker.component';
import {SocialSingIn} from './components/main/menu/user-login/social-sing-in/social-sing-in.component';
import {UserProfileComponent} from './components/main/menu/user-profile/user-profile.component';
import {FriendInvitationComponent} from './components/main/menu/user-profile/friend-invitation/friend-invitation.component';
import { TopLevelCommentsComponent } from "./components/main/excategory/non-ex-category/transits/transit/comments/top-level-comments/top-level-comments.component";
import {UpdatePasswordComponent} from './components/main/menu/user-profile/update-password/update-password.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider('198242184359664')
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('1021227322496-q7977jujlatadfoql9skbeasai2550mn.apps.googleusercontent.com')
      }
    ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    ExcategoryComponent,
    ForgetPasswordConfirmationComponent,
    MenuComponent,
    NonExCategoryComponent,
    TransitsComponent,
    MainComponent,
    FeedbackCriteriaComponent,
    AddUserComponent,
    ForgetPasswordComponent,
    UserProfileComponent,
    UpdatePasswordComponent,
    FriendInvitationComponent,
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
    ChooseTransitComponent,
    BackToPreviousPageBtnComponent,
    BackToPreviousPageBtnComponent,
    UserLoginComponent,
    SearchFieldComponent,
    BusyHoursDiagramComponent,
    MyRateComponent,
    RegistarationConfirmationComponent,
    CommentsComponent,
    CommentComponent,
    TopLevelCommentsComponent,
    LocationPickerComponent,
    LocationPickerComponent,
    SocialSingIn,
    AdminComponent,
    ForbiddenComponent,
    UpdateRoleComponent,
    AddCategoryComponent,
    AddTopCategoryComponent
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
    NgxMaterialTimepickerModule.forRoot(),
    StarRatingModule.forRoot(),
    MomentModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatTabsModule,
    MatSliderModule,
    AppMaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpModule,
    HttpClientModule,
    MatNativeDateModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatMenuModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatChipsModule,
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
    MatAutocompleteModule,
    MatPaginatorModule,
    MatListModule,
    MdcIconButtonModule,
    SocialLoginModule,
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
    Ng5BreadcrumbModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    AdminGuardService,
    ClientGuardService,
    AuthGuardService,
    ExcategoryService,
    UserService,
    AuthService,
    StopService,
    TransitService,
    ExcategoryService,
    DiagramService,
    GlobalSearchService,
    FeedbackService,
    FeedbackCriteriaService,
    SocialService,
    CommentService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent],

  entryComponents: [
    AddQuestionComponent,
    AddFeedbackComponent,
    AddUserComponent,
    UserLoginComponent,
    ForgetPasswordComponent,
    ChooseTransitComponent,
    FriendInvitationComponent,
    UpdatePasswordComponent]

})
export class AppModule {
}
