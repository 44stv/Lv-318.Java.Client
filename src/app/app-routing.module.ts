import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from './components/main/main.component';
import {FeedbackCriteriaComponent} from './components/admin/feedback-criteria/feedback-criteria.component';
import {GlobalSearchComponent} from './components/main/menu/global-search/global-search.component';
import {NonExCategoryComponent} from './components/main/excategory/non-ex-category/non-ex-category.component';
import {TransitsComponent} from './components/main/excategory/non-ex-category/transits/transits.component';
import {StopsGridComponent} from './components/main/excategory/non-ex-category/transits/transit/stops-grid.component';
import {
  AddFeedbackCriteriaComponent
} from './components/admin/feedback-criteria/add-feedback-criteria/add-feedback-criteria.component';
import {OneFeedbackCriteriaComponent} from './components/admin/feedback-criteria/one-feedback-criteria/one-feedback-criteria.component';
import {AddFeedbackComponent} from './components/main/excategory/non-ex-category/transits/transit/add-feedback/add-feedback.component';
import {MapsComponent} from './components/main/excategory/non-ex-category/transits/transit/maps/maps.component';
import {
  RegistarationConfirmationComponent
} from './components/main/menu/add-user/registaration-confirmation/registaration-confirmation.component';
import {
  ForgetPasswordConfirmationComponent
} from './components/main/menu/user-login/forget-password/forget-password-confirmation/forget-password-confirmation.component';
import {UserProfileComponent} from './components/main/menu/user-profile/user-profile.component';
import {AdminComponent} from './components/admin/admin.component';
import {ClientGuardService} from './services/guard/client-guard.service';
import {AdminGuardService} from './services/guard/admin-guard.service';
import {ForbiddenComponent} from './components/main/errors/forbidden/forbidden.component';
import {UpdateRoleComponent} from './components/admin/update-role/update-role.component';
import {AddCategoryComponent} from './components/admin/add-category/add-category.component';
import {UsersConfComponent} from './components/admin/users-conf/users-conf.component';


const routes: Routes = [
  {path: 'index', redirectTo: '/main', pathMatch: 'full'},
  {
    path: 'main',
    children: [
      {path: '', component: MainComponent},
      {
        path: 'user',
        children: [
          {path: 'profile', component: UserProfileComponent},
          {path: 'activate/:uuid', component: RegistarationConfirmationComponent},
          {path: 'forgetpass/:uuid', component: ForgetPasswordConfirmationComponent},
        ]
      },
      {
        path: 'admin',
        canActivate: [AdminGuardService],
        children: [
          {path: '', component: AdminComponent},
          {path: 'update-role', component: UpdateRoleComponent},
          {path: 'add-category', component: AddCategoryComponent},
          {path: 'all-users', component: UsersConfComponent},
          {
            path: 'feedback-criteria',
            children: [
              {path: '', component: FeedbackCriteriaComponent},
              {path: 'add-feedback-criteria', component: AddFeedbackCriteriaComponent},
              {path: ':id', component: OneFeedbackCriteriaComponent}
            ]
          }
        ]
      },
      {
        path: 'error',
        children: [
          {path: 'forbidden', component: ForbiddenComponent}
        ]
      }

    ]
  },
  {path: 'main/:top/:city', component: NonExCategoryComponent},
  {path: 'main/:top/:city/:id', component: TransitsComponent},
  {path: 'main/:top/:city/:id/transit/:id-transit/:name/:iconUrl', component: StopsGridComponent},
  {path: 'search/:value', component: GlobalSearchComponent},
  {
    path: 'feedback',
    component: AddFeedbackComponent,
    canActivate: [ClientGuardService]
  },
  {path: 'direction/:id', component: MapsComponent},
];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
