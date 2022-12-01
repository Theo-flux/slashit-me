import styled from 'styled-components';
import { Title, Text } from '../../../../shared/typography';

export const SuccessContainer = styled.div``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 3rem; */
`;

export const StyledTitle = styled(Title)`
  font-size: 1.25rem;
  margin: 3rem 0rem;
`;

export const Col = styled.div`
  border-top: 1px solid #d9d9d950;
  padding-top: 2rem;
  width: 90%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 2rem;
`;

export const TextInfo = styled(Text)`
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
`;
