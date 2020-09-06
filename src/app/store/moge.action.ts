import { Action, createAction } from '@ngrx/store';

export const load = createAction(
    '[Moge] Load Moge'
)

export const loadDone = createAction(
    '[Moge] Load Done Moge'
)

export const loadError = createAction(
    '[Moge] Load Error Moge'
)
