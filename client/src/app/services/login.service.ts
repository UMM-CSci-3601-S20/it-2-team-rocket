import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Owner } from '../owner/owner';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  readonly loginUrl: string = environment.API_URL + 'login';

  constructor(private httpClient: HttpClient) {}

  getOwner() {

  }




}
