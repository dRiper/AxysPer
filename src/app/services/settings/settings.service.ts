import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {

  ajustes:Ajustes = {
    themeUrl : 'assets/css/colors/default.css',
    theme : 'default'
  }

  constructor(@Inject(DOCUMENT) private _document) { 
    this.getSettings();
  }

  saveSettings(){
    localStorage.setItem('settings', JSON.stringify(this.ajustes));
  }

  getSettings(){
    if(localStorage.getItem('settings'))
    {
      this.ajustes= JSON.parse(localStorage.getItem('settings'));
      this.setSettings(this.ajustes.theme);
    }
    else
    {
      this.setSettings(this.ajustes.theme);
    }
  }

  setSettings(theme:string){


    let url = `assets/css/colors/${theme}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.theme = theme;
    this.ajustes.themeUrl = url;
    this.saveSettings();
  }
  
}

interface Ajustes {
  themeUrl: string;
  theme: string
}
