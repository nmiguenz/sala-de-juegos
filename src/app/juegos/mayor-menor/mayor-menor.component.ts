import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Carta } from 'src/app/clases/carta';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent{

  errores:number = 0;
  puntos:number = 0;
  carta = false;
  inicio = false;

  timerShow = timer(2000);

  listaCartas:Carta[] = [{palo: 'oro', numero: 1, imagenUrl: '../../../assets/imagenes/cartas/Oro/1_oro.png'},
                        {palo: 'oro', numero: 2, imagenUrl: '../../../assets/imagenes/cartas/Oro/2_oro.png'},
                        {palo: 'oro', numero: 3, imagenUrl: '../../../assets/imagenes/cartas/Oro/3_oro.png'},
                        {palo: 'oro', numero: 4, imagenUrl: '../../../assets/imagenes/cartas/Oro/4_oro.png'},
                        {palo: 'oro', numero: 5, imagenUrl: '../../../assets/imagenes/cartas/Oro/5_oro.png'},
                        {palo: 'oro', numero: 6, imagenUrl: '../../../assets/imagenes/cartas/Oro/6_oro.png'}
                        ];

  mazoCartas = this.listaCartas;
  cartaVisible : any;
  cartaInvisible : any;

  constructor() {
  }

  iniciarJuego(){
    this.inicio = true;
    this.mezclarMazo();
    this.seleccionCartas();
  }

  mezclarMazo(){
    //Desordeno el array 
    this.mazoCartas.sort(() => Math.random() - 0.5);
  }

  seleccionCartas(){
    this.cartaVisible = this.mazoCartas[0];
    this.cartaInvisible = this.mazoCartas[1];
    console.log(this.cartaInvisible);
  }

  darVueltaCarta(){
    if(this.carta){
      let intervalo = this.timerShow.subscribe(()=>{
        if(this.errores == 3 || this.mazoCartas.length-1 <2 ){
          intervalo.unsubscribe();
          this.finalizarJuego()
        }
        else{
          this.carta = false;
          console.log(this.mazoCartas.length)
          this.mazoCartas.splice(0,1);
          this.seleccionCartas();
        }
      })
    }
  }

  //Accion del botón
  elegirAccion(valorBoton:string){

    if(valorBoton == 'mayor'){
      this.carta = true;

      if(this.cartaVisible.numero < this.cartaInvisible.numero){
        console.log('Ganó');
        this.puntos ++;
      }
      else{
        console.log('Perdió');
        if(this.puntos>0){
          this.puntos --;
        }
        this.errores ++;
      }
    }

    else if(valorBoton == 'igual'){
      this.carta = true;

      if(this.cartaVisible.numero == this.cartaInvisible.numero){
        console.log('Ganó');
        this.puntos ++;
      }
      else{
        console.log('Perdió');
        if(this.puntos>0){
          this.puntos --;
        }
        this.errores ++;
      }
    }

    else{
      this.carta = true;

      if(this.cartaVisible.numero > this.cartaInvisible.numero){
        console.log('Ganó');
        this.puntos ++;
      }
      else{
        console.log('Perdió');
        if(this.puntos>0){
          this.puntos --;
        }
        this.errores ++;
      }
    }
    
    this.darVueltaCarta();
  }

  //Lógica de asignación de puntos
  //Generar pantalla de final
  finalizarJuego(){
    if(this.mazoCartas.length-1 == 1){
      console.log('Ganaste el juego');
    }
    else{
      console.log('terminó el juego, tus puntos son:'+this.puntos);

    }
    this.inicio = false;
  }

}
