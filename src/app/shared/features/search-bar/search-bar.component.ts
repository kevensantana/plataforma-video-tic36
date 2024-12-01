import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conteudo } from '../../Interfaces/conteudo.interface';
import { ConteudosService } from '../../services/conteudos.service';
import { CardComponent } from "../card/card.component";


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  contents: Conteudo[] = []; 
  filteredContent: Conteudo[] = []; 
  searchQuery: string = ''; 
  selectedType: string = ''; 
  types: string[] = []; 

  constructor(private conteudosService: ConteudosService) {}

  ngOnInit(): void {
    this.conteudosService.getAll().subscribe((data) => {
      this.contents = data;
      this.filteredContent = [...this.contents]; 

      this.types = Array.from(new Set(this.contents.map((content) => content.type)));
    });
  }

  filterContent(): void {
    this.filteredContent = this.contents.filter((content) => {
      const matchesQuery =
        !this.searchQuery || content.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesType = !this.selectedType || content.type === this.selectedType;
      return matchesQuery && matchesType;
    });
  }
}
