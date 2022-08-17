import { Component, OnInit } from '@angular/core';
import { MasterService } from '../Services/master.service';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProducatservicesService } from '../Services/producatservices.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  ProductForm!: FormGroup;
  imgsrc: any;
  Productfield: any;
  constructor(
    private master: MasterService,
    private app: AppComponent,
    private formbuilder: FormBuilder,
    private productapi: ProducatservicesService
  ) {
    this.ProductForm = formbuilder.group({
      productname: formbuilder.control('', [Validators.required]),
      productfield: formbuilder.control('', [Validators.required]),
      productimage: formbuilder.control('', [Validators.required]),
      productprice: formbuilder.control('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.imgsrc = this.app.images[3];
    setInterval(() => {
      this.master.Loginfuncation();
    }, 1000);
    this.Productfield = ['Mobile', 'Fashion', 'Electronics'];
  }

  showPreview(event: any) {
    this.imgsrc = event;
  }

  onSubmit() {
    let productdata = {
      productname: this.ProductForm.value.productname,
      productfield: this.ProductForm.value.productfield,
      productimage: this.ProductForm.value.productimage,
      productprice: Number(this.ProductForm.value.productprice),
    };
    this.productapi.postProducatdata(productdata).subscribe({
      next: (data) => {
        this.ProductForm.reset();
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.imgsrc = this.app.images[3];
  }
}
