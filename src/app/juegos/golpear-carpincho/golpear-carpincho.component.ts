import { Cuadrados } from './../../clases/cuadrados';
import { Component, ElementRef, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-golpear-carpincho',
  templateUrl: './golpear-carpincho.component.html',
  styleUrls: ['./golpear-carpincho.component.css']
})
export class GolpearCarpinchoComponent implements OnInit {

  //Flags
  empezo:boolean = false;
  terminado:boolean = false;

  //elementos
  cuadrados:Cuadrados[] = [
    {numero: 1, seleccion : false, id: 1},
    {numero: 2, seleccion : false, id: 2},
    {numero: 3, seleccion : false, id: 3},
    {numero: 4, seleccion : false, id: 4},
    {numero: 5, seleccion : false, id: 5},
    {numero: 6, seleccion : false, id: 6},
    {numero: 7, seleccion : false, id: 7},
    {numero: 8, seleccion : false, id: 8},
    {numero: 9, seleccion : false, id: 9}
  ];
  tiempoRestante:any;
  public selector :any; 

  //variables
  result:number = 0;
  hitPosition:any;
  currentTime:number = 60;
  timerId:any;
  cuadradoAleatorio:any;
  countDownTimerId:any;

  //Observable
  timer = interval(1000);
  
  constructor() {
  }

  // @ViewChildren(Div) squares !: QueryList<Div>; 
  
  ngOnInit(): void {
    this.selector = document.querySelectorAll('square');
    console.log(this.selector);

    this.selector.forEach( (element : any, posicion:any) =>
      element.addEventListener('click', (e : any) => this.golpeCarpincho(e, posicion)));
    // this.carpincho = document.querySelector('.mole');
    
  }

  randomSquare() {

    for (let cuadrado of this.cuadrados){
      cuadrado.seleccion = false;
    }
    // this.cuadrados.forEach((node:any) => {
    //   node.classList.remove('mole');
    // });

    this.cuadradoAleatorio = this.cuadrados[Math.floor(Math.random() * 9)]
    this.cuadradoAleatorio.seleccion = true;
    console.log(this.cuadradoAleatorio);
    // this.cuadradoAleatorio.classList.add('mole');

    this.hitPosition = this.cuadradoAleatorio.id;
  }

  golpeCarpincho(e:any, posicion:any){

    const btn = e.target;
    console.log(btn);
    console.log(posicion);
    // const juego = this.turno % 2 ? {col:'red', jugador:'1'} : {col:'green', jugador:'2'}
    // btn.style.backgroundColor = juego.col;
    // this.tablero[posicion] = juego.col;
    // if (this.hasGanado()){
    //     console.log(this.tablero);
    //     alert('Bien jugador '+ juego.jugador);
    // }
  }

  // golpeCarpincho(){

  //   divCuadrados.forEach((cuadrado:any) => {
  //   cuadrado.addEventListener('mousedown', () => {
  //       if (cuadrado.id == this.hitPosition) {
  //         this.result++;
  //         this.hitPosition = null
  //       }
  //     })
  //   })
  // }

  // moverCarpincho() {
  //   this.timerId = null;

  //   if(this.result<=10)
  //   this.timerId = setInterval(this.randomSquare(), 1000);
  //   if(this.result > 10 && this.result <= 20 )
  //   this.timerId = setInterval(this.randomSquare(), 1000/1.4);
  //   if(this.result > 20 && this.result <= 30 )
  //   this.timerId = setInterval(this.randomSquare(), 1000/1.5);
  //   if(this.result > 30 && this.result <= 40 )
  //   this.timerId = setInterval(this.randomSquare(), 1000/1.6);
  //   if(this.result > 40 && this.result <= 50 )
  //   this.timerId = setInterval(this.randomSquare(), 1000/1.8);
  //   if(this.result > 50 && this.result <= 60 )
  //   this.timerId = setInterval(this.randomSquare(), 1000/1.9);
  // }

  countDown(){
    this.currentTime--;

    if (this.currentTime == 0) {
      clearInterval(this.countDownTimerId)
      clearInterval(this.timerId)
      alert('GAME OVER! Your final score is ' + this.result)
    }
  }

  startJuego(){
    this.empezo = true;
    this.randomSquare();
    this.timer.subscribe(() =>{
      this.countDown();
    })
  }
  
}

