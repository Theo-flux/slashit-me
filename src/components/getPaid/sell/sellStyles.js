import styled from 'styled-components';
import { device } from '../../../utils';

export const SellContainer = styled.section`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media ${device.md} {
    flex-direction: row-reverse;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  /* border: 1px solid magenta; */
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

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  font-weight: 200;
  color: ${(props) => props.color || `var(--gray)`};
  opacity: ${(props) => props.color || `0.8`};

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;

export const SmallText = styled(Text)`
  font-weight: 400;
  margin-bottom: 2rem;
`;

export const Row = styled.div`
  margin-top: 2rem;
`;

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Line = styled.div`
  width: 100px;
  height: 1px;
  background-color: var(--violet);
  border-radius: 0.375rem;

  &:first-of-type {
    margin-bottom: 0.8rem;
  }

  &:last-of-type {
    margin-top: 0.8rem;
    align-self: flex-end;
  }

  @media ${device.md} {
    width: 120px;
    height: 1.5px;
  }

  @media ${device.lg} {
    width: 150px;
    height: 2px;
  }
`;
