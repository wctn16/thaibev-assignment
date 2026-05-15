import { Component, OnInit } from '@angular/core';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
   constructor(private _apiServ: ApiService,) { }
  
  initial: string = '';
  postData:any = {};

  commentsData: { username: string; text: string }[] = [];

  newComment: { username: string; text: string } = { username: 'Blend 285', text: '' };

  addComment(): void {
    console.log('Adding comment:', this.newComment);
    
    if (this.newComment.text.trim()) {
      // this.commentsData.push({ username: 'Blend 285', text: this.newComment.text.trim() });
      this.newComment.text = '';
    } else {
      console.log('Comment text is empty. Comment not added.');
      return;
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      const data = await lastValueFrom(this._apiServ.getContentData());
      this.postData = data[0];
      this.initial = this.postData.username.charAt(0).toUpperCase();
      console.log(data);
    } catch (err) {
      console.error('Error:', err);
    }
  }
}
