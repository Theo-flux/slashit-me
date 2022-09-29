import styled from 'styled-components';
import { device } from '../../../utils';

export const ShopperContainer = styled.div`
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
  color: var(--gray);
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
  /* border: 1px solid magenta; */

  @media ${device.md} {
    width: 100%;
    flex-direction: column;
  }
`;

export const Top = styled.div`
  position: relative;
  width: fit-content;
  margin: 0px auto;
  /* border: 1px solid magenta; */

  @media ${device.md} {
    margin: 0px auto;
    width: 80%;
    margin: 0px auto;
  }
`;

export const Line = styled.div`
  display: none;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='6%2c 14' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
  width: 100%;
  height: 0.5px;
  z-index: -1;
  transform: rotate(90deg);
  transform-origin: center;

  @media ${device.md} {
    display: block;
    transform: rotate(0deg);
  }
`;

export const NumberWrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  z-index: 1;
  /* border: 1px solid red; */

  @media ${device.md} {
    width: 100%;
    position: absolute;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Num = styled.div`
  background-color: var(--link);
  /* width: 50px;
  height: 50px; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.5rem;
  /* border: 1px solid red; */

  &:last-child {
    margin-bottom: 0px;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(
      180deg,
      rgba(108, 33, 255, 0.2) 0%,
      rgba(237, 33, 255, 0.108) 100%
    );
  }

  & > div > span {
    color: var(--violet);
    font-size: 1.25rem;
    font-weight: 600;
  }

  @media ${device.md} {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 100px;
    margin-bottom: 0px;

    & > div {
      width: 40px;
      height: 40px;
    }
  }
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-left: 1rem;

  @media ${device.md} {
    margin-top: 4rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const StepCard = styled.div`
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 0px;
  }

  & > h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  & > p {
    font-weight: 300;
  }

  @media ${device.md} {
    margin-bottom: 0px;
    width: 30%;
    text-align: center;

    & > h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  }
`;
