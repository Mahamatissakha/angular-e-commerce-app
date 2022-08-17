import { Component, OnInit } from '@angular/core';
import { flush } from '@angular/core/testing';
import { CartService } from '../Services/cart.service';
import { MasterService } from '../Services/master.service';
import { RegistrationService } from '../Services/registration.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private master: MasterService,
    private api: RegistrationService,
    private cart: CartService
  ) {}
  LogincartActive: boolean = false;
  GoLogcartActive: boolean = false;
  Cartdata: any;
  CartdataCount: number = 0;
  UserCartDataActive: boolean = false;
  Userdata: any;
  User_Id: number = 0;
  UserCartdata = new Array<any>();
  grandTotal:number = 0;

  ngOnInit(): void {
    this.getUSERdata();
    this.CARTDATA();
    this.ISVISIBLE();

    setInterval(() => {
      this.getUSERdata();
      this.CARTDATA();
      this.ISVISIBLE();
    }, 6000);
  }

  getUSERdata() {
    this.api.getUserdata().subscribe({
      next: (res) => {
        this.Userdata = res;
        this.USERIDFUNCTION();
      },
      error: (err) => {
        alert('Error');
      },
    });
  }

  USERIDFUNCTION() {
    if (this.Userdata != undefined && this.Userdata.length > 0) {
      for (let i = 0; i < this.Userdata.length; i++) {
        if (localStorage.getItem('token') == this.Userdata[i].User_id) {
          this.User_Id = this.Userdata[i].id;
        }
      }
    }
  }

  ISVISIBLE() {
    if (localStorage.getItem('token') == null) {
      this.LogincartActive = false;
      this.GoLogcartActive = true;
      this.UserCartDataActive = false;
    }
  }

  CARTDATA() {
    this.cart.getCart().subscribe({
      next: (data) => {
        this.Cartdata = data;
        this.UserCartdataFunction();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  UserCartdataFunction() {
    this.UserCartdata = new Array<any>();
    for (let i = 0; i < this.Cartdata.length; i++) {
      if (this.Cartdata[i].User_id == this.User_Id) {
        this.UserCartdata.push(this.Cartdata[i]);
      }
    }
    this.grandTotal = 0
    for(let i = 0; i < this.UserCartdata.length; i++){
      this.grandTotal += this.UserCartdata[i].Productprice * this.UserCartdata[i].CountProduct;
    }
    if (localStorage.getItem('token') == null) {
      this.LogincartActive = false;
      this.GoLogcartActive = true;
      this.UserCartDataActive = false;
    }else if (this.UserCartdata.length == 0) {
      this.LogincartActive = true;
      this.GoLogcartActive = false;
      this.UserCartDataActive = false;
    } else {
      this.LogincartActive = false;
      this.GoLogcartActive = false;
      this.UserCartDataActive = true;
    }
  }

  remove(id: number) {
    for (let i = 0; i < this.UserCartdata.length; i++) {
      if (this.UserCartdata[i].id === id) {
        if (this.UserCartdata[i].CountProduct > 1) {
          this.UserCartdata[i].CountProduct--;
          this.cart.putCart(this.UserCartdata[i], id).subscribe({
            next: (data) => {},
            error: (err) => {
              console.log(err);
            },
          });
        }
        break;
      }
    }
    this.UserCartdataFunction();
  }

  add(id: number) {
    for (let i = 0; i < this.UserCartdata.length; i++) {
      if (this.UserCartdata[i].id === id) {
        this.UserCartdata[i].CountProduct++;
        this.cart.putCart(this.UserCartdata[i], id).subscribe({
          next: (data) => {},
          error: (err) => {
            console.log(err);
          },
        });
        break;
      }
    }
    this.UserCartdataFunction();
  }

  removeItem(id: number) {
    for (let i = 0; i < this.UserCartdata.length; i++) {
      if (this.UserCartdata[i].id === id) {
        this.cart.deleteCart(id).subscribe({
          next: (data) => {
            alert('Product Deleted SuccessFully!');
            this.CARTDATA();
          },
          error: (err) => {
            console.log(err);
          }
        });
        break;
      }
    }
    this.UserCartdataFunction();
  }

  emptycart(){
    for(let i = 0; i < this.UserCartdata.length; i++) {
      this.cart.deleteCart(this.UserCartdata[i].id).subscribe({
        next: (data) => {
          alert('Product Deleted SuccessFully!');
          this.CARTDATA();
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
    this.UserCartdataFunction();
  }
}
