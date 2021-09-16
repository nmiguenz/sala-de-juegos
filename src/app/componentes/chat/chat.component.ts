import { Mensaje } from './../../clases/mensaje';
import { ChatServiceService } from './../../servicios/chat-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje:string = '';

  elemento: any;
  
  constructor( public chatSrv : ChatServiceService) {
    this.chatSrv.cargarMensaje()
                .subscribe(() => {
                   
                  //Le agrego el TimeOut para que 
                  setTimeout(()=>{
                    this.elemento.scrollTop = this.elemento.scrollHeight;
                  },20)
                });
   }

  ngOnInit(): void {
    //agarro el elemento
    this.elemento = document.getElementById('divMensajes');
  }


  enviarMensaje(){
    console.log(this.mensaje);

    this.chatSrv.agregarMensaje(this.mensaje)
                .then( ()=>{ this.mensaje = ''})
                .catch( (error) => console.error('Error al enviar', error));

  }

}
