
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
  tiempoRestante: number = 60;
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
  listaJugadoresPuntaje : any[] = []; 
  puntosActuales : number = 0;
  puntosHistoricos : number = 0;
  puntosTotales : number = 0;
  puntosMayorMenor : number = 0;
  puntosPreguntados : number = 0;
  puntosAhorcado : number = 0;
  referenciaIdColeccion : string = '';

  constructor(private jugadorSrv : dbService,
              private authSrv : AuthService) {
  }
  
  ngOnInit(): void {
    this.obtenerJugador();
    this.obtenerJugadoresPuntaje();
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
    this.puntosActuales = 0; 
    this.iniciarJuego();
  }

  finalizarJuego(){
    this.resultadocomp = true;
    this.ganoPerdio = true;
    //Si hizo menos puntos que la última vez, PERDIÓ
    this.altaResultados();
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

  //Obtengo el uid del jugador logueado
  obtenerJugador(){
    this.authSrv.isLoggedIn().subscribe(data =>{
      this.user = data;
      console.log(this.user.email, this.user.uid);
    })
  }

  //Obtiene todos los puntajes de los jugadores
  obtenerJugadoresPuntaje(){
    this.jugadorSrv.getAll('puntajes').then(response =>{
      response.subscribe((listaPuntajesJugadoresRef : any) =>{

        // listaPuntajesJugadoresRef.forEach((listaPuntajes : any) => {
        //   this.listaJugadoresPuntaje.push(listaPuntajes.payload.doc.data());
        //   console.log(this.listaJugadoresPuntaje);
        // });
          
          //Podría hacer así tambien
          this.listaJugadoresPuntaje = listaPuntajesJugadoresRef.map((usuarioRef:any)=>{
            let jugador = usuarioRef.payload.doc.data();
            jugador['uid'] = usuarioRef.payload.doc.id; // le agrego el campo uid al objeto Jugador
            return jugador;
          });
      })
    });
  }


  altaResultados(){

    let jugadorSeleccionado;

    this.listaJugadoresPuntaje.forEach((jugador: any) =>{
      if(jugador.id = this.user.uid){
        jugadorSeleccionado = jugador;
        this.referenciaIdColeccion = jugadorSeleccionado.uid;
        this.puntosHistoricos = jugadorSeleccionado.hitCarpincho;
        this.puntosMayorMenor = jugadorSeleccionado.mayorMenor;
        this.puntosPreguntados = jugadorSeleccionado.preguntados;
        this.puntosAhorcado = jugadorSeleccionado.ahorcado;
        this.puntosTotales = jugadorSeleccionado.puntosTotales;
      }
    });

    console.log(this.puntosHistoricos)
    // // this.jugadorSrv.alta(this.jugador, 'puntajes');
    
    if(jugadorSeleccionado){
      
      //Si la mayor puntuación en Ahorcado no es la actual...
      if(this.puntosHistoricos > this.puntosActuales){
        this.gano = false;
        
        this.jugador = {
          id : this.user.uid,
          user : this.user.email,
          ahorcado: this.puntosAhorcado,
          mayorMenor : this.puntosMayorMenor,
          preguntados : this.puntosPreguntados,
          hitCarpincho : this.puntosHistoricos,
          puntosActuales : this.puntosActuales,
          puntosTotales : (this.puntosTotales + this.puntosActuales),
          fechaActualizacion : new Date(), 
        }

        //Update en Firebase
        this.jugadorSrv.update(this.referenciaIdColeccion, 'puntajes', this.jugador);

      }
      //Si los actuales son mayores a los historicos, ganó
      else{
        this.gano = true;

        this.jugador = {
          id : this.user.uid,
          user : this.user.email,
          ahorcado: this.puntosAhorcado,
          mayorMenor : this.puntosMayorMenor,
          preguntados : this.puntosPreguntados,
          hitCarpincho : this.puntosActuales,
          puntosActuales : this.puntosActuales,
          puntosTotales : (this.puntosTotales + this.puntosActuales),
          fechaActualizacion : new Date(), 
        }

        //Update en Firebase
        this.jugadorSrv.update(this.referenciaIdColeccion, 'puntajes', this.jugador);
      }

    }
    else{
      
      this.jugador = {
        id : this.user.uid,
        user : this.user.email,
        ahorcado: 0,
        mayorMenor : 0,
        preguntados : 0,
        hitCarpincho : this.puntosActuales,
        puntosActuales : this.puntosActuales,
        puntosTotales : this.puntosActuales,
        fechaActualizacion : new Date(), 
      }

      //Update en Firebase
      this.jugadorSrv.alta(this.jugador, 'puntajes');

    }
  }

}

