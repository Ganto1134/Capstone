import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { CardPurchaseComponent } from './card-purchase/card-purchase.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: MyCartComponent },
  { path: 'purchase', component: CardPurchaseComponent },
  { path: 'orders', component: MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
