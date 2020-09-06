import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HogeService {
  constructor(private http: HttpClient) {}

  load() {
    const url = '/api/hoge';
    return this.http.get(url);
  }
}
