import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

interface articleObject {};


@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  private url: string = "/api/articles";
  private articles = new BehaviorSubject<articleObject>({});
  private articles$ = this.articles.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  get(id: string) {
    return this.http.get(`${this.url}/${id}`)
  }

  push(obj: object) {
    this.articles.next(obj);
  }

  load() {
    return this.articles$;
  }
}
