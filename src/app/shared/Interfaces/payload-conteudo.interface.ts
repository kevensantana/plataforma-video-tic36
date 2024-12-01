import { Conteudo } from "./conteudo.interface";

export type ConteudoPayload = Omit<Conteudo, 'id'>;