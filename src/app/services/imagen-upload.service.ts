import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenUploadService {


  constructor(private http: HttpClient) { }

  private API_IMAGEN ="http://localhost:3000/imagenes"
 
  postImagen(imagenes:JSON):Observable<any>{
    return this.http.post(this.API_IMAGEN, imagenes)
  }

}


