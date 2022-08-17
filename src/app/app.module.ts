import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavebarComponent } from './navebar/navebar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { ElectronicsComponent } from './Router/electronics/electronics.component';
import { MobileComponent } from './Router/mobile/mobile.component';
import { FashionComponent } from './Router/fashion/fashion.component';

@NgModule({
  declarations: [
    AppComponent,
    NavebarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AddProductComponent,
    CartComponent,
    ElectronicsComponent,
    MobileComponent,
    FashionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
