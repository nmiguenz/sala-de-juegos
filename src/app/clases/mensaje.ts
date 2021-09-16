export interface Mensaje {
    nombre:string;
    mensaje:string;
    uid?:string //Lo dejo opcional porque en el momento de crear el mensaje no lo tengo
    fecha?:number;
}
