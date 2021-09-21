import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {

  //Constantes
  ALPHABET = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  MAX_ATTEMPTS = 6;
  MASK_CHAR = "_";

  letras : any[] = []; //Letras del abecedario
  palabras : string[] = ['elefante', 'ferrocarril', 'codigo'];
  palabraOculta : any[] = [] ;
  intentosRestantes:number = 6;

  palabraElegida:string = ''
  
  constructor() { }

  ngOnInit(): void {
    this.resetGame();
  }

  palabraAlAzar(){
    this.palabraElegida = this.palabras[Math.floor(Math.random()* this.palabras.length)];
    this.separaPalabra(this.palabraElegida);
  }

  separaPalabra(palabra: string) {
    palabra = palabra.toUpperCase();
    for (let letra of palabra) {
      this.palabraOculta.push({
        letra : letra,
        hidden : true
      })
    }
  }

  resetGame() {
    this.palabraOculta = [];
    this.resetAttempts();
    this.palabraAlAzar();
    this.setupLetras();
  }
  
  //Arreglar este juego
  checkGameStatus() {
    if (this.playerWins()) {
        console.log('gano');
        this.resetGame();
    }
    if (this.playerLoses()) {
      console.log('perdio');
        this.resetGame();
    }
  }

  // getUnhiddenWord() {
  //   let word = "";
  //   for (let letter of this.palabraOculta) {
  //       word += letter.letra;
  //   }
  //   return word;
  // }

  playerWins() {
      // If there's at least a hidden letter, the player hasn't win yet
      for (let letter of this.palabraOculta) {
          if (letter.hidden) {
              return false;
          }
      }
      return true;
  }

  playerLoses() {
      return this.intentosRestantes <= 0;
  }
        
  imagePath() {
      return '../../../assets/imagenes/Ahorcado/ahorcado_'+ (this.MAX_ATTEMPTS - this.intentosRestantes) +'.png';
  }

  setupLetras() {
    // We make a dictionary from the letters
    if(this.letras = []){
      for (let letra of this.ALPHABET) {
          this.letras.push({
              letra : letra,
              disabled: false, // We disable it when the user clicks on it
          })
      }
    }
  }

  resetAttempts() {
      this.intentosRestantes = this.MAX_ATTEMPTS;
  }

  displayWord() {
      let displayedWord = "";
      for (let letra of this.palabraOculta) {
          if (letra.hidden) {
              displayedWord += this.MASK_CHAR;
          } else {
              displayedWord += letra.letra;
          }
          displayedWord += " ";
      }
      return displayedWord;
  }

  letterExistsInWord(letraBuscada: string) {
      for (let letra of this.palabraOculta) {
          if (letra.letra === letraBuscada) {
              return true;
          }
      }
      return false;
  }

  discoverLetter(letraSelect:string) {
    
    this.palabraOculta.forEach((letra) =>{
      if(letra.letra == letraSelect){
        letra.hidden = false
      }
    })

}

  attemptWithLetter(letraSelect:any) {
  
    let index = this.letras.indexOf(letraSelect)
    this.letras[index].disabled = true;
    
    if (!this.letterExistsInWord(letraSelect.letra)) {
        this.intentosRestantes -= 1;
    } else {
        this.discoverLetter(letraSelect.letra);
    }
    this.checkGameStatus();
  }

  
}
