import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
 usuario :Usuario;
  constructor(
    public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;
    // console.log(this._usuarioService.usuario);
  }

}
