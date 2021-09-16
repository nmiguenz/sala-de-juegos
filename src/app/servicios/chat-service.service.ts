import { Mensaje } from './../clases/mensaje';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { textSpanOverlap } from 'typescript';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private itemsCollection: AngularFirestoreCollection<any>;

  public chats: Mensaje[] = [];

  constructor( private afs: AngularFirestore) { 
    this.itemsCollection = this.afs.collection<Mensaje>('chats');
  }

  cargarMensaje(){

    //Get de la COLLECTION de 'CHATS'
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => 
      ref.orderBy('fecha','desc') //Query de ordenamiento
        .limit(5)
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

  agregarMensaje(msj:string){

    let mensaje : Mensaje = {

      nombre: 'Juan',
      mensaje: msj,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add(mensaje);

  }
}
