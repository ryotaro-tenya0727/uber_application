//サブテキスト(文字が少し薄く、小さい)
import styled from 'styled-components';
import { COLORS, FONT_SIZE } from '../constant/style_constants';

export const SubText = styled.p`
  color: ${COLORS.SUB_TEXT};
  font-size: ${FONT_SIZE.BODY2};
`;
