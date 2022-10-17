import { useState } from 'react';
import { Section, Div } from '../../../shared';
import { TitleCentered } from '../pricingStyles';
import {
  PasswordForm,
  BusinessForm,
  PersonalForm,
  OtpForm,
  CardForm,
} from '../../forms';

function ThriveplanRegistration() {
  const [active, setActive] = useState('payment');

  function handleActive(arg) {
    setActive(arg);
  }

  return (
    <Section>
      <Div>
        <TitleCentered>Thrive plan</TitleCentered>
        {active === 'personal' && <PersonalForm handleActive={handleActive} />}
        {active === 'business' && <BusinessForm handleActive={handleActive} />}
        {active === 'security' && <PasswordForm handleActive={handleActive} />}
        {active === 'otp' && <OtpForm handleActive={handleActive} />}
        {active === 'payment' && <CardForm handleActive={handleActive} />}
      </Div>
    </Section>
  );
}

export default ThriveplanRegistration;
