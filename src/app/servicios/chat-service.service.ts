import { Mensaje } from './../clases/mensaje';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '../clases/user';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: Mensaje[] = [];

  constructor( private afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
    
  }

  //Carga la coleccion de mensajes
  cargarMensaje(){

    //Get de la COLLECTION de 'CHATS'
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => 
      ref.orderBy('fecha','desc') //Query de ordenamiento
        .limit(30)
    );

    return this.itemsCollection.valueChanges().pipe(map( mensajes =>{
      this.chats = mensajes;
      
      this.chats = [];

      for(let mensaje of mensajes){
        this.chats.unshift(mensaje) //Inserta el mensaje en la primera posición del array
      }
      return this.chats;
    }));  
  }

  //Agrega un nuevo mensaje a la colección
  //No se debe enviar un mensaje vacío
  agregarMensaje(msj:string, usuarioLogueado:User){

    let mensaje : Mensaje = {
      nombre: usuarioLogueado.email!,
      mensaje: msj,
      fecha: new Date().getTime(),
      uid: usuarioLogueado.iduser
    }
    return this.itemsCollection.add(mensaje);
  }
}
