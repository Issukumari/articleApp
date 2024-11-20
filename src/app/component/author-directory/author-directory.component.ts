import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Author } from '../../model/author.model';
import { AuthorService } from '../../service/author.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-author-directory',
  standalone: true,
  imports: [RouterModule,NgFor],
  templateUrl: './author-directory.component.html',
  styleUrl: './author-directory.component.scss'
})
export class AuthorDirectoryComponent implements OnInit {
  authors: Author[] = [];
  filteredAuthors: Author[] = [];
  searchQuery: string = '';

  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.authors = this.authorService.getAuthors();
    this.filteredAuthors = [...this.authors]; 
  }

  onSearchChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase(); 
    this.filterAuthors();
  }

  filterAuthors(): void {
    if (this.searchQuery) {
      this.filteredAuthors = this.authors.filter(author =>
        author.author.toLowerCase().includes(this.searchQuery)
      );
    } else {
      this.filteredAuthors = [...this.authors];
    }
  }
}