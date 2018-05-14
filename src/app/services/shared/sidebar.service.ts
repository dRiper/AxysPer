import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  public menu : any = [
    {
      titulo : 'Principal',
      icono : 'mdi mdi-gauge',
      submenu : [
        {
          titulo : 'Dashboard', url : '/dashboard',
        },
        {
          titulo : 'ProgressBar', url : '/progress',
        },
        {
          titulo : 'Gráficas', url : '/graficas1',
        },
        {
          titulo : 'Promesas', url : '/promesas',
        },
        {
          titulo : 'Rxjs', url : '/rxjs',
        }
      ]
    },
    {
      titulo : 'Gestion',
      icono : 'mdi mdi-folder-lock-open',
      submenu : [
        {
          titulo : 'Usuarios', url : '/usuarios',
        },
        {
          titulo : 'Docentes', url : '/progress',
        },
        {
          titulo : 'Administrativos', url : '/graficas1',
        }
      ]
    }
  ]

  constructor() { }

}
