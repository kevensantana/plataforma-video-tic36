import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ConteudosService } from '../../services/conteudos.service';
import { CommonModule } from '@angular/common';
import { Conteudo } from '../../Interfaces/conteudo.interface';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent implements OnInit {
  video?: Conteudo;
  sanitizedVideoUrl?: SafeResourceUrl;
  quantidadeCurtidas: number = 0; 
  quantidadeFavoritos: number = 0;
  isFavorite: boolean = false;
  userId?: string;

  constructor(
    private route: ActivatedRoute,
    private conteudosService: ConteudosService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const videoId = this.route.snapshot.paramMap.get('id');

    this.auth.user$.subscribe((user) => {
      if (user) {
        this.userId = user.sub; 
      }
    });
    if (videoId) {
      this.conteudosService.getConteudo(videoId).subscribe({
        next: (video) => {
          this.video = video;
          this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            video.videourl.replace('watch?v=', 'embed/').replace('youtube.com', 'youtube-nocookie.com')
          );
          this.loadQuantidadeCurtidas(videoId); 
          this.checkIfFavorite(videoId);
        },
        error: (error) => {
          console.error('Erro ao carregar o vídeo:', error);
        }
      });
    }
  }

  loadQuantidadeCurtidas(videoId: string): void {
    this.conteudosService.getLikesForVideo(videoId).subscribe((likes) => {
      this.quantidadeCurtidas = likes.length;
    });
  }

  likeVideo(): void {
    if (this.userId && this.video) {
      this.conteudosService.postLike(this.userId, this.video.id).subscribe(() => {
        this.quantidadeCurtidas++;
      });
    }
  }

  
  favoriteVideo(): void {
    if (this.userId && this.video) {
      this.conteudosService.postFavorite(this.userId, this.video.id).subscribe(() => {
        this.isFavorite = true;
        this.quantidadeFavoritos++;
      });
    }
  }
  

  checkIfFavorite(videoId: string): void {
    if (this.userId) {
      this.conteudosService.getFavoritesForUser(this.userId).subscribe((favorites) => {
        this.isFavorite = favorites.some(fav => fav.videoId === videoId);
      });
    }
  }
  

  toggleFavorite(): void {
    if (this.userId && this.video) {
      if (this.isFavorite) {
        this.conteudosService.removeFavorite(this.userId, this.video.id).subscribe(() => {
          this.isFavorite = false;
          this.quantidadeFavoritos--; 
        });
      } else {
        this.conteudosService.postFavorite(this.userId, this.video.id).subscribe(() => {
          this.isFavorite = true; 
          this.quantidadeFavoritos++; 
        });
      }
    }
  }
    
  
  
}
