import { Action, createAction, props } from '@ngrx/store';

export const load = createAction(
    '[Hoge] Load Hoge'
);

export const loadDone = createAction(
    '[Hoge] Load Done Hoge',
    props<{ loadObject: object }>()
);

export const polling = createAction(
    '[Hoge] Polling Hoge'
);

export const pollingDone = createAction(
    '[Hoge] Polling Done Hoge',
    props<{ pollingObject: object }>()
);
