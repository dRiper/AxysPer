import { Component, OnInit, group } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService } from "../services/services.index";

import 'sweetalert';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma :FormGroup;
  
  constructor(
    public _usuarioService : UsuarioService,
    public route : Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup(
      {
        nombre : new FormControl( null, Validators.required ),
        email : new FormControl( null, [ Validators.required, Validators.email ] ),
        password : new FormControl( null, Validators.required ),
        password2 : new FormControl( null, Validators.required ),
        condiciones : new FormControl(),
      },
      {
        validators: this.sonIguales('password','password2')
      }
    );
  }

  registrarUsuario(){

    if (this.forma.invalid) {
      return
    }

    if (!this.forma.value.condiciones) {
      swal("Importante!", "Debes Aceptar las Condiciones!", "warning");
      return
    }


    let usuario = new Usuario(
      1, 
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      "1"
    );

    this._usuarioService.crearUsuario(usuario)
        .subscribe( resp => {
          console.log(resp);
        })



    
  }

  sonIguales(item1:string,item2:string){
    return (group : FormGroup) => {
      let pass1 = group.controls[item1].value;
      let pass2 = group.controls[item2].value;

      if(pass1 === pass2){
        return null
      }

      return {
        sonIguales : true
      }
    }

  }

}
