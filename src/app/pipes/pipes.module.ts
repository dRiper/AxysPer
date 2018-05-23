import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { DataFilterPipe } from './data-filter.pipe';

@NgModule({
  imports: [
    
  ],
  declarations: [
    ImagenPipe,
    DataFilterPipe
  ],
  exports :[
    ImagenPipe
  ]
})
export class PipesModule { }
