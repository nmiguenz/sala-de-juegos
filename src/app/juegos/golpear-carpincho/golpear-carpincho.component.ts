
import { Component, OnInit } from '@angular/core';
import { interval, fromEvent  } from 'rxjs';

@Component({
  selector: 'app-golpear-carpincho',
  templateUrl: './golpear-carpincho.component.html',
  styleUrls: ['./golpear-carpincho.component.css']
})
export class GolpearCarpinchoComponent implements OnInit {

  lista = ["","","","","","","","carpincho","","","","","","","","","","","",""]
  tiempoRestante: number = 60;
  puntos:number = 0;
  tiempo:number = 1000;

  //Observable
  timer = interval(1000);
  timerCarpincho = interval(this.tiempo);
  
  constructor() {
  }

  // @ViewChildren(Div) squares !: QueryList<Div>; 
  
  ngOnInit(): void {
  }

  randomSquare(){
    this.lista = this.lista.sort(()=> {return Math.random() - 0.5});
  }

  countDown(){
    let intervalo = this.timer.subscribe(()=>{
      this.tiempoRestante -= 1;
      if(this.tiempoRestante <=0){
        intervalo.unsubscribe();
      }
    })
  }

  startGame(){
    this.countDown();

    let moverCarpincho = this.timerCarpincho.subscribe(()=>{
      this.randomSquare();
      if(this.tiempoRestante<=0){
        moverCarpincho.unsubscribe();
      }
    });
  }

  golpeCarpincho(hit: any){
    if(hit == 'carpincho'){
      this.puntos ++;
    }
    if(this.puntos>9 && this.puntos<=19){
      this.tiempo = this.tiempo / 1.5;
    }
    if(this.puntos>19 && this.puntos<=29){
      this.tiempo = this.tiempo / 1.7;
    }
    if(this.puntos>29 && this.puntos<=39){
      this.tiempo = this.tiempo / 1.9;
    }
    if(this.puntos>39 && this.puntos<=49){
      this.tiempo = this.tiempo / 2;
    }
    if(this.puntos>49 && this.puntos<=59){
      this.tiempo = this.tiempo / 2.3;
    } 
  }
  
}

