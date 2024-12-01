import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Conteudo } from '../Interfaces/conteudo.interface';
import { ConteudoPayload } from '../Interfaces/payload-conteudo.interface';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ConteudosService {
  [x: string]: any;
  HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  // Verifica se o usuário já existe no servidor pelo ID
  checkUserExists(id: string | undefined): Observable<boolean> {
    return this.HttpClient.get<any[]>(`${this.apiUrl}/users?id=${id}`).pipe(
      map(users => users.length > 0) 
    );
  }


  constructor(private http: HttpClient) {}

  getUserConteudos(userId: string): Observable<Conteudo[]> {
    return this.http.get<Conteudo[]>(`${this.apiUrl}/conteudos?userId=${userId}`);
  }

  getAll(): Observable<Conteudo[]> {
    return this.HttpClient.get<Conteudo[]>(`${this.apiUrl}/conteudos`);
  }
  
  getAllConteudos(): Observable<Conteudo[]> {
    return this.HttpClient.get<Conteudo[]>(`${this.apiUrl}/conteudos`);
  }
  

  getConteudo(id: string): Observable<Conteudo> {
    return this.HttpClient.get<Conteudo>(`${this.apiUrl}/conteudos/${id}`);
  }
  

  postConteudo(Conteudo: Conteudo) {
    return this.HttpClient.post(`${this.apiUrl}/conteudos`, Conteudo);
  }

  putConteudo(id: string, payload: ConteudoPayload): Observable<any> {
    return this.HttpClient.put<any>(`${this.apiUrl}/conteudos/${id}`, payload);
  }

  deleteConteudo(id: string): Observable<any> {
    return this.HttpClient.delete<any>(`${this.apiUrl}/conteudos/${id}`);
  }

  // Usuários
  getAllUsers(): Observable<any[]> {
    return this.HttpClient.get<any[]>(`${this.apiUrl}/users`);
  }

  getUser(id: string): Observable<any> {
    return this.HttpClient.get<any>(`${this.apiUrl}/users/${id}`);
  }

  postUser(profile: any): Observable<any> {
    return this.HttpClient.post<any>(`${this.apiUrl}/users`, profile);
  }


  // like
  postLike(userId: string, videoId: string): Observable<any> {

    return this.http.get<any>(`${this.apiUrl}/conteudos/${videoId}`).pipe(
      switchMap((video) => {
        video.likesCount = (video.likesCount || 0) + 1;  

        return this.http.put(`${this.apiUrl}/conteudos/${videoId}`, video);
      })
    );
  }

  removeLike(userId: string, videoId: string): Observable<any> {
    // De forma semelhante, removemos uma curtida
    return this.http.get<any>(`${this.apiUrl}/conteudos/${videoId}`).pipe(
      switchMap((video) => {
        if (video.likesCount > 0) {
          video.likesCount--; 
          // Atualizamos o vídeo
          return this.http.put(`${this.apiUrl}/conteudos/${videoId}`, video);
        } else {
          return of(null);  
        }
      })
    );
  }

  getLikesForVideo(videoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/likes?videoId=${videoId}`);
  }
  
  // Favorito
  postFavorite(userId: string, videoId: string): Observable<any> {
    const payload = { userId, videoId };
    return this.http.post(`${this.apiUrl}/favorites`, payload);
  }
  
  getFavoritesForVideo(videoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/favorites?videoId=${videoId}`);
  }


getFavoritesForUser(userId: string): Observable<Conteudo[]> {
  return this.http.get<any[]>(`${this.apiUrl}/favorites?userId=${userId}`).pipe(
    switchMap(favorites => {
      const videoIds = favorites.map(fav => fav.videoId);  // Pega os IDs dos vídeos favoritos
      // Busca os vídeos correspondentes aos IDs encontrados
      return this.http.get<Conteudo[]>(`${this.apiUrl}/conteudos?id=${videoIds.join('&id=')}`);
    })
  );
}

removeFavorite(userId: string, videoId: string): Observable<any> {
  return this.http.get<any[]>(`${this.apiUrl}/favorites?userId=${userId}&videoId=${videoId}`).pipe(
    switchMap(favorites => {
      if (favorites.length > 0) {
        const favoriteId = favorites[0].id;
        return this.http.delete(`${this.apiUrl}/favorites/${favoriteId}`); 
      } else {
        return of(null); 
      }
    })
  );
}


}
