import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const HeroContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid magenta; */

  @media ${device.lg} {
    flex-direction: row;
  }
`;

export const InfoWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;

  &:first-of-type {
    margin-bottom: 3rem;
  }

  @media ${device.lg} {
    width: 45%;

    &:first-of-type {
      margin-bottom: 0rem;
    }

    &:last-of-type {
      width: 40%;
    }
  }
`;

export const Row = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media ${device.md} {
    margin-top: 5rem;
    max-width: 370px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  & > button {
    margin-bottom: 1rem;
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  font-weight: 200;
  color: var(--gray);
  opacity: 0.8;

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;

export const Clipper = styled.span`
  color: var(--violet);
  /* text-decoration: line-through 5px var(--gray); */
  position: relative;

  &::before {
    position: absolute;
    content: '';
    left: 5px;
    top: 50%;
    right: 0px;
    border-top: 5px solid;
    border-color: var(--gray);
    -webkit-transform: rotate(-8deg);
    -moz-transform: rotate(-8deg);
    -ms-transform: rotate(-8deg);
    -o-transform: rotate(-8deg);
    transform: rotate(-8deg);
  }
`;
