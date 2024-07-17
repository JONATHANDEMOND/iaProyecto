import { Routes } from '@angular/router';

import { Error404Component } from './pages/error404/error404.component';
import { ChatBootComponent } from './pages/chat-boot/chat-boot.component';

export const routes: Routes = [
    
   
    { path: 'chat', component:ChatBootComponent },

    { path: '', redirectTo:'chat', pathMatch:'full'},
    { path: '**', component:Error404Component}

];
