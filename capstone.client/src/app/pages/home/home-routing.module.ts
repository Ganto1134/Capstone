import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { CardPurchaseComponent } from './card-purchase/card-purchase.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: MyCartComponent },
  { path: 'purchase', component: CardPurchaseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
