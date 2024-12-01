import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Video } from '../Interfaces/video.interface';
import { Conteudo } from '../Interfaces/conteudo.interface';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Obter todos os vídeos
  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conteudos`);
  }

  // Obter um vídeo específico pelo ID
  getVideoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/conteudos/${id}`);
  }
}