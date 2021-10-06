import { Jugador } from './../../clases/jugador';
import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  @Input('flagGp') flagGpIniciar : boolean = false;
  @Input('flagGano') flagG : boolean = false;
  @Input('jugadorResult') jugador : Jugador | any;
  @Input('nombre') nombreJuego: string = '';
  @Output() reiniciarJuegoEvent : EventEmitter<any> = new EventEmitter()

  //Banderas
  ganoPerdio = true;

  constructor() { }

  ngOnInit(): void {
  }

  enviarEvento(){
    this.reiniciarJuegoEvent.emit();
  }
}
