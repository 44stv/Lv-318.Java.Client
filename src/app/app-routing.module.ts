import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { FeedbackCriteriaComponent } from './components/main/menu/feedback-criteria/feedback-criteria.component';
import { AddUserComponent } from './components/main/menu/add-user/add-user.component';
import { GlobalSearchComponent } from './components/main/menu/global-search/global-search.component';
import { UserLoginComponent } from './components/main/menu/user-login/user-login.component';
import {NonExCategoryComponent} from './components/main/excategory/non-ex-category/non-ex-category.component';
import {TransitsComponent} from './components/main/excategory/non-ex-category/transits/transits.component';
import {StopsGridComponent} from './components/main/excategory/non-ex-category/transits/transit/stops-grid.component';
import {AddFeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/add-feedback-criteria/add-feedback-criteria.component';
import {OneFeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/one-feedback-criteria/one-feedback-criteria.component';
import {AddFeedbackComponent} from './components/main/excategory/non-ex-category/transits/transit/add-feedback/add-feedback.component';
import {MapsComponent} from './components/main/excategory/non-ex-category/transits/transit/maps/maps.component';
import {RegistarationConfirmationComponent} from './components/main/menu/add-user/registaration-confirmation/registaration-confirmation.component';
import {ForgetPasswordConfirmationComponent} from './components/main/menu/user-login/forget-password/forget-password-confirmation/forget-password-confirmation.component';
import {AdminComponent} from './components/admin/admin.component';
import {ClientGuardService} from './services/guard/client-guard.service';
import {AdminGuardService} from './services/guard/admin-guard.service';
import {ForbiddenComponent} from './components/main/errors/forbidden/forbidden.component';
import {UpdateRoleComponent} from './components/admin/update-role/update-role.component';
import {FeedbackCriteria} from './models/feedback-criteria.model';


const routes: Routes = [
  {path: 'index', redirectTo: '/main', pathMatch: 'full'},
  {
    path: 'main',
    children: [
      {path: '', component: MainComponent},

      {
        path: 'user',
        children: [
          {path: 'add', component: AddUserComponent},
          {path: 'login', component: UserLoginComponent},
        ]
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuardService],
        children: [
          {path: 'update-role', component: UpdateRoleComponent},
        ]
      },
      {
        path: 'error',
        children: [
          {path: 'forbidden', component: ForbiddenComponent}
        ]
      },
      {
        path: 'feedback-criteria',
        children: [
          {path: '', component: FeedbackCriteriaComponent},
          {path: 'add-feedback-criteria', component: AddFeedbackCriteriaComponent},
          {path: ':id', component: OneFeedbackCriteriaComponent}
        ]

      },
      {
        path: ':top/:city',
        children: [
          {path: '', component: NonExCategoryComponent},
          {
            path: ':id',
            children: [
              {path: '', component: TransitsComponent},
              {path: ':id-transit/:name', component: StopsGridComponent},
            ]
          },
        ]
      }
    ]
  },
  {path: 'search/?search=/:value', component: GlobalSearchComponent},
  {
    path: 'feedback',
    component: AddFeedbackComponent,
    canActivate: [ClientGuardService]
  },
  {path: 'direction/:id', component: MapsComponent},
  {path: 'main/user/activate/:uuid', component: RegistarationConfirmationComponent},
  {path: 'main/user/forgetpass/:uuid', component: ForgetPasswordConfirmationComponent},
];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
