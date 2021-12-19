import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

//mui(icon以外)
import Skeleton from '@mui/material/Skeleton';

//icon
import { LocalMallIcon } from '../components/Icons';

// reducers
import {
  initialState as foodsInitialState,
  foodsActionTypes,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// constants
import { REQUEST_STATE } from '../constant/constants';
import { COLORS } from '../constant/style_constants';

//フードを表示する一つ一つのカード
import { FoodWrapper } from '../components/FoodWrapper';

//フードをクリックしたときに表示されるモーダル
import { FoodOrderDialog } from '../components/FoodOrderDialog';

// images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

//モーダルの閉開
const initialState = {
  isOpenOrderDialog: false,
  selectedFood: null,
  selectedFoodCount: 1,
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 32px;
`;

const BagIconWrapper = styled.div`
  padding-top: 24px;
`;

const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const submitOrder = () => {
  // 後ほど仮注文のAPIを実装します
  console.log('登録ボタンが押された！');
};

const Foods = () => {
  const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
  const [state, setState] = useState(initialState);
  let { restaurantsId } = useParams();
  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantsId).then((data) => {
      dispatch({
        type: foodsActionTypes.FETCH_SUCCESS,
        payload: { foods: data.foods },
      });
    });
  }, []);
  return (
    <Fragment>
      <HeaderWrapper>
        <Link to='/restaurants'>
          <MainLogoImage src={MainLogo} alt='main logo' />
        </Link>
        <BagIconWrapper>
          <Link to='/orders'>
            <ColoredBagIcon fontSize='large' />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {foodsState.fetchState === REQUEST_STATE.LOADING ? (
          <Fragment>
            {[...Array(12).keys()].map((i) => (
              <ItemWrapper key={i}>
                <Skeleton
                  key={i}
                  variant='rectangular'
                  width={400}
                  height={180}
                />
              </ItemWrapper>
            ))}
          </Fragment>
        ) : (
          foodsState.foodsList.map((food) => (
            <ItemWrapper key={food.id}>
              <FoodWrapper
                food={food}
                onClickFoodWrapper={(food) =>
                  setState({
                    ...state,
                    selectedFood: food,
                    isOpenOrderDialog: true,
                  })
                }
                imageUrl={FoodImage}
              />
            </ItemWrapper>
          ))
        )}
      </FoodsList>
      {state.isOpenOrderDialog && (
        <FoodOrderDialog
          isOpen={state.isOpenOrderDialog}
          food={state.selectedFood}
          countNumber={state.selectedFoodCount}
          onClickCountUp={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount + 1,
            })
          }
          onClickCountDown={() =>
            setState({
              ...state,
              selectedFoodCount: state.selectedFoodCount - 1,
            })
          }
          // 先ほど作った関数を渡します
          onClickOrder={() => submitOrder()}
          // モーダルを閉じる時はすべてのstateを初期化する
          onClose={() =>
            setState({
              ...state,
              isOpenOrderDialog: false,
              selectedFood: null,
              selectedFoodCount: 1,
            })
          }
        />
      )}
    </Fragment>
  );
};

export default Foods;
