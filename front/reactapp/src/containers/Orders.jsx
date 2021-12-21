import React, { Fragment, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { postOrder } from '../apis/orders';

import { fetchLineFoods } from '../apis/line_foods';

// components
import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons/OrderButton';
import CircularProgress from '@mui/material/CircularProgress';

// reducers
import {
  initialState,
  lineFoodsActionTypes,
  lineFoodsReducer,
} from '../reducers/lineFoods';

// images
import MainLogo from '../images/logo.png';

// constants
import { REQUEST_STATE } from '../constant/constants';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);
  const postLineFoods = () => {
    dispatch({ type: lineFoodsActionTypes.POSTING });
    //ここで仮注文を本注文に保存する処理。
    //本注文を完了するボタンを押すと実行。
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
    //仮注文を取得してstateを更新
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

  const orderButtonLabel = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return '注文中...';
      case REQUEST_STATE.OK:
        return '注文が完了しました！';
      default:
        return '注文を確定する';
    }
  };

  return (
    <Fragment>
      <HeaderWrapper>
        <Link to='/restaurants'>
          <MainLogoImage src={MainLogo} alt='main logo' />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
        <div>
          <OrderItemWrapper>
            {
              // APIローディング中はくるくる回るローディングコンポーネントを表示
              state.fetchState === REQUEST_STATE.LOADING ? (
                <CircularProgress />
              ) : (
                state.lineFoodsSummary && (
                  <OrderDetailItem
                    restaurantFee={state.lineFoodsSummary.restaurant.fee}
                    restaurantName={state.lineFoodsSummary.restaurant.name}
                    restaurantId={state.lineFoodsSummary.restaurant.id}
                    timeRequired={
                      state.lineFoodsSummary.restaurant.time_required
                    }
                    foodCount={state.lineFoodsSummary.count}
                    price={state.lineFoodsSummary.amount}
                  />
                )
              )
            }
          </OrderItemWrapper>
          <div>
            {state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary && (
              <OrderButton
                onClick={() => postLineFoods()}
                disabled={
                  //最初はpostStateがinitialだが一度クリックすると'LOADING'その後に'ok'
                  //になるため押せなくする。
                  state.postState === REQUEST_STATE.LOADING ||
                  state.postState === REQUEST_STATE.OK
                }
              >
                {orderButtonLabel()}
              </OrderButton>
            )}
            {state.fetchState === REQUEST_STATE.OK &&
              !state.lineFoodsSummary && <p>注文予定の商品はありません。</p>}
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  );
};

export default Orders;
