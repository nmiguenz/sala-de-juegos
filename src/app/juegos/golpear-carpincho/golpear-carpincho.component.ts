
import { Component, OnInit } from '@angular/core';
import { interval, fromEvent  } from 'rxjs';
import { Jugador } from 'src/app/clases/jugador';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/servicios/auth.service';
import { dbService } from 'src/app/servicios/db.service';

@Component({
  selector: 'app-golpear-carpincho',
  templateUrl: './golpear-carpincho.component.html',
  styleUrls: ['./golpear-carpincho.component.css']
})
export class GolpearCarpinchoComponent implements OnInit {

  nombreJuego = 'Hit Carpincho';
  lista = ["","","","","","","","carpincho","","","","","","","","","","","",""]
  tiempoRestante: number = 5;
  tiempo:number = 1000;

  //Observable
  timer = interval(1000);
  timerCarpincho = interval(this.tiempo);

  //Banderas
  inicio = false;
  resultadocomp = false; //Abre componente Resultado
  ganoPerdio = false; //Abre componente Resultado => gano/perdio
  gano = false; //Muestra componente si gano
  
  //Jugador
  user : User | any;
  jugador: Jugador | any; 
  puntosActuales : number = 0;
  puntosHistóricos : number = 0;
  puntosTotales : number = 0;

  constructor(private jugadorSrv : dbService,
              private authSrv : AuthService) {
  }
  
  ngOnInit(): void {
    this.obtenerJugador();
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

  iniciarJuego(){
    this.inicio = true; 
    this.countDown();

    let moverCarpincho = this.timerCarpincho.subscribe(()=>{
      this.randomSquare();
      if(this.tiempoRestante<=0){
        moverCarpincho.unsubscribe();
        this.altaResultados();
        this.finalizarJuego();
      }
    });
  }

  reiniciarJuego(){
    this.resultadocomp = false;
    this.ganoPerdio = false; 
    this.gano = false;
    this.tiempoRestante = 60; 
    
    this.iniciarJuego();
  }

  finalizarJuego(){
    this.resultadocomp = true;
    this.ganoPerdio = true;
    //Si hizo menos puntos que la última vez, PERDIÓ
    
  }
  
  golpeCarpincho(hit: any){
    if(hit == 'carpincho'){
      this.puntosActuales ++;
    }
    if(this.puntosActuales>9 && this.puntosActuales<=19){
      this.tiempo = (this.tiempo / 2);
    }
    if(this.puntosActuales>19 && this.puntosActuales<=29){
      this.tiempo = (this.tiempo / 3);
    }
    if(this.puntosActuales>29 && this.puntosActuales<=39){
      this.tiempo = (this.tiempo / 4);
    }
    if(this.puntosActuales>39 && this.puntosActuales<=49){
      this.tiempo = (this.tiempo / 5);
    }
    if(this.puntosActuales>49 && this.puntosActuales<=59){
      this.tiempo = (this.tiempo / 6);
    } 
  }

  obtenerJugador(){
    this.authSrv.isLoggedIn().subscribe(data =>{
      this.user = data;
      console.log(this.user.email, this.user.uid);
    })
  }

  altaResultados(){

    this.jugador = new Jugador();

    this.jugador['id'] = this.user.uid;
    this.jugador['user'] = this.user.email;
    this.jugador['hitCarpincho'] = this.puntosActuales;
    this.jugador['puntosActuales'] = this.puntosActuales;
    this.jugador['puntosTotales'] = (this.puntosTotales + this.puntosActuales);
    // this.jugador['mayorMenor'] = 0;
    // this.jugador['preguntados'] = 0;
    // this.jugador['hitCarpincho'] = 0;
    this.jugador['fechaActualizacion'] = new Date();

    console.log(this.jugador);
    // this.puntajeSrv.alta(this.jugador, 'puntajes');
    
    // if(this.jugador){
    //   console.log('1');
    //   this.puntosHistóricos = this.jugador['ahorcado'];
    //   this.puntosTotales = this.jugador.puntosTotales;

    //   //Si la mayor puntuación en Ahorcado no es la actual...
    //   if(this.puntosHistóricos > this.puntosActuales){
    //     this.jugador.id = this.user.uid;
    //     this.jugador.user = this.user.email;
    //     this.jugador.ahorcado = this.puntosHistóricos;
    //     this.jugador.puntosTotales = (this.jugador.puntosTotales + this.puntosActuales);
    //     this.jugador.fechaActualizacion = new Date();

    //     //Update en Firebase
    //     this.puntajeSrv.update(this.user.uid, 'puntajes',this.jugador);

    //   }
    //   //Si la mayor puntuación en Ahorcado es la actual...
    //   else{
    //     this.jugador.id = this.user.uid;
    //     this.jugador.user = this.user.email;
    //     this.jugador.ahorcado = this.puntosActuales;
    //     this.jugador.puntosTotales = (this.jugador.puntosTotales + this.puntosActuales);
    //     this.jugador.fechaActualizacion = new Date();

    //     //Update en Firebase
    //     this.puntajeSrv.update(this.user.uid, 'puntajes',this.jugador);
    //   }

    // }
    // else{
    //   console.log('2');
    //   this.jugador['id'] = this.user.uid ;
    //   this.jugador.user = this.user.email;
    //   this.jugador.ahorcado = this.puntosActuales;
    //   this.jugador.puntosTotales = (this.jugador.puntosTotales + this.puntosActuales);
    //   this.jugador.fechaActualizacion = new Date();

    //   //Alta en Firebase
    //   this.puntajeSrv.alta(this.jugador, 'puntajes');
    // }

  }

}

