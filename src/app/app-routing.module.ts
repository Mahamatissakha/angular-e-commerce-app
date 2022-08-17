import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './guard/auth.guard';
import { RoleguardGuard } from './guard/roleguard.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ElectronicsComponent } from './Router/electronics/electronics.component';
import { FashionComponent } from './Router/fashion/fashion.component';
import { MobileComponent } from './Router/mobile/mobile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent },
  {
    path: 'addproducts',
    component: AddProductComponent,
    canActivate: [RoleguardGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'mobile', component: MobileComponent },
  { path: 'electronics', component: ElectronicsComponent },
  { path: 'fashion', component: FashionComponent },
  { path: '*', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
