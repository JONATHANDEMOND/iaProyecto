import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatServiceService } from '../../services/chat-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';

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
  messages: { text?: string; user: boolean; urlImagen?: string }[] = [];
  inputText: string = '';

  constructor(private chatService: ChatServiceService) {}

  sendMessage(): void {
    if (this.inputText.trim() !== '') {
      this.messages.push({ text: this.inputText, user: true });
      this.chatService.sendMessage(this.inputText).subscribe(response => {
        this.messages.push({ text: response, user: false });
      });
      this.inputText = '';
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.messages.push({ urlImagen: e.target.result, user: true });
      };
      reader.readAsDataURL(file);
    } else {
      this.messages.push({ text: 'No se seleccionó ningún archivo', user: true });
    }
  }
}
