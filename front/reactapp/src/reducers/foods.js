//リクエスト状態の定数をインポート
import { REQUEST_STATE } from '../constant/constants';

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: [],
};

export const foodsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTypes.FETCH_SUCCESS:
      //この時foofinitialstateは
      //{fetchState: 'OK', foodsList: [フードのオブジェクトが入っている。] }
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods,
      };
    default:
      throw new Error();
  }
};
