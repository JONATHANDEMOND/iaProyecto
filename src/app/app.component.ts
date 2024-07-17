import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImagenComponent } from './components/imagen/imagen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ImagenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chatboot';
}
