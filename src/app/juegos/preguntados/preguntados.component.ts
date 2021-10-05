import { PreguntadosServiceService } from './../../servicios/preguntados-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  errores:number = 0;
  puntos:number = 0;
  carta = false;
  inicio = false;
  posicion = -1;

  //Paises
  lista : [] = [];

  //País seleccionado variables
  paisSeleccionado : any;
  index :number = 0;
  alphaCode : string = '';

  //País 1 variables
  pais1 : any;
  index1 :number = 0;

  //País 2 variables
  pais2 : any;
  index2 :number = 0;

  //Botones
  arrayBtn : string[] = [];

  constructor( private preguntadosSrv : PreguntadosServiceService) { }

  ngOnInit(): void {
    this.preguntadosSrv.getPaises().subscribe( (paises : any)=>{
      this.lista = paises;
    });
  }

  iniciarJuego(){
    this.inicio = true;
    this.paisesAleatorio();
    this.desordenarBotones();  
  }

  paisesAleatorio(){
      //this.pais = Math.floor(Math.random()*(this.lista.length)); //Devuelve el index
      //this.pais2 = this.lista[this.pais]; //Devuelve el objeto

      //Desordeno la lista de paises 
      this.lista.sort(()=> Math.random() - 0.5 );
      this.index = Math.floor(Math.random()*(this.lista.length))
      this.paisSeleccionado = this.lista[this.index];
      this.alphaCode = this.paisSeleccionado.alpha2Code.toLowerCase();
      
      this.index1 = Math.floor(Math.random()*(this.lista.length -20))
      this.pais1 = this.lista[this.index1];

      this.index2 = Math.floor(Math.random()*(this.lista.length -10))
      this.pais2 = this.lista[this.index2];
      }
  

   desordenarBotones(){
    this.arrayBtn.push(this.paisSeleccionado.name);
    this.arrayBtn.push(this.pais1.name);
    this.arrayBtn.push(this.pais2.name);

    this.arrayBtn.sort(()=> Math.random() - 0.5 );
   }

   seleccion(btn:string){

    if(btn === this.paisSeleccionado.name){
      this.puntos++
    }
    else{
      if(this.puntos>0){
        this.puntos --;
      }
      this.errores++;
    }

    this.resetBotones();

    if(this.errores <3){
      this.iniciarJuego();
    }
    else{
      //Pantalla final
      console.log('Tu puntaje es: '+this.puntos);
      this.inicio = false;
    }
  }

  resetBotones(){
    this.arrayBtn = [];
  }

}