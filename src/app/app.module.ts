import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';

import { APP_ROUTES } from './app.routes';

//MODULOS
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ServiceModule } from './services/service.module';


// import { DatatablesProductsComponent } from './datatables-products/datatables-products.component';


import {DataTableModule} from "angular2-datatable";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    // ModalUploadComponent,
    // DatatablesProductsComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    DataTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
