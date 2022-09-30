import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const BusinessContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Tag = styled.div`
  width: fit;
  border-radius: 50px;
  border: 1px solid black;
  padding: 0.5rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  background: linear-gradient(246.38deg, #6220cd 56.6%, #af1f98 67.84%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 2.5rem;

  @media ${device.md} {
    font-size: 1.25rem;
    padding: 0.8rem 1.5rem;
    margin-bottom: 5rem;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  width: 100%;
  max-width: 600px;

  @media ${device.md} {
    font-size: 3rem;
    max-width: 800px;
  }

  @media ${device.lg} {
    font-size: 3rem;
  }
`;

export const Text = styled.p`
  width: 100%;
  max-width: 600px;
  text-align: center;
  font-weight: 200;
  color: ${(props) => props.color || `var(--gray)`};
  opacity: 0.8;
  margin-bottom: 5rem;

  @media ${device.md} {
    font-size: 1.125rem;
    line-height: 2rem;
    margin-bottom: 8rem;
  }

  @media ${device.lg} {
    font-size: 1.35rem;
    line-height: 2rem;
  }
`;

export const Wrapper = styled.div`
  margin-bottom: 4rem;
  display: flex;
  max-width: 952px;
  width: 100%;
`;

export const Img = styled.img`
  transform: scale(0.8);
  overflow: hidden;
  border-radius: 0.375rem;
  margin: 0;
  ${transition}

  &:first-of-type {
    transform-origin: bottom right;
    transform: scale(0.8) rotate(-15deg);
  }

  &:last-of-type {
    transform-origin: bottom left;
    transform: scale(0.8) rotate(15deg);
  }

  &:hover {
    transform: scale(1) rotate(0deg);
  }
`;

export const LearnMoreDesktop = styled.div`
  display: none;
  margin-top: 3rem;

  @media ${device.md} {
    display: block;
  }
`;

export const LearnMoreMobile = styled.div`
  height: auto;
  display: block;
  margin-top: 3rem;
  padding: 0.5rem;
  width: 100%;

  @media ${device.md} {
    display: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.375rem;
  padding: 2rem;
  background-color: var(--gray);
  /* display: none; */

  & > p {
    font-size: 0.875rem;
    margin-bottom: 3rem;
  }
`;

export const Heading = styled.h3`
  color: white;
  font-size: 1.75rem;
  text-align: center;
  margin-bottom: 1rem;
`;
