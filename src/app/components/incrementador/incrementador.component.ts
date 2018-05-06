import { Component, OnInit, Input, Output,EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
 @Input() porcentaje: number = 20;
 @Input() porcentaje2: number = 30;
 @Input() leyenda: string;
 @ViewChild('txtprogress') txtprogress :ElementRef;
 @Output() cambioValor:EventEmitter<number> = new EventEmitter()

  constructor() {
    this.leyenda = 'leyenda';
    console.log('leyenda',this.leyenda);
    console.log('porcentaje',this.porcentaje);
   }



  ngOnInit() {
  }

  inputChange(newValue:number){

    // let elemtHTML:any = document.getElementsByName('porcentaje')[0];


    if(newValue >= 100){
      this.porcentaje = 100;
    }else if(newValue<=0){
      this.porcentaje = 0;
    }else{
      this.porcentaje = newValue;
    }

    this.txtprogress.nativeElement.value = this.porcentaje;
    
    this.cambioValor.emit(this.porcentaje);
  } 
  cambiarValor(valor:number){

    if(this.porcentaje >= 100 && this.porcentaje >= 0 ) { this.porcentaje = 100; return } ;
    if(this.porcentaje <= 0 && this.porcentaje <= 0 ) { this.porcentaje = 0; return } ;
    this.porcentaje = this.porcentaje + valor;

    this.cambioValor.emit(this.porcentaje);
    this.txtprogress.nativeElement.focus();
  }


}
