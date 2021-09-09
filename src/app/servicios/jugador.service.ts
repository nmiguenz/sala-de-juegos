import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor( private firestore:AngularFirestore) { }

  //Agrego el empleado a la Collección de Firebase
  agregarLogJugador(jugador : any) : Promise<any>{
    return this.firestore.collection('logs').add(jugador);
  }

  
}
