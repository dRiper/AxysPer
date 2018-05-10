import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService : UsuarioService,
    public router : Router
  ){}

  canActivate(): boolean {
   if (this._usuarioService.estaLogeado()) {
     console.log("esta logeado");
     return true;
   }
    this.router.navigate(['/login']);
    console.log("esta no logeado");
  }
}
