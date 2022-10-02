import React from 'react';
import {
  FaqCardContainer,
  FaqQuestionBox,
  FaqQuestion,
  FaqAnswer,
  ArrowSVG,
} from './faqcardStyles';

function FaqCard({ faq, handleTarget, target }) {
  return (
    <FaqCardContainer>
      <FaqQuestionBox>
        <FaqQuestion></FaqQuestion>
        <ArrowSVG />
      </FaqQuestionBox>
      <FaqAnswer></FaqAnswer>
    </FaqCardContainer>
  );
}

export default FaqCard;
