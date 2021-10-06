import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  @Input('flagGp') flagGpIniciar : boolean = false;
  @Input('flagGano') flagG : boolean = false;
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
