import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
  public user : any;
  public logueado = this.authService.isLoggedIn();

  constructor(private authService:AuthService,
              private route: Router) {}

  ngOnInit(): void {
  
  }

  // actionButton() {
  //   this.ahorcado.nativeElement.classList.remove('modal')
  // }

  redirigeAlJuego( juego : string){

    var url = '/juegos';

    //Quito las propiedades modales
    // this.elemento.removeClass('modal');

    this.route.navigate([`${url}/${juego}`]);
  }

}
