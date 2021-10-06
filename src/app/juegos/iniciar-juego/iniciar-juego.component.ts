import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-iniciar-juego',
  templateUrl: './iniciar-juego.component.html',
  styleUrls: ['./iniciar-juego.component.css']
})
export class IniciarJuegoComponent implements OnInit {

  @Input('nombre') nombreJuego: string = '';
  @Output() iniciarJuegoEvent : EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  iniciarJuegoE(){
    this.iniciarJuegoEvent.emit();
  }

}
