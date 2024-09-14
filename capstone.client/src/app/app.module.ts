import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { CardListComponent } from './admin/card-list/card-list.component';
import { CardCreateComponent } from './admin/card-create/card-create.component';
import { CardEditComponent } from './admin/card-edit/card-edit.component';
import { CardDetailsComponent } from './admin/card-details/card-details.component';
import { MyCartComponent } from './pages/my-cart/my-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CardListComponent,
    CardCreateComponent,
    CardEditComponent,
    CardDetailsComponent,
    MyCartComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
