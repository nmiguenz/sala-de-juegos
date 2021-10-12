import { Jugador } from 'src/app/clases/jugador';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class dbService {

  private itemsCollection: AngularFirestoreCollection<any>;
  public player : Jugador[] = [];

  constructor( private firestore:AngularFirestore) {
    this.itemsCollection = this.firestore.collection<Jugador>('chats');
  }

  getAllByOrder(nombreColeccion : string, campo : string, ordenamiento :any){
    this.itemsCollection = this.firestore.collection<Jugador>(nombreColeccion, (ref) =>
      ref.orderBy(campo,ordenamiento)
    );

    return this.itemsCollection.valueChanges().pipe(map(jugadorPoint => {
      this.player = jugadorPoint;
    }));
  }

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
