import { Component, inject } from '@angular/core';
import { ImagenUploadService } from '../../services/imagen-upload.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imagen',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './imagen.component.html',
  styleUrl: './imagen.component.css'
})
export class ImagenComponent {
servicio = inject(ImagenUploadService)
id:any; 
nombre:any;
urlImagen:any
item: any;

guardar(datos:any){
  this.servicio.postImagen(datos.value).subscribe()
  window.location.reload()
}
}
