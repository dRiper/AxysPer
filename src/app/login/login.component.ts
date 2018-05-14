import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public spin:boolean = false;
  public recuerdame:boolean = false;
  public email:string = '';


  constructor(
    public route : Router,
    public _usuarioService:UsuarioService
  ) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    console.log(this.email);
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(forma : NgForm){
    this.spin =true;
    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null,null,forma.value.email,forma.value.password,"1");
    this._usuarioService.login(usuario,forma.value.recuerdame)
                        .subscribe( correcto => this.route.navigate(['/dashboard']) );
                             
  }

}
