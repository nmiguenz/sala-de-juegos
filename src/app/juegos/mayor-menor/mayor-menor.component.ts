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
  resultado = false;

  timerShow = timer(1500);

  listaCartas:Carta[] = [{palo: 'oro', numero: 1, imagenUrl: '../../../assets/imagenes/cartas/Oro/1_oro.png'},
                        {palo: 'oro', numero: 2, imagenUrl: '../../../assets/imagenes/cartas/Oro/2_oro.png'},
                        {palo: 'oro', numero: 3, imagenUrl: '../../../assets/imagenes/cartas/Oro/3_oro.png'},
                        {palo: 'oro', numero: 4, imagenUrl: '../../../assets/imagenes/cartas/Oro/4_oro.png'},
                        {palo: 'oro', numero: 5, imagenUrl: '../../../assets/imagenes/cartas/Oro/5_oro.png'},
                        {palo: 'oro', numero: 6, imagenUrl: '../../../assets/imagenes/cartas/Oro/6_oro.png'},
                        {palo: 'oro', numero: 7, imagenUrl: '../../../assets/imagenes/cartas/Oro/7_oro.png'},
                        {palo: 'oro', numero: 8, imagenUrl: '../../../assets/imagenes/cartas/Oro/8_oro.png'},
                        {palo: 'oro', numero: 9, imagenUrl: '../../../assets/imagenes/cartas/Oro/9_oro.png'},
                        {palo: 'oro', numero: 10, imagenUrl: '../../../assets/imagenes/cartas/Oro/10_oro.png'},
                        {palo: 'oro', numero: 11, imagenUrl: '../../../assets/imagenes/cartas/Oro/11_oro.png'},
                        {palo: 'oro', numero: 12, imagenUrl: '../../../assets/imagenes/cartas/Oro/12_oro.png'},
                        {palo: 'copa', numero: 1, imagenUrl: '../../../assets/imagenes/cartas/Copa/1_copa.png'},
                        {palo: 'copa', numero: 2, imagenUrl: '../../../assets/imagenes/cartas/Copa/2_copa.png'},
                        {palo: 'copa', numero: 3, imagenUrl: '../../../assets/imagenes/cartas/Copa/3_copa.png'},
                        {palo: 'copa', numero: 4, imagenUrl: '../../../assets/imagenes/cartas/Copa/4_copa.png'},
                        {palo: 'copa', numero: 5, imagenUrl: '../../../assets/imagenes/cartas/Copa/5_copa.png'},
                        {palo: 'copa', numero: 6, imagenUrl: '../../../assets/imagenes/cartas/Copa/6_copa.png'},
                        {palo: 'copa', numero: 7, imagenUrl: '../../../assets/imagenes/cartas/Copa/7_copa.png'},
                        {palo: 'copa', numero: 8, imagenUrl: '../../../assets/imagenes/cartas/Copa/8_copa.png'},
                        {palo: 'copa', numero: 9, imagenUrl: '../../../assets/imagenes/cartas/Copa/9_copa.png'},
                        {palo: 'copa', numero: 10, imagenUrl: '../../../assets/imagenes/cartas/Copa/10_copa.png'},
                        {palo: 'copa', numero: 11, imagenUrl: '../../../assets/imagenes/cartas/Copa/11_copa.png'},
                        {palo: 'copa', numero: 12, imagenUrl: '../../../assets/imagenes/cartas/Copa/12_copa.png'},
                        {palo: 'espada', numero: 1, imagenUrl: '../../../assets/imagenes/cartas/Espada/1_espada.png'},
                        {palo: 'espada', numero: 2, imagenUrl: '../../../assets/imagenes/cartas/Espada/2_espada.png'},
                        {palo: 'espada', numero: 3, imagenUrl: '../../../assets/imagenes/cartas/Espada/3_espada.png'},
                        {palo: 'espada', numero: 4, imagenUrl: '../../../assets/imagenes/cartas/Espada/4_espada.png'},
                        {palo: 'espada', numero: 5, imagenUrl: '../../../assets/imagenes/cartas/Espada/5_espada.png'},
                        {palo: 'espada', numero: 6, imagenUrl: '../../../assets/imagenes/cartas/Espada/6_espada.png'},
                        {palo: 'espada', numero: 7, imagenUrl: '../../../assets/imagenes/cartas/Espada/7_espada.png'},
                        {palo: 'espada', numero: 8, imagenUrl: '../../../assets/imagenes/cartas/Espada/8_espada.png'},
                        {palo: 'espada', numero: 9, imagenUrl: '../../../assets/imagenes/cartas/Espada/9_espada.png'},
                        {palo: 'espada', numero: 10, imagenUrl: '../../../assets/imagenes/cartas/Espada/10_espada.png'},
                        {palo: 'espada', numero: 11, imagenUrl: '../../../assets/imagenes/cartas/Espada/11_espada.png'},
                        {palo: 'espada', numero: 12, imagenUrl: '../../../assets/imagenes/cartas/Espada/12_espada.png'},
                        {palo: 'basto', numero: 1, imagenUrl: '../../../assets/imagenes/cartas/Basto/1_basto.png'},
                        {palo: 'basto', numero: 2, imagenUrl: '../../../assets/imagenes/cartas/Basto/2_basto.png'},
                        {palo: 'basto', numero: 3, imagenUrl: '../../../assets/imagenes/cartas/Basto/3_basto.png'},
                        {palo: 'basto', numero: 4, imagenUrl: '../../../assets/imagenes/cartas/Basto/4_basto.png'},
                        {palo: 'basto', numero: 5, imagenUrl: '../../../assets/imagenes/cartas/Basto/5_basto.png'},
                        {palo: 'basto', numero: 6, imagenUrl: '../../../assets/imagenes/cartas/Basto/6_basto.png'},
                        {palo: 'basto', numero: 7, imagenUrl: '../../../assets/imagenes/cartas/Basto/7_basto.png'},
                        {palo: 'basto', numero: 8, imagenUrl: '../../../assets/imagenes/cartas/Basto/8_basto.png'},
                        {palo: 'basto', numero: 9, imagenUrl: '../../../assets/imagenes/cartas/Basto/9_basto.png'},
                        {palo: 'basto', numero: 10, imagenUrl: '../../../assets/imagenes/cartas/Basto/10_basto.png'},
                        {palo: 'basto', numero: 11, imagenUrl: '../../../assets/imagenes/cartas/Basto/11_basto.png'},
                        {palo: 'basto', numero: 12, imagenUrl: '../../../assets/imagenes/cartas/Basto/12_basto.png'}];

  mazoCartas = this.listaCartas;
  cartaVisible : any;
  cartaInvisible : any;


  constructor() {
  }

  iniciarJuego(){
    this.resultado = false;
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
      this.resultado = true;
      console.log('Ganaste el juego');

    }
    else{
      console.log('terminó el juego, tus puntos son:'+this.puntos);

    }
    this.inicio = false;
  }

}
