import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatServiceService } from '../../services/chat-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ModeloService } from '../../services/modelo.service';
import { OpenaiService } from '../../services/openai.service';
import OpenAI from "openai";

@Component({
  selector: 'app-chat-boot',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxFileDropModule
  ],
  templateUrl: './chat-boot.component.html',
  styleUrls: ['./chat-boot.component.css']
})
export class ChatBootComponent {
  messages: { text?: string; user: boolean; urlImagen?:  string; audioUrl?: string; fechaHora?: string;  }[] = [];
  inputText: string = '';
  file: any;
  response: any;
 imagen:any
  audioFile: any
  audioUrl:any
  constructor(
    private chatService: ChatServiceService,
    private servicio: ModeloService,
    private openaiService: OpenaiService
  ) {}

  sendMessage(): void {
    if (this.inputText.trim() !== '') {
      const userMessage = { text: this.inputText, user: true, fechaHora: this.getCurrentDateTime() };
      this.messages.push(userMessage);

      this.openaiService.askAsistant(this.inputText).subscribe(response => {
        const botMessage = { text: response, user: false, fechaHora: this.getCurrentDateTime() };
        this.messages.push(botMessage);
      });

      this.inputText='';
    }

    if(this.imagen){
      this.messages.push({ urlImagen: this.imagen, user: true, fechaHora: this.getCurrentDateTime() });
      this.uploadImage()
      this.imagen=undefined
      this.file=undefined
    }

    if(this.audioUrl){
      this.messages.push({  user: true, audioUrl: this.audioUrl, fechaHora: this.getCurrentDateTime() });
      this.uploadFileAudio()
      this.audioUrl=undefined
      this.audioFile=undefined
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
       
          this.imagen=e.target.result
      };
      reader.readAsDataURL(this.file);
    } else {
      
    }
  }

  uploadImage() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.servicio.postModelo(formData).subscribe(p => {
        this.response = p;
        //console.log(this.response);
        const message="La prediccion para la imagen es: "+p.prediction
        this.messages.push({  text: message, user: false, fechaHora: this.getCurrentDateTime()});
      });
    } else {
      alert('Please select a file!');
    }
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }
///audio

addAudioMessage(file: File) {
  const reader = new FileReader();
  reader.onload = () => {
    //
    this.audioUrl = reader.result as string;
    
  };
  reader.readAsDataURL(file);
}

onAudioSelected(event: any) {
  this.audioFile = event.target.files[0];
  if (this.audioFile) {
    this.addAudioMessage(this.audioFile);
  }
}

uploadFileAudio() {
  if (this.audioFile) { 
    const formData = new FormData();
    formData.append('file', this.audioFile);
    this.openaiService.uploadAudio(formData).subscribe(response => {
      const message=response
      this.messages.push({ text: message, user: false, fechaHora: this.getCurrentDateTime() });
    });

  } else {
    alert('¡Por favor selecciona un archivo de audio!');
  }
}

















}
