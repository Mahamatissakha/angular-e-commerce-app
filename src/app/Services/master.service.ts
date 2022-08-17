import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  constructor(private router: Router, private api: RegistrationService) {}
  Userdata: any;

  IsLogin() {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  Loginfuncation() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/Login']);
    }
  }

  RoleFunction() {
    this.getAllproduct();
    if (this.Userdata != undefined) {
      if (localStorage.getItem('token') == this.Userdata[0].User_id) {
        return true;
      } else {
        return false;
      }
    }else {
      return false
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
