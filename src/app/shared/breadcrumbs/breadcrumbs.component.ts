import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Observable,operators } from "rxjs/Rx";
import  "rxjs/add/operator/map";
import  "rxjs/add/operator/filter";
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  public nombrePagina : string = "";
  constructor(
    private router : Router,
    public title : Title,
    public meta : Meta) { 
    this.getDataRoute().subscribe(
      event => {
        this.nombrePagina = event.titulo;
        this.title.setTitle(this.nombrePagina);
        let metaTag : MetaDefinition = {
          name : "description",
          content : this.nombrePagina,
          
        };
        this.meta.updateTag(metaTag);
      }
    )
    
  }

  ngOnInit() {
  }

  getDataRoute(){
    return this.router.events
    .filter( evento => evento instanceof ActivationEnd )
    .filter( (evento : ActivationEnd) => evento.snapshot.firstChild === null )
    .map((evento: ActivationEnd) => evento.snapshot.data)

  }

}
