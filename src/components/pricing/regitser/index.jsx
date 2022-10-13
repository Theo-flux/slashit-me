import { useState } from 'react';
import Link from 'next/link';
import { Section, Div } from '../../../shared';
import PersonalForm from './personal';
import BusinessForm from './business';
import SecurityForm from './security';
import OtpForm from './otp';

function Register() {
  const [active, setActive] = useState('otp');

  function handleActive(arg) {
    setActive(arg);
  }

  return (
    <Section>
      <Div>
        {active === 'personal' && <PersonalForm handleActive={handleActive} />}
        {active === 'business' && <BusinessForm handleActive={handleActive} />}
        {active === 'security' && <SecurityForm handleActive={handleActive} />}
        {active === 'otp' && <OtpForm handleActive={handleActive} />}
      </Div>
    </Section>
  );
}

export default Register;
