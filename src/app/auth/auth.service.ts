import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import { Customer } from './customer.model';

export interface AuthResponseData {
  token: string;
  expirationTime: string;
  user:userDTO;
}
export interface userDTO{
  id:string,
  name:string,
  email:string,
  customerId:string,
  password?:string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private customerId:string;

  constructor(private http: HttpClient, private router: Router) {}

  getCustomerId():string{
    return this.customerId;
  }

  signup(email: string, name:string, customerId:string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.apiBaseUrl+"users/create",
        {
          email: email,
          name: name,
          customerId:customerId,
          password: password,

        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.user,
            resData.token,
            +resData.expirationTime
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.apiBaseUrl+"login",
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          console.log(JSON.stringify(resData));
          this.handleAuthentication(
            resData.user,
            resData.token,
            +resData.expirationTime
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      customerId
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.customerId,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    console.log("REMOVING");
    localStorage.removeItem('userData');
    localStorage.removeItem('customerId');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  loadCustomers(){
    return this.http
    .get<Customer[]>(
      environment.apiBaseUrl+"customer"
    )
  }

  private handleAuthentication(
    userInfo:userDTO,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(expiresIn);
    const user = new User(userInfo.email, userInfo.id,userInfo.customerId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn-new Date().getTime());
    console.log(user);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('customerId', JSON.stringify(user.customerId));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
