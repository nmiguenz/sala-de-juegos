import { Observable } from 'rxjs';
import { Jugador } from './../../clases/jugador';
import { User } from './../../clases/user';
import { AuthService } from 'src/app/servicios/auth.service';
import { dbService } from 'src/app/servicios/db.service';
import { Component, OnInit } from '@angular/core';
import { PreguntadosServiceService } from 'src/app/servicios/preguntados-service.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  //Constantes
  ALPHABET = "AÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚVWXYZ";
  MAX_ATTEMPTS = 6;
  MASK_CHAR = "_";
  nombreJuego = 'Ahorcado';

  //Banderas
  inicio = false;
  resultadocomp = false; //Abre componente Resultado
  ganoPerdio = false; //Abre componente Resultado => gano/perdio
  gano = false; //Muestra componente si gano

  //Palabra
  letras : any[] = []; //Letras del abecedario
  // palabras : string[] = ['elefante', 'ferrocarril', 'codigo'];
  palabra : any;
  palabraOculta : any[] = [] ;
  intentosRestantes:number = 6;
  palabraElegida:string = '';

  //Jugador
  user : User | any;
  jugador: any;
  listaJugadoresPuntaje : any[] = []; 
  puntosActuales : number = 0;
  puntosHistoricos : number = 0;
  puntosTotales : number = 0;
  puntosMayorMenor : number = 0;
  puntosPreguntados : number = 0;
  puntosHitC : number = 0;
  referenciaIdColeccion : string = '';


  //Obtener datos documentos
  listaDocumentos : any[] = [];
  
  constructor(private palabrasSrv : PreguntadosServiceService,
              private jugadorSrv : dbService,
              private authSrv : AuthService) { }

  ngOnInit(): void {
    this.obtenerJugador();
    this.obtenerJugadoresPuntaje();
  }

  //Lo comento por la inclusión del servicio
  // palabraAlAzar(){
  //   this.palabraElegida = this.palabras[Math.floor(Math.random()* this.palabras.length)];
  //   this.separaPalabra(this.palabraElegida);
  // }

  //Obtengo la palabra del servicio
  async obtenerPalabra() : Promise<any> {
    try {
      return await this.palabrasSrv.getPalabras().subscribe( (dato : any)=>{
        this.palabra = dato;
        this.separaPalabra(this.palabra.body.Word);
        console.log(this.palabra.body.Word);
      });
    } catch (error) {
      console.log('Error en obtenerPalabra', error);
    }
  }

  separaPalabra(palabra: string) {
    palabra = palabra.toUpperCase();
    for (let letra of palabra) {
      this.palabraOculta.push({
        letra : letra,
        hidden : true
      })
    }
  }

  obtenerJugador(){
   this.authSrv.isLoggedIn().subscribe(data =>{
        this.user = data;
        console.log(this.user.email, this.user.uid);
    })
  }

  iniciarJuego(){
    this.inicio = true;
    this.obtenerPalabra();
    this.setupLetras();
  }

  reiniciarJuego() {
    this.resultadocomp = false;
    this.ganoPerdio = false; 
    this.gano = false;
    this.palabraOculta = [];
    this.resetAttempts();
    this.obtenerPalabra();
    this.setupLetras();
  }

  playerWins() {
    // If there's at least a hidden letter, the player hasn't win yet
    for (let letter of this.palabraOculta) {
        if (letter.hidden) {
            return false;
        }
      }
    return true;
  }

  playerLoses() {
      return this.intentosRestantes <= 0;
  }

  //Arreglar este juego
  checkGameStatus() {
    if (this.playerWins()) {
        this.puntosActuales = (this.palabra.body.Word.length * 10)
        this.altaResultados();
        this.resultadocomp = true;
        this.ganoPerdio = true;
        this.gano = true;
    }
    if (this.playerLoses()) {
        this.resultadocomp = true;
        this.ganoPerdio = true;
    }
  }

        
  imagePath() {
      return '../../../assets/imagenes/Ahorcado/ahorcado_'+ (this.MAX_ATTEMPTS - this.intentosRestantes) +'.png';
  }

  setupLetras() {
    // We make a dictionary from the letters
    if(this.letras = []){
      for (let letra of this.ALPHABET) {
          this.letras.push({
              letra : letra,
              disabled: false, // We disable it when the user clicks on it
          })
      }
    }
  }

  resetAttempts() {
      this.intentosRestantes = this.MAX_ATTEMPTS;
  }

  displayWord() {
      let displayedWord = "";
      for (let letra of this.palabraOculta) {
          if (letra.hidden) {
              displayedWord += this.MASK_CHAR;
          } else {
              displayedWord += letra.letra;
          }
          displayedWord += " ";
      }
      return displayedWord;
  }

  letterExistsInWord(letraBuscada: string) {
      for (let letra of this.palabraOculta) {
          if (letra.letra === letraBuscada) {
              return true;
          }
      }
      return false;
  }

  discoverLetter(letraSelect:string) {
    this.palabraOculta.forEach((letra) =>{
      if(letra.letra == letraSelect){
        letra.hidden = false
      }
    })
}

  attemptWithLetter(letraSelect:any) {
    let index = this.letras.indexOf(letraSelect)
    this.letras[index].disabled = true;
    
    if (!this.letterExistsInWord(letraSelect.letra)) {
        this.intentosRestantes -= 1;
    } else {
        this.discoverLetter(letraSelect.letra);
    }
    this.checkGameStatus();
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
        this.puntosHistoricos = jugadorSeleccionado.ahorcado;
        this.puntosMayorMenor = jugadorSeleccionado.mayorMenor;
        this.puntosPreguntados = jugadorSeleccionado.preguntados;
        this.puntosHitC = jugadorSeleccionado.hitCarpincho;
        this.puntosTotales = jugadorSeleccionado.puntosTotales;
      }
    });

    console.log(this.puntosHistoricos)
    // // this.jugadorSrv.alta(this.jugador, 'puntajes');
    
    if(jugadorSeleccionado){
      
      //Si la mayor puntuación en Ahorcado no es la actual...
      if(this.puntosHistoricos > this.puntosActuales){
        
        this.jugador = {
          id : this.user.uid,
          user : this.user.email,
          ahorcado: this.puntosHistoricos,
          mayorMenor : this.puntosMayorMenor,
          preguntados : this.puntosPreguntados,
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
        this.jugador = {
          id : this.user.uid,
          user : this.user.email,
          ahorcado: this.puntosActuales,
          mayorMenor : this.puntosMayorMenor,
          preguntados : this.puntosPreguntados,
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
      
      this.jugador = {
        id : this.user.uid,
        user : this.user.email,
        ahorcado: this.puntosActuales,
        mayorMenor : 0,
        preguntados : 0,
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