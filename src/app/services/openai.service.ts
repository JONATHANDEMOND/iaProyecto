// openai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiUrl = 'https://api.openai.com/v1/completions';
  private apiKey = 'sk-None-dbZEpWv7W1QbC0rwsE30T3BlbkFJOZPvYFT2JnjGLbYXLzSM';  // Reemplaza esto con tu clave API de OpenAI

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',  // o el modelo que prefieras usar
      messages: [{ role: 'user', content: message }]
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
