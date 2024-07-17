import { Component, inject } from '@angular/core';
import { FormularioService } from '../../services/formulario.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ImagenUploadService } from '../../services/imagen-upload.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
 })
 export class FormularioComponent {
  id:any; 
  nombre:any;
  urlImagen:any;
  imagen:any
  servicio = inject(FormularioService)
  servicioi= inject (ImagenUploadService)

  ruta = inject(ActivatedRoute)

  guardar(datos:any){
    this.servicio.putProducto(datos.value).subscribe()
    window.location.reload()
  }

  ngOnInit(): void {
    this.servicio.getImagen().subscribe(p=>{
     this.imagen=p
    })
   }
 
   eliminar(id:any){
     this.servicio.deleteImagenID(id).subscribe()
     window.location.reload()
   }

}
