import { useState } from 'react';
import Link from 'next/link';
import {
  Section,
  Div,
  InputContainer,
  PhoneInputContainer,
  SelectContainer,
  Checker,
} from '../../../shared';
import { Button } from '../pricecard/priceCardStyles';
import {
  RegisterContainer,
  Wrapper,
  Row,
  Column,
  StyledText,
  StyledTitle,
  A,
} from './registerStyles';

const personal_item = [
  {
    type: 'text',
    legend: 'First Name',
    placeholder: 'First name',
    id: 'first_name',
  },

  {
    type: 'text',
    legend: 'First Name',
    placeholder: 'Last name',
    id: 'first_name',
  },

  {
    type: 'email',
    legend: 'Email address',
    placeholder: 'yourmail@gmail.com',
    id: 'email_address',
  },

  {
    type: 'phone',
    legend: 'Phone Number',
    placeholder: '081 2345 6789',
    id: 'phone_number',
  },
];

const business_item = [
  {
    type: 'text',
    legend: 'Buisness Name',
    placeholder: 'business name',
    id: 'business_name',
  },

  {
    type: 'select',
    legend: 'Category',
    placeholder: 'category',
    id: 'business_type',
    options: ['Fashion', 'Electronics'],
  },
];

const security_item = [
  {
    type: 'password',
    legend: 'Password',
    placeholder: 'Password',
    id: 'password',
  },
];

function Register() {
  const [active, setActive] = useState('personal');

  function handleActive(arg) {
    setActive(arg);
  }

  return (
    <Section>
      <Div>
        {active === 'personal' && (
          <RegisterContainer>
            <Wrapper>
              <StyledTitle>Let’s get to know you</StyledTitle>
              <StyledText>
                Provide some basic information about yourself
              </StyledText>
              <Row>
                {personal_item.slice(0, 2).map((reg, index) => {
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
              </Row>

              <Column>
                {personal_item.slice(2).map((reg, index) => {
                  const { type, legend, placeholder, id } = reg;
                  return (
                    <>
                      {type !== 'phone' ? (
                        <InputContainer
                          key={index}
                          type={type}
                          legend={legend}
                          placeholder={placeholder}
                          id={id}
                        />
                      ) : (
                        <PhoneInputContainer
                          key={index}
                          type={type}
                          legend={legend}
                          placeholder={placeholder}
                          id={id}
                        />
                      )}
                    </>
                  );
                })}
              </Column>
              <Button onClick={() => handleActive('business')}>Next</Button>

              <Column>
                <Link href={'/'}>
                  <A>Already have an account?</A>
                </Link>
              </Column>
            </Wrapper>
          </RegisterContainer>
        )}

        {active === 'business' && (
          <RegisterContainer>
            <Wrapper>
              <StyledTitle>Tell us about your business</StyledTitle>

              <Column>
                {business_item.map((reg, index) => {
                  const { type, legend, placeholder, id, options } = reg;
                  return (
                    <>
                      {type !== 'select' ? (
                        <InputContainer
                          key={index}
                          type={type}
                          legend={legend}
                          placeholder={placeholder}
                          id={id}
                        />
                      ) : (
                        <SelectContainer
                          key={index}
                          legend={legend}
                          placeholder={placeholder}
                          id={id}
                          options={options}
                        />
                      )}
                    </>
                  );
                })}
              </Column>
              <Button onClick={() => handleActive('password')}>Next</Button>

              <Column>
                <Link href={'/'}>
                  <A>Already have an account?</A>
                </Link>
              </Column>
            </Wrapper>
          </RegisterContainer>
        )}

        {active === 'password' && (
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
                <Checker />
              </Column>
              <Button>Next</Button>

              <Column>
                <Link href={'/'}>
                  <A>Already have an account?</A>
                </Link>
              </Column>
            </Wrapper>
          </RegisterContainer>
        )}
      </Div>
    </Section>
  );
}

export default Register;
