import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { RegistrationService } from '../Services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  Userdata: any;
  User_login: boolean = false;
  constructor(
    private app: AppComponent,
    private formbuilder: FormBuilder,
    private api: RegistrationService,
    private router: Router
  ) {
    this.LoginForm = formbuilder.group({
      email: formbuilder.control('', [Validators.required, Validators.email]),
      password: formbuilder.control('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  Images: any;
  ngOnInit(): void {
    this.Images = this.app.images[0];
    this.getAllproduct();
    console.log(this.Userdata);
  }

  onSubmit() {
    debugger;
    if (this.Userdata != undefined) {
      for (var i = 0; i < this.Userdata.length; i++) {
        if (
          this.Userdata[i].email == this.LoginForm.value.email &&
          this.Userdata[i].password == this.LoginForm.value.password
        ) {
          this.User_login = true;
          break;
        }
      }

      if (this.User_login == true) {
        localStorage.setItem('token', this.Userdata[i].User_id);
        this.User_login = false;
        this.router.navigate(['/']);
      } else {
        alert('Email and password not valid');
      }
    }
  }

  getAllproduct() {
    this.api.getUserdata().subscribe({
      next: (res) => {
        this.Userdata = res;
      },
      error: (err) => {
        alert('Error');
      },
    });
  }
}
