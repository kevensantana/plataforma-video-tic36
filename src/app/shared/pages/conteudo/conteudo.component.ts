import { Component, OnInit } from '@angular/core';
import { Conteudo } from '../../Interfaces/conteudo.interface';
import { AuthService } from '@auth0/auth0-angular';
import { ConteudosService } from '../../services/conteudos.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss']
})
export class ConteudoComponent implements OnInit {
  userId?: string;
  favoritos: Conteudo[] = [];  // Armazenar os vídeos favoritos
  loading: boolean = true;  // Para mostrar um carregando até obter os dados

  constructor(
    private auth: AuthService,
    private conteudosService: ConteudosService
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.userId = user.sub;

        if (this.userId) {
          this.conteudosService.getFavoritesForUser(this.userId).subscribe({
            next: (favorites) => {
              const favoriteVideoIds = favorites.map(fav => fav.videoId); 
             
              this.conteudosService.getAll().subscribe({
                next: (videos) => {
              
                  this.favoritos = videos.filter(video => favoriteVideoIds.includes(video.id));
                  this.loading = false; 
                },
                error: (error) => {
                  console.error('Erro ao carregar os vídeos', error);
                  this.loading = false;  
                }
              });
            },
            error: (error) => {
              console.error('Erro ao carregar os vídeos favoritos', error);
              this.loading = false;  
            }
          });
        }
      }
    });
  }
}