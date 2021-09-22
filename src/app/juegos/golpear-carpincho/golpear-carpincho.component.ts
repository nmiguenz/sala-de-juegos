import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-golpear-carpincho',
  templateUrl: './golpear-carpincho.component.html',
  styleUrls: ['./golpear-carpincho.component.css']
})
export class GolpearCarpinchoComponent implements OnInit {

  //elementos
  cuadrados:any
  carpincho:any;
  tiempoRestante:any;
  puntaje:any;

  //variables
  result:number = 0;
  hitPosition:any;
  currentTime:number = 60;
  timerId:any;
  cuadradoAleatorio:any;
  countDownTimerId:any;
  
  constructor() {}
  
  ngOnInit(): void {
    this.cuadrados = document.querySelectorAll('.square');
    this.carpincho = document.querySelector('.mole');
    this.tiempoRestante = document.querySelector('#time-left');
    this.puntaje = document.querySelector('#score');
    //this.moveMole();
    console.log(this.cuadrados);
    console.log(this.carpincho);
    console.log(this.tiempoRestante);
    console.log(this.puntaje);

    this.randomSquare();
    this.golpeCarpincho();
    //this.moveMole();
    //this.countDown();
  }

  randomSquare() {
  this.cuadrados.forEach((cuadrado:any) => {
    console.log('random', cuadrado);
    cuadrado.classList.remove('mole');
  })

  this.cuadradoAleatorio = this.cuadrados[Math.floor(Math.random() * 9)]
  this.cuadradoAleatorio.classList.add('mole');

  this.hitPosition = this.cuadradoAleatorio.id;
  }

  golpeCarpincho(){
    this.cuadrados.forEach((cuadrado:any) => {
    cuadrado.addEventListener('mousedown', () => {
        if (cuadrado.id == this.hitPosition) {
          this.result++;
          this.puntaje.textContent = this.result;
          this.hitPosition = null
        }
      })
    })

  }

  moveMole() {
    this.timerId = null;

    if(this.result<=10)
    this.timerId = setInterval(this.randomSquare, 1000);
    if(this.result > 10 && this.result <= 20 )
    this.timerId = setInterval(this.randomSquare, 1000/1.4);
    if(this.result > 20 && this.result <= 30 )
    this.timerId = setInterval(this.randomSquare, 1000/1.5);
    if(this.result > 30 && this.result <= 40 )
    this.timerId = setInterval(this.randomSquare, 1000/1.6);
    if(this.result > 40 && this.result <= 50 )
    this.timerId = setInterval(this.randomSquare, 1000/1.8);
    if(this.result > 50 && this.result <= 60 )
    this.timerId = setInterval(this.randomSquare, 1000/1.9);
  }

  countDown() {
    this.currentTime--
    this.tiempoRestante.textContent = this.currentTime

    if (this.currentTime == 0) {
      clearInterval(this.countDownTimerId)
      clearInterval(this.timerId)
      alert('GAME OVER! Your final score is ' + this.result)
    }

    this.countDownTimerId = setInterval(this.countDown, 1000);
  }
  
}
