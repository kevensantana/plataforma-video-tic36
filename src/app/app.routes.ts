import { Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { ProfileComponent } from './shared/pages/profile/profile.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { VideoPlayerComponent } from './shared/pages/video-player/video-player.component';
import { ConteudoComponent } from './shared/pages/conteudo/conteudo.component';



export const routes: Routes = [

  { path: '',  component: HomeComponent,},
  { path: 'video/:id', component: VideoPlayerComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'conteudo', component: ConteudoComponent},
  
  { path: '**', component: NotFoundComponent } 

];