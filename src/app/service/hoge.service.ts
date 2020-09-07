import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HogeService {
  constructor(private http: HttpClient) {}

  load() {
    const url = '/api/hoge';
    return this.http.get(url).pipe(
      retry(3),
      catchError(err => {
        console.log(err);
        throw err;
      }));
  }
}
