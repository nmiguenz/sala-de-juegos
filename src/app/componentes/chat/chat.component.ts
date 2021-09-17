import { AuthService } from 'src/app/servicios/auth.service';
import { Mensaje } from './../../clases/mensaje';
import { ChatServiceService } from './../../servicios/chat-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  mensaje:string = '';

  elemento: any;

  usuarioLogueado: User = new User();
  
  constructor( public chatSrv : ChatServiceService,
              private auth: AuthService) {
    this.chatSrv.cargarMensaje()
                .subscribe(() => {
                   
                  //Le agrego el TimeOut para que le de tiempo a cargar los mensajes
                  setTimeout(()=>{
                    this.elemento.scrollTop = this.elemento.scrollHeight;
                  },20)
                });
    
    auth.isLoggedIn().subscribe(user =>{

      if(!user){
        return
      }else{
        this.usuarioLogueado.iduser = user.uid;
        this.usuarioLogueado.email = user.email!;
        console.log(this.usuarioLogueado);
      }
    })

   }

  ngOnInit(): void {
    //agarro el elemento
    this.elemento = document.getElementById('divMensajes');
  }


  enviarMensaje(){
    this.chatSrv.agregarMensaje(this.mensaje, this.usuarioLogueado)
                .then( ()=>{ this.mensaje = ''})
                .catch( (error) => console.error('Error al enviar', error));
  }

}
