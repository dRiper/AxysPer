import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/services.index';



@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private _document,public _ajustes : SettingsService) { }

  ngOnInit() {
    this.cololocarCheck();
  }

  cambiaColor(theme:string,link:any){
  
    this.aplicarCheck(link);
    this._ajustes.setSettings(theme);
    
  }

  aplicarCheck(link:any){
    let selectores:any = document.getElementsByClassName('selector');
    for( let ref of selectores ){
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  cololocarCheck(){
    let selectores:any = document.getElementsByClassName('selector');
    let theme = this._ajustes.ajustes.theme;
    for( let ref of selectores ){
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }

  }
}
