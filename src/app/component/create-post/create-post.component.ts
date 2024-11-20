import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import {ArticleList, ArticleListData } from '../../model/article.model';
import { ArticlesComponent } from '../articles/articles.component';
import { Router } from '@angular/router';
import { ArticleService } from '../../service/article.service';
import { AuthorService } from '../../service/author.service';
import { postArticle } from '../../store/article.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, QuillModule, NgFor,NgIf, ArticlesComponent],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit{
  authorName: string ='';
  constructor(private readonly router: Router,
   private articleService:ArticleService,
   private  authorService:AuthorService,
   private store: Store,
  ) {}
  ngOnInit(): void {
    const displayName = localStorage.getItem('displayName');
    if (displayName) {
      this.authorName =displayName
    }
     }

  postContent: string = '';
  postTitle: string = '';
  publishDate: Date | null = null;
  selectedCategory: string = '';
  parsedArticle: ArticleList = {
    title: '',
    category: '',
    content: { image: '', description: '' },
    scheduledDate:new Date(),
    status: ''
  };

  categories: string[] = ['Technology', 'Health', 'Finance', 'Education'];

  editorConfig = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      [{ 'font': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  saveAsDraft() {
    const draftData = {
      title: this.postTitle,
      category: this.selectedCategory,
      content: this.postContent,
      scheduledDate: this.publishDate,
      status: 'draft'
    };
  }

  publishNow() {
    const rawPostData = {
      id: 9,
      title: this.postTitle,
      category: this.selectedCategory,
      content: this.postContent, 
      scheduledDate: this.publishDate,
      status: 'published',
      author: this.authorName || 'Author R', 
      views: 200, 
      isEditorPick: false,
    };
  
    if (rawPostData) {
      const parsedArticle :any= this.parseArticleData(rawPostData);
        this.store.dispatch(postArticle({ article: parsedArticle }));
        this.router.navigate(['/home']);
    }
  }
  parseArticleData(rawData: any): ArticleList {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawData.content, 'text/html');
  
    const imgElement = doc.querySelector('img');
    const imageSrc = imgElement ? imgElement.getAttribute('src') || '' : '';
    const descriptionText = doc.body.textContent || '';
  
    const contentData: ArticleListData = {
      image: imageSrc,
      description: descriptionText.trim(),
    };
  
    const article: ArticleList = {
      id: rawData.id,
      title: rawData.title,
      category: rawData.category,
      content: contentData,
      scheduledDate: rawData.scheduledDate,
      status: rawData.status,
      author: this.authorName || 'Author R', 
      views: rawData.views, 
      isEditorPick: rawData.isEditorPick,
    };
  
    return article;
  }
}
