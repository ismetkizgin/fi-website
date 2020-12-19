import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../utils/services';
import { LanguageService } from '../../../utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _languageService: LanguageService,
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  model: User = new User();

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this._authService.login(loginForm.value);
    } else {
      let errorMessage: string;
      this._translateService
        .get('Please fill in the required fields')
        .subscribe((value) => (errorMessage = value));
      this._snackBar.open(errorMessage, 'X', {
        duration: 3000,
        panelClass: 'notification__error',
      });
    }
  }

  useLanguage(language: string) {
    this._languageService.setLanguage(language);
  }
}
