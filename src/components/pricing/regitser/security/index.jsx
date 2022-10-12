import Link from 'next/link';
import { InputContainer, Checker, Button } from '../../../../shared';
import {
  RegisterContainer,
  Wrapper,
  Column,
  StyledTitle,
  A,
} from '../registerStyles';

const security_item = [
  {
    type: 'password',
    legend: 'Password',
    placeholder: 'Password',
    id: 'password',
  },
];

function SecurityForm({ handleActive }) {
  return (
    <RegisterContainer>
      <Wrapper>
        <StyledTitle>Create your password</StyledTitle>

        <Column>
          {security_item.map((reg, index) => {
            const { type, legend, placeholder, id } = reg;
            return (
              <InputContainer
                key={index}
                type={type}
                legend={legend}
                placeholder={placeholder}
                id={id}
              />
            );
          })}
          <Checker
            content={`you agree to Slashit terms of use and privacy policy.`}
          />
        </Column>
        <Button width={`100%`} onClick={() => handleActive('otp')}>
          Next
        </Button>

        <Column>
          <Link href={'/'}>
            <A>Already have an account?</A>
          </Link>
        </Column>
      </Wrapper>
    </RegisterContainer>
  );
}

export default SecurityForm;
