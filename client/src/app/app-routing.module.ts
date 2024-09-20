import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileCompareUiComponent } from './components/file-compare-ui/file-compare-ui.component';

const routes: Routes = [{
  path:'', component:FileCompareUiComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
