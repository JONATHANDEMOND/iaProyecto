import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http: HttpClient) { }

  private API_IMAGEN ="http://localhost:3000/imagenes"

  getImagen(): Observable<any> {
    return this.http.get(this.API_IMAGEN)
  }


  getDatos(id:any):Observable<any>{
    return this.http.get(`${this.API_IMAGEN}/${id}`)
  }

  deleteImagenID(id:any):Observable<any>{
return this.http.delete(`${this.API_IMAGEN}/${id}`)
  }

  postImagen(productos:JSON):Observable<any>{
    return this.http.post(this.API_IMAGEN, productos)
  }


  putProducto(producto:any):Observable<any>{
    return this.http.put(`${this.API_IMAGEN}/${producto.id}`, producto)
  }
}

