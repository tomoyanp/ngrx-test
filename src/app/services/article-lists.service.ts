import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleListsService {
  private url: string = "/api/article-lists";
  private articleLists = new Subject<object>(); 
  private articleLists$ = this.articleLists.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  get() {
    return this.http.get(this.url);
  }

  push(obj: object) {
    this.articleLists.next(obj);
  }

  load() {
    return this.articleLists$;
  }
}
