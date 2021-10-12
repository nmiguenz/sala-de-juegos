import { Jugador } from 'src/app/clases/jugador';
import { dbService } from 'src/app/servicios/db.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-puntajes',
  templateUrl: './listado-puntajes.component.html',
  styleUrls: ['./listado-puntajes.component.css']
})
export class ListadoPuntajesComponent implements OnInit {

  listadoPuntajes : Jugador[] = [];

  carros: any[] = [
    {marca: 'Audi', color: 'verde', modelo: 2001},
    {marca: 'Ford', color: 'amarillo', modelo: 2013},
    {marca: 'Mercedes', color: 'gris', modelo: 2008},
    {marca: 'Mazda', color: 'azul', modelo: 2015},
    {marca: 'Toyota', color: 'rojo', modelo: 2010},
    {marca: 'Ford', color: 'gris', modelo: 2000},
    {marca: 'Mazda', color: 'gris', modelo: 2009},
    {marca: 'Tesla', color: 'amarillo', modelo: 2004},
    {marca: 'Mercedes', color: 'amarillo', modelo: 2005},
    {marca: 'Nissan', color: 'verde', modelo: 2012}
  ];

  constructor(private db : dbService) { 
    // this.obtenerPuntajesjugador();
  }

  ngOnInit() {
    console.log(this.carros);
    this.ordenar();
    this.obtenerPuntajesjugador();
  }

  obtenerPuntajesjugador(){
    this.db.getAll('puntajes').then(response  =>{
      response.subscribe((listadoRef : any) =>{
        listadoRef.forEach((element: any) => {
          // this.listadoPuntajes.push( )
          console.log(element.payload.doc.data().id);
        });
        console.log(this.listadoPuntajes);
      });
    });

  }

  ordenar(){
    this.carros.sort(((a, b) => a.modelo - b.modelo));
    console.log('sort ',this.carros)
  }

}
