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
import {AdminComponent} from "./components/admin/admin.component";


const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent},
  {path: 'main/:top/:city', component: NonExCategoryComponent},
  {path: 'main/:top/:city/:id', component: TransitsComponent},
  {path: 'main/top/:city/:id/:id-transit/:name', component: StopsGridComponent},
  {path: 'main/feedback-criteria', component: FeedbackCriteriaComponent},
  {path: 'main/feedback-criteria/:id', component: OneFeedbackCriteriaComponent},
  {path: 'main/feedback-criteria/add-feedback-criteria', component: AddFeedbackCriteriaComponent},
  {path: 'main/user/add', component: AddUserComponent},
  {path: 'main/user/login', component: UserLoginComponent},
  {path: 'search/?search=/:value', component: GlobalSearchComponent},
  {path: 'feedback', component: AddFeedbackComponent},
  {path: 'direction/:id', component: MapsComponent},
  {path: 'admin', component: AdminComponent}

];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
