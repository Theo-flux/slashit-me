import styled from 'styled-components';
import { device} from '../../../utils';

export const HeroContainer = styled.section`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media ${device.md} {
    flex-direction: row;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;

  &:first-of-type {
    margin-bottom: 3rem;
  }

  @media ${device.md} {
    width: 45%;

    &:first-of-type {
      margin-bottom: 0rem;
    }
  }
`;
