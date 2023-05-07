import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(private http: HttpClient) { }

  createUser(dto: CreateUserDTO){
    return this.http.post(`${this.apiUrl}`, dto);
  }

  getUsers(){
    return this.http.get(this.apiUrl);
  }
}
