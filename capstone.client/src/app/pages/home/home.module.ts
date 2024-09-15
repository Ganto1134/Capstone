import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardPurchaseComponent } from './card-purchase/card-purchase.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';


@NgModule({
  declarations: [
    HomeComponent,
    CardPurchaseComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
