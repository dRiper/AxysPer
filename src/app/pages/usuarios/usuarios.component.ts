import { Component, OnInit, group } from '@angular/core';
import { Http } from '@angular/http';
import { UsuarioService } from '../../services/services.index';
import { Usuario } from '../../models/usuario.model';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

declare var swal :any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public user : Usuario;
  public oculto :string = 'oculto';
  public pwdmodal :string ='pwdmodal';
  public modalNuevo:string ='modalNuevo';
  // public data: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";
  public data : Usuario[] = [];
  public cargando:boolean = false;
  public nombreUsuario:string;
  public modalspin:boolean = false;
  public spinSave : boolean = false;

  public nombre:string;
  frmCambiopwd :FormGroup;
  frmNuevoUsuario : FormGroup;

  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  constructor(public _usuarioservicio : UsuarioService) { }

  ngOnInit(): void {
        this.cargarUsuarios();
        this.user =this._usuarioservicio.usuario;
        this.frmCambiopwd = new FormGroup(
          {
            password : new FormControl( null, Validators.required ),
            password2 : new FormControl( null, Validators.required ),
            condiciones : new FormControl(),
          },
          {
            validators: this.sonIguales('password','password2')
          }
        );


        this.frmNuevoUsuario = new FormGroup(
          {
            nombre : new FormControl(null,Validators.required),
            email : new FormControl(null,Validators.required),
            password : new FormControl( null, Validators.required ),
            password2 : new FormControl( null, Validators.required ),
            condiciones : new FormControl(),
          },
          {
            validators: this.sonIguales('password','password2')
          }
        )
  }

  cargarUsuarios(){

    this.dtOptions = {
      destroy: true,
      retrieve: true,
      pagingType: 'full_numbers',
      processing: true,
      dom: 'Bfrtip',
      responsive: true,
      buttons: [
        'print',
        'excel'
      ],
      language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Registros",
        "infoEmpty": "Mostrando 0 to 0 of 0 Registros",
        "infoFiltered": "(Filtrado de _MAX_ total Registros)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Registros",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
    }
    };

    this.modalspin = true;
    this._usuarioservicio.listarUsuarios().subscribe(
      (resp:any) => {
          this.data = resp;
          this.dtTrigger.next();
          // console.log(this.data);
          this.modalspin = false;
      }
    );
  }


  modalCambioPwd(){
    this.pwdmodal = '';
    this.frmCambiopwd.reset();
  }

  cambiarPwd(usuario){
    this.spinSave = true;
    console.log(usuario.id);
    if (this.frmCambiopwd.invalid) {
      return
    }

    let usuariopwd = new Usuario(
      Number(usuario.id),
      '',
      '',
      this.frmCambiopwd.value.password,
      ''
    );

    this._usuarioservicio.cambiarContraseña(usuariopwd)
        .subscribe( resp => {
          swal('Password Actualizado',usuario.nombre,'success');
          this.pwdmodal = 'pwdmodal';
          this.cargarUsuarios();
          this.spinSave = false;
        })

  }

  borrarUsuario(usuario : Usuario){
    // console.log(usuario);
    if (usuario.id === this._usuarioservicio.usuario.id) {
      swal('No puede Borrar Usuario ','No se puede borrar a si mismo ' , 'error');
      return;
    }

  swal({
      title: "Estas Seguro?",
      text: "Está a punto de Borrar a !" + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._usuarioservicio.eliminarUsuario(usuario.id).subscribe(
          resp =>{
            this.cargarUsuarios();
          }
        ),
        error => { 
          console.log("Error happened" + error)
        }
      }
    });

  }
  abrirModalNuevo(){
    this.modalNuevo = '';
    this.frmNuevoUsuario.reset();

  }
  abrirModal(usuario: Usuario){
  
    this.modalspin = true;
    this._usuarioservicio.ObtenerUsuario(usuario.id).subscribe((resp:any) => {
      this.user = resp.response;
      this.oculto = '';
      this.modalspin = false;
     
    });

  }

  actualizaUsuario(user){
      this.spinSave = true;
      this._usuarioservicio.actualizarUsuario(user).subscribe(resp =>{
      this.oculto = 'oculto';
      this.spinSave = false;
      swal('Usuario Actualizado',user.nombre,'success');
      this.cargarUsuarios();
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

  guardarUsuario(){
    if (this.frmNuevoUsuario.invalid) {
      return
    }

    this.spinSave = true;
    let usuario = new Usuario(
      0,
      this.frmNuevoUsuario.value.nombre,
      this.frmNuevoUsuario.value.email,
      this.frmNuevoUsuario.value.password,
      '',
      '',
    )

    this._usuarioservicio.crearUsuario(usuario).subscribe( resp => {
        console.log(resp);
        this.modalNuevo = 'oculto';
        this.spinSave = false;
        swal('Usuario Creado',usuario.nombre,'success');
        this.cargarUsuarios();
    })
  }

}
