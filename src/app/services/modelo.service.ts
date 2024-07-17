import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  private API_MODELO = "http://127.0.0.1:5000/predict"
  //private API_AUTOR = "http://localhost:3000/autores"


  postModelo(file:any):Observable<any>{
    return this.http.post(this.API_MODELO,file)
  }
}
