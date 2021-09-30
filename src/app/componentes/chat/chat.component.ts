import { AuthService } from 'src/app/servicios/auth.service';
import { Mensaje } from './../../clases/mensaje';
import { ChatServiceService } from './../../servicios/chat-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public openChat = false;
  @Input('isLogged') isLogged: any;

  mensaje: string = '';
  elemento: any = document.getElementById('divMensajes');


  usuarioLogueado: User = new User();

  constructor(public chatSrv: ChatServiceService,
    private auth: AuthService) {
    this.chatSrv.cargarMensaje()
      .subscribe(() => {
        // Le agrego el TimeOut para que le de tiempo a cargar los mensajes
        setTimeout(() => {
          this.scrollToTheLastElementByClass();
          // this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 500)
      });

    this.auth.isLoggedIn().subscribe(user => {
      if (!user) {
        return
      } else {
        this.usuarioLogueado.iduser = user.uid;
        this.usuarioLogueado.email = user.email!;
      }
    })
  }

  ngOnInit(): void {
    console.log(this.elemento)
    //agarro el elemento
    this.elemento = document.getElementById('divMensajes');
  }


  enviarMensaje() {
    this.chatSrv.agregarMensaje(this.mensaje, this.usuarioLogueado)
      .then(() => {
        setTimeout(() => {
          this.scrollToTheLastElementByClass();
        }, 20);
        this.mensaje = ''
      })
      .catch((error) => console.error('Error al enviar', error));
  }

  scrollToTheLastElementByClass() {
    var elements = document.getElementsByClassName('mensajeDiv');
    let ultimo: any = elements[(elements.length - 1)];
    let topPos = ultimo?.offsetTop;
    //@ts-ignore
    document.getElementById('divMensajes')?.scrollTop = topPos;
  }
}
