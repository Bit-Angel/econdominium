import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { _URL_GET, _URL_PUT, _URL_SEND, _URL_SEND_ENTRY } from '../config/config';
import { Entrada } from '../models/entrada.interface';
import { Vehiculo } from '../models/vehiculo.interface';

@Injectable({
  providedIn: 'root'
})
export class FlaskServiceService {

  constructor(private http:HttpClient) { }
  //Funcion post que manda los datos de registro al servidor 
  fnSendDataServer(vehicle: Vehiculo): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Basic AQUIVAELTOKEN'
    });
    const params = JSON.stringify({vehicle});
    console.log(vehicle); 
    return this.http.post(_URL_SEND , params, {
      headers: httpHeaders,
    });
  }
  //Funcion que recibe una placa y manda un peticion GET
  fnSerchVehicleServer(IDvehicle: string): Observable<any> {
    console.log(IDvehicle); 
    return this.http.get(_URL_GET+IDvehicle);
  }
  //Funcion put que recibe los datos de tipo veihiculo y manda un peticion put
  fnUpdateDataServer(vehicle: Vehiculo): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Basic AQUIVAELTOKEN'
    });
    const params = JSON.stringify({vehicle});
    console.log(vehicle); 
    return this.http.put(_URL_PUT , params, {
      headers: httpHeaders,
    });
  }
  //Funcion que recibe los datos de la entrada y manda una peticion post
  fnSendEntryServer(entry:Entrada,IDvehicle:string): Observable<any>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : 'Basic AQUIVAELTOKEN'
    });
    const params = JSON.stringify({entry});
    console.log(entry); 
    return this.http.post(_URL_SEND_ENTRY+IDvehicle , params, {
      headers: httpHeaders,
    });
  }
}
