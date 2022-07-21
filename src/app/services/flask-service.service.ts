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

  fnSerchVehicleServer(IDvehicle: string): Observable<any> {
    console.log(IDvehicle); 
    return this.http.get(_URL_GET+IDvehicle);
  }

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
