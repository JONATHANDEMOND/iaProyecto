import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatServiceService } from '../../services/chat-service.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgxFileDropModule } from 'ngx-file-drop';



@Component({
  selector: 'app-chat-boot',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,MatToolbarModule,NgxFileDropModule],
  templateUrl: './chat-boot.component.html',
  styleUrl: './chat-boot.component.css'
})

  export class ChatBootComponent  {
    messages: any;
    inputText: string = '';
    item:any;
    user:any;
    text:any;
    name:any;
    title: any;
    file: any;
  
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
      this.file= event.target.files[0];
      if (this.file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.messages.push({ urlImagen: e.target.result, user: true });
        };
        reader.readAsDataURL(this.file);
      }else{
          this.messages.push({ text: 'No se selecciono ningun archivo', user: true });

      }
      }


      uploadFile(file:any){
        

      
      }
    

    }

    