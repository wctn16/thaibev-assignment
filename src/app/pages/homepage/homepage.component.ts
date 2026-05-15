import { Component, OnInit, signal } from '@angular/core';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  constructor(private _apiServ: ApiService) { }

  isLoading = signal(false);
  initial = signal('');
  postData = signal<any>({});
  commentsData = signal<{ Username: string; TextComment: string }[]>([]);
  newComment: { Username: string; TextComment: string; PostId: number } = { Username: 'Blend 285', TextComment: '', PostId: 0 };

  ngOnInit(): void {
    this.getPostContent();
  }

  getPostContent(): void {
    this.isLoading.set(true);
    this._apiServ.getContentData().subscribe({
      next: (data) => {
        const post = data[0];
        this.postData.set(post);
        this.initial.set(post?.Username?.charAt(0)?.toUpperCase() ?? '');
        this.commentsData.set(post?.Comments ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading.set(false);
      }
    });
  }

  addComment(): void {
    if (!this.newComment.TextComment.trim()) return;
    this.newComment.PostId = this.postData().Id;
    this.isLoading.set(true);
    this._apiServ.addDataComment(this.newComment).subscribe({
      next: (response: any) => {
        if (response) {
          this.commentsData.set([...this.commentsData(), response]);
          this.newComment.TextComment = '';
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error adding comment:', err);
        this.isLoading.set(false);
      }
    });
  }
}
