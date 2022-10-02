import styled from 'styled-components';
import { device, transition } from '../../../utils';

export const FaqCardContainer = styled.div``;

export const FaqQuestionBox = styled.div``;

export const FaqQuestion = styled.div``;

export const FaqAnswer = styled.div``;

export const ArrowSVG = () => {
  return (
    <svg
      //   className="w-4 h-4 text-pink-600"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      ></path>
    </svg>
  );
};
