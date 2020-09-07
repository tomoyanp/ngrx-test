import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { load as loadHoge, polling as pollingHoge } from '../store/hoge.action';
import { ApiResponse } from './api-response';
import { Observable } from 'rxjs';

import { loadState, pollingState } from '../store/hoge.selector';

@Component({
  selector: 'app-ngrx-test',
  templateUrl: './ngrx-test.component.html',
  styleUrls: ['./ngrx-test.component.scss']
})
export class NgrxTestComponent implements OnInit {
  private loadState$: Observable<object>;
  private pollingState$: Observable<object>;
  private hogeStore;

  constructor(hogeStore: Store<{ hoge: object }>) {
    this.hogeStore = hogeStore;
    this.loadState$ = hogeStore.select(loadState);
    this.pollingState$ = hogeStore.select(pollingState);
  }

  ngOnInit(): void {
    try {
      this._loadApi();
      // this._hoge();
      // const tmp = null;
      // tmp[0] = 'hogehoge';
    } catch (e) {
      console.log('catch error outer');
      console.log(e);
    }

  }

  private _loadApi() {
    this.loadState$.subscribe((item: ApiResponse) => {
      if (item.processingStatus === 'loadDone') {
        const tmp = null;
        tmp[0] = 'hogehoge';
        // console.log('API Error');
        // console.log(item);
      }
    },
    error => {
      console.log('catch error inner');
      console.log(error);
    });

    this.pollingState$.subscribe(item => {
      console.log('polling');
      console.log(item);
    });
    this.hogeStore.dispatch(loadHoge());
    // this.hogeStore.dispatch(pollingHoge());
  }

  private _sleep(waitMsec) {
    const startMsec = new Date().getTime();
    while (new Date().getTime() - startMsec < waitMsec) {}
  }

  private _hoge() {
    const tmp = null;
    tmp[0] = 'hogehoge';
  }
}
