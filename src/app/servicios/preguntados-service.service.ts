import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosServiceService {

  url : string = 'http://api.countrylayer.com/v2/all?access_key='
  url2 : string = 'https://flagcdn.com/es/codes.json';
  urlPalabras : string = 'https://palabras-aleatorias-public-api.herokuapp.com/random'
  token : string = '80ba5d7da42aaba1f6a6ae439fbd6be7';

  constructor(private httpClient : HttpClient) { }

  getPaises(){
    return this.httpClient.get(this.url + this.token);
  }

  getPalabras(){
    return this.httpClient.get(this.urlPalabras);
  }

}

//http://www.geonames.org/flags/x/ar.gif