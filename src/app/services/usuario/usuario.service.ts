import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from "../../models/usuario.model";
import { URL_SERVICIOS } from "../../config/config";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  spinImagen : boolean;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoServices : SubirArchivoService
  ) {
    this.cargar_Storage();
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";
    let headers = new HttpHeaders();
    return this.http.post(url, usuario,{headers: {'Authorization':this.token}});
  }

  cambiarContraseña(usuario: Usuario){
    let headers = new HttpHeaders();
    let url = URL_SERVICIOS + "/usuario/cambiopwd";
    return this.http.post(url, usuario,{headers: {'Authorization':this.token}});
  }

  estaLogeado() {
    return this.token.length > 5 ? true : false;
  }

  cargar_Storage() {
    
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '' ;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);

  }

  actualizarUsuario(usuario : Usuario){

    let url = URL_SERVICIOS + '/usuario/' + usuario.id;
    let headers = new HttpHeaders();
    return this.http.put(url,usuario,{headers: {'Authorization':this.token}})
                    .map((resp :any) => {
                      this.guardarStorage(resp.id,this.token,usuario);
                      
                    });
    
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }
    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario).map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      true;
    });
  }

  cambiarImagen(file: File,id: string){
     this.spinImagen = true;
     this._subirArchivoServices.subirArchivo(file,'usuarios',id)
                              .then ((resp : any) =>{
                                this.usuario.img = resp.usuario.img;
                                swal('Imagen Actualizada', this.usuario.nombre, 'success')
                                this.guardarStorage(resp.usuario.id,this.token,resp.usuario);
                                this.spinImagen = false;
                                 return true;
                              })
                              .catch((resp : any) => {
                                 console.log(resp);
                              });


  }

  listarUsuarios(){
    let url = URL_SERVICIOS + "/usuario";
    return this.http.get(url);
  }

  ObtenerUsuario(id:number){
    let url = URL_SERVICIOS + "/usuario/" + id;
    return this.http.get(url);
  }

  eliminarUsuario(idUsuario){
    let url = URL_SERVICIOS + '/usuario/' + idUsuario;
    let headers = new HttpHeaders();
    return this.http.delete(url,{headers: {'Authorization':this.token}})
    .map((resp:any) => {
      swal('Usuario Borrado','El usuario a sido eliminado correctamente','success');
      return true;
    });
  }
}
