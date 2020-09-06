import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { load as loadHoge, polling as pollingHoge } from '../store/hoge.action';
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
    this.loadState$.subscribe(item => {
      console.log('load');
      console.log(item);
      if (item.processingStatus === 'loadDone') {
        this.hogeStore.dispatch(loadHoge());
      }
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
}
