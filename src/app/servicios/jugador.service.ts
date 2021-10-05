import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor( private firestore:AngularFirestore) { }

  //Alta
  //Modificar campos jugador por la clase
  //NombreColeccion por el correspondiente
  async alta(jugador : any, nombreColeccion : string) : Promise<any>{
    try {
      return await this.firestore.collection(nombreColeccion).add(jugador);
    } catch (error) {
      console.log('Error en alta jugadorService: ',error);
    }
  }

  async update(id:string, nombreColeccion:string, nuevoDato : any) : Promise<any>{
    try {
      return await this.firestore.collection(nombreColeccion).doc(id).set(nuevoDato);
    } catch (error) {
      console.log('Error en update jugadorService: ',error);
    }
  }

  async baja(id:string, nombreColeccion:string) : Promise<any>{
    try {
      return await this.firestore.collection(nombreColeccion).doc(id).delete();
    } catch (error) {
      console.log('Error en baja jugadorService: ',error);
    }
  }
  
  //Obtengo todos los jugadores con puntaje
  async getAll(nombreColeccion : string) : Promise<any> {
    try {
      return await this.firestore.collection(nombreColeccion).snapshotChanges();
    } catch (error) {
      console.log('Error en getAll jugadorService: ',error);      
    }
  }

  //Obtengo todos los jugadores con puntaje
  async getById(id:string, nombreColeccion:string) : Promise<any> {
    try {
      return await this.firestore.collection('puntaje').doc(id).get()
    } catch (error) {
      console.log('Error en getById jugadorService: ',error);      
    }
  }
}
