// import '@ngrx/core/add/operator/select';
import { select } from '@ngrx/core';
import { Observable } from 'rxjs/Observable';

// Have absolutely no idea why I have to do this.
// Allow Observable to take in a property 'select'.
declare module 'rxjs/Observable' {
  interface SelectSignature<T> {
    <R>(...paths: string[]): Observable<R>;
    <R>(mapFn: (state: T) => R): Observable<R>;
  }
  interface Observable<T> {
    select: SelectSignature<T>;
  }
}
Observable.prototype.select = select;
// End have absolutely no idea why I have to do this.

import { ActionReducer } from '@ngrx/store';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

export interface State {
};

const reducers = {
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

// @TODO: Move to a config file in shared/constants.
let environment = 'dev';

export function reducer(state: any, action: any) {

  console.log(action.type, ' payload:', action.payload);

  if (environment === 'production') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
