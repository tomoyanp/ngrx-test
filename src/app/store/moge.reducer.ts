import { load, loadDone, loadError } from './moge.action';
import { Action, createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

export interface State {
    processingStatus: string,
    apiResponse: {
        status: string,
        data: Array<object>
    }
}

export const initialState: State = {
    processingStatus: undefined,
    apiResponse: {
        status: "200",
        data: [
            {moge: "mogemoge"}
        ]
    }
}


export const mogeReducer = createReducer(
    initialState,
    on(load, state => {
        return { 
            ...state,
            processingStatus: "processing",
            apiResponse: {}
        };
    }),
    on(loadDone, state => {
        return {
            ...state,
            processingStatus: "loadDone",
            apiResponse: {
                status: "200",
                data: [
                    { moge: "moge"}
                ]
            }}
    }),
    on(loadError, state => {
        return { 
            ...state,
            processingStatus: "loadDone",
            apiResponse: {
                status: "400",
                errorData: [
                    { error: "moge Error"}
                ]
            }
        }
    })
);