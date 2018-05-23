import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import { FormsModule,FormControl, Validators,ReactiveFormsModule  } from "@angular/forms";
import { ShareModule } from "../shared/share.module";
import { ChartsModule } from 'ng2-charts';


import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { PAGES_ROUTES } from "./pages.routes";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from "../pipes/pipes.module";
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { HttpModule } from '@angular/http';

import { DataTablesModule  } from 'angular-datatables';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { AlumnosComponent } from './alumnos/alumnos.component';


@NgModule({
    declarations :[
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent, ModalUploadComponent, AlumnosComponent
    ],
    exports : [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports :[
        BrowserModule,
        ShareModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule,
        DataTablesModule,
        HttpModule,
        ReactiveFormsModule
    ]
})

export class PagesModule {

}