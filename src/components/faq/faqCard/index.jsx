import React from 'react';
import {
  FaqCardContainer,
  FaqQuestionBox,
  FaqQuestion,
  FaqAnswer,
  Icon,
} from './faqcardStyles';

function FaqCard({ faq, handleTarget, target }) {
  const { id, question, answer } = faq;
  return (
    <FaqCardContainer>
      <FaqQuestionBox id={id} target={target} onClick={() => handleTarget(id)}>
        <FaqQuestion>{question}</FaqQuestion>
        <Icon id={id} target={target} className="ri-arrow-down-s-fill"></Icon>
      </FaqQuestionBox>
      <FaqAnswer className={`${target === id ? 'reveal-ans' : 'hide-ans'}`}>
        {answer}
      </FaqAnswer>
    </FaqCardContainer>
  );
}

export default FaqCard;
