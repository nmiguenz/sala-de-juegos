import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Carta } from 'src/app/clases/carta';
import { Jugador } from 'src/app/clases/jugador';
import { User } from 'src/app/clases/user';
import { AuthService } from 'src/app/servicios/auth.service';
import { dbService } from 'src/app/servicios/db.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit{

  //Banderas
  inicio = false;
  carta = false;
  resultadocomp = false; //Abre componente Resultado
  ganoPerdio = false; //Abre componente Resultado => gano/perdio
  gano = false; //Muestra componente si gano

  //Constantes
  nombreJuego = 'Mayor o menor';
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

  //Observable
  timerShow = timer(1000);

  //Jugador
  jugadorSrv : User | any;
  jugador: Jugador | any; 
  puntosActuales : number = 0;
  puntosHistóricos : number = 0;
  puntosTotales : number = 0;
  errores:number = 0;

  
  constructor(private puntajeSrv : dbService,
              private userSrv : AuthService) { }
    
  ngOnInit(): void {
    this.obtenerJugador();
  }

  iniciarJuego(){
    this.inicio = true;
    this.mezclarMazo();
    this.seleccionCartas();
  }

  reiniciarJuego() {
    this.resultadocomp = false;
    this.ganoPerdio = false; 
    this.gano = false;
    this.mezclarMazo();
    this.seleccionCartas();
  }

  obtenerJugador(){
    this.userSrv.isLoggedIn().subscribe(user =>{
      this.jugadorSrv = user;
    })
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
        if(this.errores >= 3 || this.mazoCartas.length-1 <2 ){
          intervalo.unsubscribe();
          this.finalizarJuego();
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
        this.puntosActuales ++;
      }
      else{
        if(this.puntosActuales>0){
          this.puntosActuales --;
        }
        this.errores ++;
      }
    }

    else if(valorBoton == 'igual'){
      this.carta = true;

      if(this.cartaVisible.numero == this.cartaInvisible.numero){
        console.log('Ganó');
        this.puntosActuales ++;
      }
      else{
        console.log('Perdió');
        if(this.puntosActuales>0){
          this.puntosActuales --;
        }
        this.errores ++;
      }
    }

    else{
      this.carta = true;

      if(this.cartaVisible.numero > this.cartaInvisible.numero){
        console.log('Ganó');
        this.puntosActuales ++;
      }
      else{
        console.log('Perdió');
        if(this.puntosActuales>0){
          this.puntosActuales --;
        }
        this.errores ++;
      }
    }
    
    this.darVueltaCarta();
  }

  altaResultados(){

    this.jugador = new Jugador();

    this.jugador['id'] = this.jugadorSrv.uid;
    this.jugador['user'] = this.jugadorSrv.email;
    this.jugador['mayorMenor'] = this.puntosActuales;
    this.jugador['puntosActuales'] = this.puntosActuales;
    this.jugador['puntosTotales'] = (this.puntosTotales + this.puntosActuales);
    this.jugador['fechaActualizacion'] = new Date();

    console.log(this.jugador);

  }
  //Lógica de asignación de puntosActuales
  //Generar pantalla de final
  finalizarJuego(){
    if(this.mazoCartas.length-1 == 1){
      this.altaResultados();
      this.resultadocomp = true;
      this.ganoPerdio = true;
      this.gano = true;

    }
    else{
      this.resultadocomp = true;
      this.ganoPerdio = true;
      console.log('terminó el juego, tus puntosActuales son:'+this.puntosActuales);
      // this.resultado = true;

    }
  }

}
