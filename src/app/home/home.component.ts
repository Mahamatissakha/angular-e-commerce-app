import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { CartService } from '../Services/cart.service';
import { MasterService } from '../Services/master.service';
import { ProducatservicesService } from '../Services/producatservices.service';
import { RegistrationService } from '../Services/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private master: MasterService,
    private api: RegistrationService,
    private Productapi: ProducatservicesService,
    private app: AppComponent,
    private cart: CartService,
    private router: Router,
  ) {}

  Producatdata = new Array();
  Mobiledata = new Array();
  Fashiondata = new Array();
  Electronicsdata = new Array();
  AllData: any;
  SpinnerActive: boolean = true;
  dataloader: boolean = false;
  Spinner: string = 'assets/spinner/loading.gif';
  User_id: number = 0;
  Userdata: any;
  Cartdata: any;

  ngOnInit(): void {
    this.Spinnnerfunctions();
    this.get_alldata();
    this.CARTDATA();

    setInterval(() => {
      this.CARTDATA();
    }, this.app.STIME);
  }

  Spinnnerfunctions() {
    this.grtProductdata();
    setInterval(() => {
      this.SpinnerActive = false;
      this.dataloader = true;
    }, this.app.time);
  }

  //Registration all UserData
  get_alldata() {
    this.api.getUserdata().subscribe({
      next: (data) => {
        this.Userdata = data;
        //UserData Functions
        this.UserDataFunction();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UserDataFunction() {
    for (let i = 0; i < this.Userdata.length; i++) {
      if (this.Userdata[i].User_id == localStorage.getItem('token')) {
        this.User_id = this.Userdata[i].id;
        break;
      }
    }
  }

  // Productdata
  grtProductdata() {
    this.Productapi.getProducatdata().subscribe({
      next: (data) => {
        this.Producatdata = data;
        this.UpdateData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Update product data Array
  UpdateData() {
    if (this.Producatdata != undefined) {
      for (let i = 0; i < this.Producatdata.length; i++) {
        if (this.Producatdata[i].productfield == 'Mobile') {
          this.Mobiledata.push(this.Producatdata[i]);
        } else if (this.Producatdata[i].productfield == 'Fashion') {
          this.Fashiondata.push(this.Producatdata[i]);
        } else if (this.Producatdata[i].productfield == 'Electronics') {
          this.Electronicsdata.push(this.Producatdata[i]);
        }
      }
      let dublicatedata = new Array();
      this.AllData = dublicatedata.concat(
        this.Electronicsdata,
        this.Mobiledata,
        this.Fashiondata
      );
    }
  }

  // Add ton Cartdata Functions
  addcart(item: number) {
    if (
      localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== null
    ) {
      this.CARTDATA();
      let on: boolean = false;

      for (let i = 0; i < this.Producatdata.length; i++) {
        if (this.Producatdata[i].id == item) {
          if (this.Cartdata.length != 0) {
            for (let j = 0; j < this.Cartdata.length; j++) {
              if (
                this.Cartdata[j].User_id == this.User_id &&
                this.Cartdata[j].Product_id == this.Producatdata[i].id
              ) {
                on = true;
                break;
              }
            }

            if (on === false) {
              if (this.User_id != 0) {
                let cart_data = {
                  Product_id: this.Producatdata[i].id,
                  Productname: this.Producatdata[i].productname,
                  Productfield: this.Producatdata[i].productfield,
                  Productimage: this.Producatdata[i].productimage,
                  Productprice: this.Producatdata[i].productprice,
                  User_id: this.User_id,
                  CountProduct: 1,
                };
                this.cart.postCart(cart_data).subscribe({
                  next: (data) => {},
                  error: (err) => {
                    console.log(err);
                  },
                });
              }
            }
          } else if (this.Cartdata.length == 0) {
            let cart_data = {
              Product_id: this.Producatdata[i].id,
              Productname: this.Producatdata[i].productname,
              Productfield: this.Producatdata[i].productfield,
              Productimage: this.Producatdata[i].productimage,
              Productprice: this.Producatdata[i].productprice,
              User_id: this.User_id,
              CountProduct: 1,
            };
            this.cart.postCart(cart_data).subscribe({
              next: (data) => {},
              error: (err) => {
                console.log(err);
              },
            });
          }
          break;
        }
      }
    }else{
      this.router.navigate(['/cart']);
    }
  }

  CARTDATA() {
    this.cart.getCart().subscribe({
      next: (data) => {
        this.Cartdata = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
