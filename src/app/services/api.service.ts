import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

export interface ContentResponse {
  Username: string;
  ImageUrl: string;
  CreatedAt: string;
  Comments: { Username: string; TextComment: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:5043/api/posts';

  private http = inject(HttpClient);

  getContentData() {
      return this.http.get<ContentResponse[]>(`${this.apiUrl}/GetContentData`) 
  }

  addDataComment(data: { Username: string; TextComment: string, PostId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddComment`, data);
  }
}
