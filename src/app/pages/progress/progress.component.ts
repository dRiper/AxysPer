import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  porcentaje: number = 20;
  porcentaje2: number = 20;
  constructor() { }

  ngOnInit() {
  }


}
