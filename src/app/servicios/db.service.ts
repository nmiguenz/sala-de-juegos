import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class dbService {

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
  async getAll(nombreColeccion : string) : Promise<any>{
    try {
      return await this.firestore.collection(nombreColeccion).snapshotChanges();
    } catch (error) {
      console.log('Error en getAll jugadorService: ',error);      
    }
  }

  //Suscribe
  // async getById(id:string, nombreColeccion:string){ 
  //     try {
  //       return await this.firestore.collection(nombreColeccion).doc(id).get(); //.get()
  //     } catch (error : any) {
  //       console.log('Error en getAll jugadorService: ',error);      
  //       return error;
  //     }
  //   }

  getById(id:string, nombreColeccion:string){
    return this.firestore.collection(nombreColeccion).doc(id).snapshotChanges();
  }
}
