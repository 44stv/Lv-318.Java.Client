import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NonExCategoryComponent} from "./components/non-ex-category/non-ex-category.component";
import {TransitsComponent} from "./components/transits/transits.component";
import {MainComponent} from "./components/main/main.component";

const routes: Routes = [
  {
    path: 'category/:top/:city', component: NonExCategoryComponent
  },
  {
    path: 'category/:top/:city/:id', component: TransitsComponent
  },
  {
    path: 'main', component: MainComponent
  }


];

@NgModule({
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
