//フードを表示する一つ一つのカード。Food.jsxから呼ばれる。
import React from 'react';
import styled from 'styled-components';

// components
import { SubText } from './StyledText';

// constants
import { COLORS } from '../constant/style_constants';

const Wrapper = styled.div`
  display: flex;
  width: 400px;
  height: 180px;
  border-width: 3px;
  border-style: solid;
  border-color: ${COLORS.BORDER};
  border-image: initial;
  cursor: pointer;
`;

const FoodDetail = styled.div`
  padding: 24px 16px;
  width: 250px;
`;

const DescriptionWrapper = styled.div`
  height: 75px;
`;

const PriceWrapper = styled.div`
  margin-top: 16px;
`;

const FoodImageNode = styled.img`
  width: 200px;
`;

export const FoodWrapper = ({ food, onClickFoodWrapper, imageUrl }) => (
  <Wrapper onClick={() => onClickFoodWrapper(food)}>
    <FoodDetail>
      {food.name}
      <DescriptionWrapper>
        <SubText>{food.description}</SubText>
      </DescriptionWrapper>
      <PriceWrapper>¥{food.price}</PriceWrapper>
    </FoodDetail>
    <FoodImageNode src={imageUrl} />
  </Wrapper>
);
