import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CallbackComponent } from './callback.component';
const routes: Route[] = [
  {
    path: 'callback',
    component: CallbackComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
