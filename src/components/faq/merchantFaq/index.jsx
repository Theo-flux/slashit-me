import { useState } from 'react';
import FaqCard from '../faqCard';
import { merchantFaqItems } from './merchantFaqItems';

function MerchantFaq() {
  const [target, setTarget] = useState('1');

  function handleTarget(ref) {
    if (target == ref) {
      return setTarget(null);
    }
    setTarget(ref);
  }
  return (
    <>
      {merchantFaqItems.map((faqItem, index) => {
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

export default MerchantFaq;
