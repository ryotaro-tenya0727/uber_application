import React, { Fragment, useEffect, useReducer } from 'react';
import { postOrder } from '../apis/orders';

import { fetchLineFoods } from '../apis/line_foods';

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer,
} from '../reducers/lineFoods';

const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);
  const postLineFoods = () => {
    dispatch({ type: lineFoodsActionTypes.POSTING });
    //ここで仮注文を本注文に保存する処理。
    postOrder({
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      //ここでは注文の登録状況をサクセスにして、画面をリロード
      dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
      window.location.reload();
    });
  };
  useEffect(() => {
    dispatch({ type: lineFoodsActionTypes.FETCHING });
    //仮注文を取得
    fetchLineFoods()
      .then((data) =>
        dispatch({
          type: lineFoodsActionTypes.FETCH_SUCCESS,
          payload: {
            lineFoodsSummary: data,
          },
        })
      )
      .catch((e) => console.error(e));
  }, []);
  // --- ここまで追加 ---

  return <Fragment>注文画面</Fragment>;
};

export default Orders;
