import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  public oculto :string = 'oculto';
  public  imagenSubir :File;
  public imagenTemp: string;
  constructor() {
    console.log('modal_listo');
   }

  ngOnInit() {
  }

  seleccionImagen(archivo : File){

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      swal("Sólo imágenes", "El archivo seleccionado no es una imagen ", "error");
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }



}
