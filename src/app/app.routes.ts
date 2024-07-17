import { Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { ImagenComponent } from './components/imagen/imagen.component';
import { Error404Component } from './pages/error404/error404.component';
import { ChatBootComponent } from './pages/chat-boot/chat-boot.component';

export const routes: Routes = [
    
    { path: 'formulario', component:FormularioComponent },
    { path: 'imagen', component:ImagenComponent },
    { path: 'chat', component:ChatBootComponent },

    { path: '', redirectTo:'imagen', pathMatch:'full'},
    { path: '**', component:Error404Component}

];
