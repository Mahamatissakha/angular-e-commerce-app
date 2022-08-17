import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'YHAkart';
  images = [
    'assets/Image/image.png',
    'assets/Image/image1.png',
    'assets/Image/image2.png',
    'assets/Image/productautoimage.png',
  ];
  time: number = 2000;
  STIME:number = 100;
}
