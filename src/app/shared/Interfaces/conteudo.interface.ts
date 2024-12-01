import { SafeResourceUrl } from "@angular/platform-browser";


export interface Conteudo {
  userId: string;
  videoId: string;
  id: string;
  title: string;
  description: string;
  url: string; 
  thumbnail: string;
  type: string;
  views: number;
  comp: boolean;
  uploadedAt: Date;
  videourl: string;
  likesCount: number;
  urlSafe: SafeResourceUrl;
}
