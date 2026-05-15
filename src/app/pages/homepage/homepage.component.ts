import { Component, OnInit } from '@angular/core';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, FormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  
  initial: string = '';
  postData:any = {
    username: 'Cat',
    date : new Date(),
    image: 'https://images.unsplash.com/photo-1472437774355-71ab6752b434?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }

  commentsData: { username: string; text: string }[] = [];

  newComment: { username: string; text: string } = { username: 'Blend 285', text: '' };

  addComment(): void {
    console.log('Adding comment:', this.newComment);
    
    if (this.newComment.text.trim()) {
      // this.commentsData.push({ username: 'Blend 285', text: this.newComment.text.trim() });
      this.newComment.text = '';
    }
  }

  ngOnInit(): void {
    this.initial = this.postData.username.charAt(0).toUpperCase();
  }
}
