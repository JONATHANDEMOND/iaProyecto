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
  messages: { text?: string; user: boolean; urlImagen?: string; fechaHora?: string }[] = [];
  inputText: string = '';
  file: any;
  response: any
 

  openaiService: any;

  constructor(private chatService: ChatServiceService, private servicio: ModeloService, openaiService: OpenaiService) {}

  sendMessage(): void {
    if (this.inputText.trim() !== '') {
      const userMessage = { text: this.inputText, user: true, fechaHora: this.getCurrentDateTime() };
      this.messages.push(userMessage);

      this.openaiService.sendMessage(this.inputText).subscribe((response: { choices: { message: { content: any; }; }[]; }) => {
        const botMessage = { text: response.choices[0].message.content, user: false, fechaHora: this.getCurrentDateTime() };
        this.messages.push(botMessage);
      });

      this.inputText = '';
    }
  }

  
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.messages.push({ urlImagen: e.target.result, user: true, fechaHora: this.getCurrentDateTime() });
      };
      reader.readAsDataURL(this.file);
    } else {
      this.messages.push({ text: 'No se seleccionó ningún archivo', user: true, fechaHora: this.getCurrentDateTime() });
    }
  }

  uploadImage() {
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      this.servicio.postModelo(formData).subscribe(p => {
        this.response = p;
        console.log(this.response);
      });
    } else {
      alert('Please select a file!');
    }
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toLocaleString();
  }
}
