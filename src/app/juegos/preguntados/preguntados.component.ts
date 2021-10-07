import { AuthService } from 'src/app/servicios/auth.service';
import { PreguntadosServiceService } from './../../servicios/preguntados-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { dbService } from 'src/app/servicios/db.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  //Banderas
  inicio = false;
  resultadocomp = false; //Abre componente Resultado
  ganoPerdio = false; //Abre componente Resultado => gano/perdio
  gano = false; //Muestra componente si gano

  //Constantes
  nombreJuego = 'Preguntados';

  //Jugador
  user : User | any;
  jugador: any; 
  listaJugadoresPuntaje : any[] = []; 
  puntosActuales : number = 0;
  puntosHistoricos : number = 0;
  puntosTotales : number = 0;
  puntosMayorMenor : number = 0;
  puntosAhorcado : number = 0;
  puntosHitC : number = 0;
  referenciaIdColeccion : string = '';
  errores:number = 0;

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

  constructor( private preguntadosSrv : PreguntadosServiceService,
                private jugadorSrv : dbService,
                private authSrv : AuthService) { }

  ngOnInit(): void {
    this.preguntadosSrv.getPaises().subscribe( (paises : any)=>{
      this.lista = paises;
      console.log(this.lista);
    });

    this.obtenerJugador();
    this.obtenerJugadoresPuntaje();    
  }

  obtenerJugador(){
    this.authSrv.isLoggedIn().subscribe(data =>{
         this.user = data;
         console.log(this.user.email, this.user.uid);
     })
   }

  iniciarJuego(){
    this.inicio = true;
    this.paisesAleatorio();
    this.desordenarBotones();  
  }

  reiniciarJuego() {
    this.errores = 0;
    this.puntosActuales = 0;
    this.resultadocomp = false;
    this.ganoPerdio = false; 
    this.gano = false;
    this.paisesAleatorio();
    this.desordenarBotones(); 
  }

  finalizoJuego(){
    this.resultadocomp = true;
    this.ganoPerdio = true; 
    //Si hizo más puntos que los que tenía acumulados, ganó...
    this.gano = false;
  }

  paisesAleatorio(){
      //this.pais = Math.floor(Math.random()*(this.lista.length)); //Devuelve el index
      //this.pais2 = this.lista[this.pais]; //Devuelve el objeto

      //Desordeno la lista de paises 
      this.lista.sort(()=> Math.random() - 0.5 );
      this.index = Math.floor(Math.random()*(this.lista.length))
      this.paisSeleccionado = this.lista[this.index];
      // this.alphaCode = this.paisSeleccionado.alpha2Code.toLowerCase();
      
      this.index1 = Math.floor(Math.random()*(this.lista.length -20))
      this.pais1 = this.lista[this.index1];

      this.index2 = Math.floor(Math.random()*(this.lista.length -10))
      this.pais2 = this.lista[this.index2];
      }
  
   desordenarBotones(){
    this.arrayBtn.push(this.paisSeleccionado.translations.es);
    this.arrayBtn.push(this.pais1.translations.es);
    this.arrayBtn.push(this.pais2.translations.es);

    this.arrayBtn.sort(()=> Math.random() - 0.5 );
   }

   seleccion(btn:string){
    if(btn === this.paisSeleccionado.translations.es){
      this.puntosActuales++
    }
    else{
      if(this.puntosActuales>0){
        this.puntosActuales --;
      }
      this.errores++;
    }
    this.resetBotones();

    if(this.errores <3){
      this.iniciarJuego();
    }
    else{
      //Pantalla final
      this.altaResultados();
      this.finalizoJuego();
      
    }
  }

  resetBotones(){
    this.arrayBtn = [];
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

    let jugadorSeleccionado ;

    this.listaJugadoresPuntaje.forEach((jugador: any) =>{
      if(jugador.id == this.user.uid){
        jugadorSeleccionado = jugador;
        this.referenciaIdColeccion = jugadorSeleccionado.uid;
        this.puntosHistoricos = jugadorSeleccionado.preguntados;
        this.puntosMayorMenor = jugadorSeleccionado.mayorMenor;
        this.puntosAhorcado = jugadorSeleccionado.ahorcado;
        this.puntosHitC = jugadorSeleccionado.hitCarpincho;
        this.puntosTotales = jugadorSeleccionado.puntosTotales;
      }
    });
    
    if(jugadorSeleccionado){
      
      //Si la mayor puntuación en Ahorcado no es la actual...
      if(this.puntosHistoricos > this.puntosActuales){
        this.gano = false;

        this.jugador = {
          id : this.user.uid,
          user : this.user.email,
          ahorcado: this.puntosAhorcado,
          mayorMenor : this.puntosMayorMenor,
          preguntados : this.puntosHistoricos,
          hitCarpincho : this.puntosHitC,
          puntosActuales : this.puntosActuales,
          puntosTotales : (this.puntosTotales + this.puntosActuales),
          fechaActualizacion : new Date(), 
        }

        //Update en Firebase
        this.jugadorSrv.update(this.referenciaIdColeccion, 'puntajes', this.jugador);

      }
      //Si la mayor puntuación en Ahorcado es la actual...
      else{
        this.gano = true;

        this.jugador = {
          id : this.user.uid,
          user : this.user.email,
          ahorcado: this.puntosAhorcado,
          mayorMenor : this.puntosMayorMenor,
          preguntados : this.puntosActuales,
          hitCarpincho : this.puntosHitC,
          puntosActuales : this.puntosActuales,
          puntosTotales : (this.puntosTotales + this.puntosActuales),
          fechaActualizacion : new Date(), 
        }

        //Update en Firebase
        this.jugadorSrv.update(this.referenciaIdColeccion, 'puntajes', this.jugador);
      }

    }
    else{
      this.gano = true;
      
      this.jugador = {
        id : this.user.uid,
        user : this.user.email,
        ahorcado: 0,
        mayorMenor : 0,
        preguntados : this.puntosActuales,
        hitCarpincho : 0,
        puntosActuales : this.puntosActuales,
        puntosTotales : this.puntosActuales,
        fechaActualizacion : new Date(), 
      }

      //Update en Firebase
      this.jugadorSrv.alta(this.jugador, 'puntajes');

    }
  }

}