import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from './components/main/main.component';
import {FeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/feedback-criteria.component';
import {AddUserComponent} from './components/main/menu/add-user/add-user.component';
import {GlobalSearchComponent} from './components/main/menu/global-search/global-search.component';
import {UserLoginComponent} from './components/main/menu/user-login/user-login.component';
import {NonExCategoryComponent} from './components/main/excategory/non-ex-category/non-ex-category.component';
import {TransitsComponent} from './components/main/excategory/non-ex-category/transits/transits.component';
import {StopsGridComponent} from './components/main/excategory/non-ex-category/transits/transit/stops-grid.component';
import {AddFeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/add-feedback-criteria/add-feedback-criteria.component';
import {OneFeedbackCriteriaComponent} from './components/main/menu/feedback-criteria/one-feedback-criteria/one-feedback-criteria.component';
import {AddFeedbackComponent} from './components/main/excategory/non-ex-category/transits/transit/add-feedback/add-feedback.component';
import {MapsComponent} from './components/main/excategory/non-ex-category/transits/transit/maps/maps.component';
import {AdminComponent} from './components/admin/admin.component';


const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: 'main',
    children: [
      {
        path: 'feedback-criteria',
        children: [
          {path: '', component: FeedbackCriteriaComponent},
          {path: ':id', component: OneFeedbackCriteriaComponent},
          {path: 'add-feedback-criteria', component: AddFeedbackCriteriaComponent},
        ]

      },
      {
        path: 'user',
        children: [
          {path: 'add', component: AddUserComponent},
          {path: 'login', component: UserLoginComponent},
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
      },
      {
        path: 'admin', component: AdminComponent
      }
    ]
  },
  {path: 'search/?search=/:value', component: GlobalSearchComponent},
  {path: 'feedback', component: AddFeedbackComponent},
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
