import { Component, OnInit } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { LanguageService, AuthService } from '../../../../utils';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent implements OnInit {
  constructor(
    private _languageService: LanguageService,
    private _authService: AuthService,
    private _dialog: MatDialog,
  ) { }

  userInformation = this._authService.currentUserValue.result;
  lang: string =
    this._languageService.getLanguage() == 'en'
      ? 'us'
      : this._languageService.getLanguage() || 'tr';
  ngOnInit(): void { }

  setLang(lang: string) {
    this.lang = lang == 'en' ? 'us' : lang;
    this._languageService.setLanguage(lang);
  }

  openPasswordChangeWindow() {
    this._dialog.open(ChangePasswordComponent, {
      width: '400px',
    });
  }

  async signout() {
    await this._authService.logout();
  }
}
