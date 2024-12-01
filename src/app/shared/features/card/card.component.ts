import { Component, Input } from '@angular/core';
import { Conteudo } from '../../Interfaces/conteudo.interface';
import { CommonModule } from '@angular/common';
import { ConteudosService } from '../../services/conteudos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() content: any;

  
  conteudos: Conteudo[] = [];

  constructor(private conteudosService: ConteudosService) {}

  ngOnInit(): void {
    this.conteudosService.getAllConteudos().subscribe({
      next: (data) => {
        this.conteudos = data;
      },
      error: (error) => {
        console.error('Erro ao buscar conteúdos:', error);
      },
      complete: () => {
        console.log('Requisição concluída.');
      }
    });
    
  }

  formatViews(views: number): string {
    if (views >= 1000000000) {
      return (views / 1000000000).toFixed(1) + ' bi';
    } else if (views >= 1000000) {
      return (views / 1000000).toFixed(0) + ' mi';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + ' mil';
    } else {
      return views.toString();
    }
  }
}
