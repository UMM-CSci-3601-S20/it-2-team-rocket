import { Component } from '@angular/core';
import { Owner } from '../owner/owner';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {


  constructor(public auth: AuthService) {}


}
