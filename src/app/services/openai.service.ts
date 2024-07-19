// openai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import {OpenAI} from "openai";
@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  
 
  constructor(private http: HttpClient) { }
  private API_ASISTENTE = "http://127.0.0.1:5000/asistente"
   private API_AUDIO = "http://127.0.0.1:5000/audioAssist"


  askAsistant(mensaje:any):Observable<any>{
    const requestData={mensaje:mensaje}
    return this.http.post(this.API_ASISTENTE,requestData)
  }

  uploadAudio(file:any):Observable<any>{
    return this.http.post(this.API_AUDIO,file)
  }


  
}
