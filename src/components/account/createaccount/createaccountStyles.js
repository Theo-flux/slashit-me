import styled from 'styled-components';
import { Title } from '../../../shared';
import { device } from '../../../utils/device';

export const Column = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > div {
    margin-bottom: 2rem;
  }

  @media ${device.md} {
    flex-direction: row;
    & > div {
      width: 45%;
    }
  }
`;

export const RowLink = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1.5rem;
`;

export const ColItem = styled.div`
  width: 100%;
  max-width: 350px;
  margin-bottom: 1.5rem;
`;

export const StyledHistory = styled.p`
  color: var(--gray);
  margin-left: 0.4rem;
`;

export const StyledTitle = styled(Title)`
  font-size: 1.5rem;

  @media ${device.md} {
    font-size: 1.8rem;
  }

  @media ${device.lg} {
    font-size: 2rem;
  }
`;
