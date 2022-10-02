import { useState } from 'react';
import FaqCard from '../faqCard';
import { cardFaqItems } from './cardFaqItems';

function CardFaq() {
  const [target, setTarget] = useState('1');

  function handleTarget(ref) {
    if (target == ref) {
      return setTarget(null);
    }
    setTarget(ref);
  }
  return (
    <>
      {cardFaqItems.map((faqItem, index) => {
        return (
          <FaqCard
            key={index}
            faq={faqItem}
            target={target}
            handleTarget={handleTarget}
          />
        );
      })}
    </>
  );
}

export default CardFaq;
