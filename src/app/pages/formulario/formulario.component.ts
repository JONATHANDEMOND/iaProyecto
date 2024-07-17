import { Component } from '@angular/core';
import { ChatBootComponent } from "../chat-boot/chat-boot.component";

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormularioComponent, ChatBootComponent],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

}
