import styled, { keyframes } from 'styled-components';

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
`;

const ldsring = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

export const LoadRing = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  /* border: 1px solid magenta; */
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    margin: 8px;
    border: 2px solid #fcf;
    border-radius: 50%;
    animation: ${ldsring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: var(--violet) transparent transparent transparent;
  }
  & div:nth-child(1) {
    animation-delay: -0.45s;
  }
  & div:nth-child(2) {
    animation-delay: -0.3s;
  }
  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
