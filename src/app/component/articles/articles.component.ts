import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Article, ArticleList } from '../../model/article.model';
import { ArticleState } from '../../store/article.reducer';
import * as ArticleActions from '../../store/article.actions';
import { Router, RouterModule } from '@angular/router';
import { DatePipe, NgFor, NgIf,CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { selectAllArticles } from '../../store/article.selectors';
@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [RouterModule,NgFor,DatePipe,NgIf,CarouselComponent,CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
    @Input() articleListData!: ArticleList;
  articles$!: Observable<ReadonlyArray<Article>> ;
  // articles: Article[] = [];
  filteredArticles: any[] = [];
  paginatedArticles: Article[] = [];
  currentPage = 1;
  articlesPerPage = 3;
  sortOption = 'latest';
  searchQuery = ''; 
  constructor(private readonly store: Store<{ articles: ArticleState }>,private readonly router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(ArticleActions.loadArticles());
    this.articles$ = this.store.select(selectAllArticles);
    this.articles$.subscribe(articles => {
      this.filteredArticles = [...articles]; 
    });
    this.sortArticles();
    this.updatePaginatedArticles();
  }
  updatePaginatedArticles() {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
  }
  getTotalPages() {
    return Math.ceil(this.filteredArticles.length / this.articlesPerPage);
  }
  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.updatePaginatedArticles();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedArticles();
    }
  }
  
  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value;
    this.sortArticles();
  }
  sortArticles() {
    switch (this.sortOption) {
      case 'latest':
        this.filteredArticles.sort((a, b) => +b.scheduledDate - +a.scheduledDate);
        break;
      case 'popular':
        this.filteredArticles.sort((a, b) => b.views - a.views);
        break;
      case 'editorPick':
        this.filteredArticles.sort((a, b) => (a.isEditorPick === b.isEditorPick ? 0 : a.isEditorPick ? -1 : 1));
        break;
    }
    this.updatePaginatedArticles();
  }


  onSearchChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value.toLowerCase();
    this.filterArticles();
  }
  
  filterArticles() {
    this.articles$.subscribe(articles => {
      if (this.searchQuery) {
        this.filteredArticles = articles.filter(article => {
          return (
            article.title.toLowerCase().includes(this.searchQuery) || 
            article.author.toLowerCase().includes(this.searchQuery)
          );
        });
      } else {
        this.filteredArticles = [...articles];
      }
  
      this.sortArticles();
      this.currentPage = 1;
      this.updatePaginatedArticles();
    });
  }
  
  
  exploreArticle(){
    this.router.navigate(['/discover']); 
  }
  
}

