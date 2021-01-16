import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    private _apiFetchService: ApiFetchService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  async login(user) {
    try {
      const respone: any = await this._apiFetchService.requestAsync(
        'POST',
        'login',
        user
      );
      if (respone.result) {
        localStorage.setItem('currentUser', JSON.stringify(respone));
        this.currentUserSubject.next(respone);
        this._router.navigateByUrl('/');
      }
      return respone;
    } catch (error) {
      let errorMessage: string;
      switch (error.status) {
        case 400:
          this._translateService
            .get('Your username or password is incorrect !')
            .subscribe((value) => (errorMessage = value));
          break;
        case 417:
          this._translateService
            .get('Please enter correct user information !')
            .subscribe((value) => (errorMessage = value));
          break;
        default:
          this._translateService
            .get(
              'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
            )
            .subscribe((value) => (errorMessage = value));
          break;
      }
      this._snackBar.open(errorMessage, 'X', {
        duration: 3000,
        panelClass: 'notification__error',
      });
    }
  }

  async tokenDecode() {
    try {
      if (this.currentUserValue) {
        return await this._apiFetchService.requestAsync(
          'GET',
          'token-decode',
          null,
          true
        );
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async changePassword(values) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      'change-password',
      values,
      true
    );
  }

  creatingPassword(passwordLength) {
    var lowerCharacters = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
    ];
    var upperCharacters = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
    ];
    var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var finalCharacters = lowerCharacters;
    finalCharacters = finalCharacters.concat(upperCharacters);
    finalCharacters = finalCharacters.concat(numbers);
    var passwordArray = [];
    for (var i = 1; i < passwordLength; i++) {
      passwordArray.push(
        finalCharacters[Math.floor(Math.random() * finalCharacters.length)]
      );
    }
    return passwordArray.join('');
  }

  async updateProfile(values) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      'my-account',
      values,
      true
    );
  }

  async passwordControl(values) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'password-control',
      values,
      true
    );
  }

  async deleteProfile(values) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      'my-account',
      values,
      true
    );
  }

  async signUpAsync(values) {
    return this._apiFetchService.requestAsync('POST', 'sign-up', values);
  }

  async logout() {
    localStorage.removeItem('currentUser');
    this._router.navigate(['login']);
  }

  errorNotification(error) {
    let errorMessage: string;
    switch (error.status) {
      case 401:
        this._translateService
          .get('Unauthorized transaction !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please add a correct file type !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 400:
        this._translateService
          .get('Your active password does not match !')
          .subscribe((value) => (errorMessage = value));
        break;
      default:
        this._translateService
          .get(
            'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
          )
          .subscribe((value) => (errorMessage = value));
        break;
    }
    this._snackBar.open(errorMessage, 'X', {
      duration: 3000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
