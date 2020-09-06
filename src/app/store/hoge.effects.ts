import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { of, interval } from 'rxjs';
import { map, startWith, mergeMap, concatMap, switchMap, catchError } from 'rxjs/operators';
import { load, loadDone, polling, pollingDone } from './hoge.action';

import { HogeService } from '../service/hoge.service';

@Injectable()
export class HogeEffects {
    constructor(
      private actions$: Actions,
      private hogeService: HogeService
    ) {}

    loadAll$ = createEffect(() =>
      this.actions$.pipe(
        ofType(load),
        switchMap(() =>
          this.hogeService.load().pipe(
            map(result => loadDone({ loadObject: result }))
          )
        )
      )
    );
    pollingAll$ = createEffect(() =>
      this.actions$.pipe(
        ofType(polling),
        switchMap(() => {
          return interval(1000).pipe(
            startWith(0),
            switchMap(() =>
              this.hogeService.load().pipe(
                map(result => pollingDone({ pollingObject: result }))
              )
            )
          );
        }
        )
      )
    );
  }
