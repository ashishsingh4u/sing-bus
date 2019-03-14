import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
}

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}
