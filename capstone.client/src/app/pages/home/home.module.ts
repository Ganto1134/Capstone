import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardPurchaseComponent } from './card-purchase/card-purchase.component';


@NgModule({
  declarations: [
    HomeComponent,
    CardPurchaseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
