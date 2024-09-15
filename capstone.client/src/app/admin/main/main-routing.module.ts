import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CardCreateComponent } from '../card-create/card-create.component';
import { CardEditComponent } from '../card-edit/card-edit.component';
import { CardListComponent } from '../card-list/card-list.component';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { AdminOrdersComponent } from '../admin-orders/admin-orders.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'create', component: CardCreateComponent},
  { path: 'edit/:id', component: CardEditComponent},
  { path: 'list', component: CardListComponent},
  { path: 'details/:id', component: CardDetailsComponent},
  { path: 'orders', component: AdminOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
