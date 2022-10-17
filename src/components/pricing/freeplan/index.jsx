import { useState } from 'react';
import { Section, Div } from '../../../shared';
import { TitleCentered } from '../pricingStyles';
import { PasswordForm, BusinessForm, PersonalForm, OtpForm } from '../../forms';

function FreeplanRegistration() {
  const [active, setActive] = useState('personal');

  function handleActive(arg) {
    setActive(arg);
  }

  return (
    <Section>
      <Div>
        <TitleCentered>Free Plan</TitleCentered>
        {active === 'personal' && <PersonalForm handleActive={handleActive} />}
        {active === 'business' && <BusinessForm handleActive={handleActive} />}
        {active === 'security' && <PasswordForm handleActive={handleActive} />}
        {active === 'otp' && <OtpForm handleActive={handleActive} />}
      </Div>
    </Section>
  );
}

export default FreeplanRegistration;
