
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }


  registerUser(userDetails: User) {
         return this.http.post(`${this.apiUrl}/add`, userDetails);
   }
      getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/byEmail/${email}`);
   }
}

// export class AuthService {

//   private baseUrl = 'http://localhost:3000';


//   constructor(private http: HttpClient) { }

//   addEmployee(data:any):Observable<any>{
//     return this.http.post('http://localhost:3000/employees',data);
//   }
//   UpdateEmployee(id:number,data:any):Observable<any>{
//     return this.http.put(`http://localhost:3000/employees/${id}`,data);
//   }
//   getEmployeeList():Observable<any>{
//     return this.http.get('http://localhost:3000/employees');
//   }
//   deleteEmployee(id:number):Observable<any>{
//     return this.http.delete(`http://localhost:3000/employees/${id}`);
//   }
//   registerUser(userDetails: User) {
//     return this.http.post(`${this.baseUrl}/users`, userDetails);
//   }

//   getUserByEmail(email: string): Observable<User[]> {
//     return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
//   }


// }

