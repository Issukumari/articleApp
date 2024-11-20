import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as ArticleActions from '../../store/article.actions';
import * as fromCommentSelectors from '../../store/article.selectors'; 

@Component({
  selector: 'app-comment-component',
  standalone: true,
  imports: [FormsModule, DatePipe, NgFor, NgIf, CommonModule],
  templateUrl: './comment-component.component.html',
  styleUrls: ['./comment-component.component.scss'],
})
export class CommentComponentComponent implements OnInit {
  @Input() articleId: string | undefined;
  comments$!: Observable<any[]>;
  error$: Observable<string | null>;
  newCommentContent: string = '';
  sortOption: 'newest' | 'oldest' = 'newest'; 

  constructor(private store: Store) {
    this.comments$ = this.store.select(fromCommentSelectors.selectComments, { sortOption: this.sortOption });

    this.error$ = this.store.select(fromCommentSelectors.selectCommentsError);
  }

  ngOnInit() {
      this.store.dispatch(ArticleActions.loadComments({
        articleId: this.articleId!, 
        sortOption: this.sortOption
      }));

    this.comments$.subscribe(comments => {
      console.log('Comments received:', comments);
    });
  
    this.error$.subscribe(error => {
      if (error) {
        console.error('Error loading comments:', error);
      }
    });
  }

  sortComments(sortOption: 'newest' | 'oldest') {
    console.log(`Sorting comments by: ${sortOption}`);
    this.sortOption = sortOption;
      this.store.dispatch(ArticleActions.loadComments({
        articleId: this.articleId!,
        sortOption: sortOption
      }));
  }

  addComment() {
    const newComment: any = {
      id: Date.now().toString(),
      articleId: this.articleId,
      author: 'User',
      content: this.newCommentContent,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };
  
    this.store.dispatch(ArticleActions.addComment({ comment: newComment }));
  
    this.newCommentContent = '';
  }
  
  addReply(parentComment: any, replyInput: HTMLInputElement, parentReply: any = null) {
    const reply: any = {
      id: Date.now().toString(),
      author: 'User',
      content: replyInput.value.trim(),
      timestamp: new Date(),
      likes: 0,
    };

    let updatedComment: any;

    if (!parentReply) {
      updatedComment = {
        ...parentComment,
        replies: [...(parentComment.replies || []), reply],
      };
    } else {
      updatedComment = {
        ...parentComment,
        replies: [
          ...(parentComment.replies || []).filter((r: any) => r.id !== parentReply.id),
          { ...parentReply },
          reply, 
        ],
      };
    }

    this.store.dispatch(ArticleActions.updateComment({ comment: updatedComment }));
    replyInput.value = '';
  }
  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.sortOption = selectElement.value as 'newest' | 'oldest';

    this.store.dispatch(ArticleActions.loadComments({
      articleId: this.articleId!,
      sortOption: this.sortOption
    }));

    this.comments$ = this.store.select(fromCommentSelectors.selectComments, { sortOption: this.sortOption });
  }
}
