import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userData: User) {
    this.http
      .post("http://localhost:3000/api/users/signup", userData)
      .subscribe((document) => {
        console.log(document);
      });
  }
}
