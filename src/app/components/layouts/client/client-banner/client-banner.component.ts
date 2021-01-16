import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../change-password/change-password.component';
import { AuthService, LanguageService } from '../../../../utils';

@Component({
  selector: 'app-client-banner',
  templateUrl: './client-banner.component.html',
  styleUrls: ['./client-banner.component.scss']
})
export class ClientBannerComponent implements OnInit {

  constructor(
    private _dialog: MatDialog, 
    private _authService: AuthService,
    private _languageService: LanguageService,
  ) { }

  userInformation = this._authService.currentUserValue?.result;
  lang: string =
  this._languageService.getLanguage() == 'en'
    ? 'us'
    : this._languageService.getLanguage() || 'tr';

  ngOnInit(): void {
  }

  async signout() {
    await this._authService.logout();
  }

  openPasswordChangeWindow() {
    this._dialog.open(ChangePasswordComponent, {
      width: '400px',
    });
  }

  setLang(lang: string) {
    this.lang = lang == 'en' ? 'us' : lang;
    this._languageService.setLanguage(lang);
  }

}
