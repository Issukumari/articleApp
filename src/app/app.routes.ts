import { Routes } from '@angular/router';
import { ArticleDetailsComponent } from './component/article-details/article-details.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ArticlesComponent } from './component/articles/articles.component';
import { AuthorDirectoryComponent } from './component/author-directory/author-directory.component';
import { CommentComponentComponent } from './component/comment-component/comment-component.component'
import { CreatePostComponent } from './component/create-post/create-post.component'

export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: ArticlesComponent }, 
  { path: 'discover', component: AuthorDirectoryComponent },
  { path: 'comment/:id', component: CommentComponentComponent },
  {path: 'createpost', component: CreatePostComponent },
  { path: 'article/:id', component: ArticleDetailsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
