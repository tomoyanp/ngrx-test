import { load, loadDone, polling, pollingDone } from './hoge.action';
import { Action, createReducer, on } from '@ngrx/store';

export interface Response {
    processingStatus: string;
    apiResponse: object;
}

export interface State {
    load: {
        processingStatus: string;
        apiResponse: object;
    };
    post: {
        processingStatus: string;
        apiResponse: object;
    };
    put: {
        processingStatus: string;
        apiResponse: object;
    };
    delete: {
        processingStatus: string;
        apiResponse: object;
    };
    polling: {
        processingStatus: string;
        apiResponse: object;
    };
}

export const initialState: State = {
    load: {
        processingStatus: '',
        apiResponse: {},
    },
    post: {
        processingStatus: '',
        apiResponse: {},
    },
    put: {
        processingStatus: '',
        apiResponse: {},
    },
    delete: {
        processingStatus: '',
        apiResponse: {},
    },
    polling: {
        processingStatus: '',
        apiResponse: {},
    },
};


export const hogeReducer = createReducer(
    initialState,
    on(load, state => {
        return {
            ...state,
            load: {
                processingStatus: undefined,
                apiResponse: {}
            }
        };
    }),
    on(loadDone, (state , { loadObject }) => {
        return {
            ...state,
            load: {
                processingStatus: 'loadDone',
                apiResponse: loadObject
            },
            // polling: state.polling
        };
    }),
    on(polling, state => {
        return {
            ...state,
            polling: {
                processingStatus: undefined,
                apiResponse: {}
            }
        };
    }),
    on(pollingDone, (state , { pollingObject }) => {
        return {
            ...state,
            polling: {
                processingStatus: 'pollingDone',
                apiResponse: pollingObject
            },
            // load: state.load
        };
    }),
);
