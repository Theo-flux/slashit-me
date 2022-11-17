import { setSignUpInfo } from '../../../store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { Section, Div, InputContainer, Button } from '../../../shared';
import {
  CAcctContainer,
  RowLink,
  Row,
  Column,
  ColItem,
  StyledHistory,
  StyledTitle,
} from './createaccountStyles';

const acct_items = [
  {
    type: 'text',
    legend: 'First Name',
    placeholder: 'First name',
    id: 'first_name',
    name: 'firstname',
  },

  {
    type: 'text',
    legend: 'Last Name',
    placeholder: 'Last name',
    id: 'first_name',
    name: 'lastname',
  },

  {
    type: 'email',
    legend: 'Email address',
    placeholder: 'yourmail@gmail.com',
    id: 'email_address',
    name: 'email',
  },

  {
    type: 'phone',
    prefix: '234',
    legend: 'Phone Number',
    placeholder: '081 2345 6789',
    id: 'phone_number',
    name: 'mobile',
  },

  {
    type: 'date',
    legend: 'Your Birthday',
    placeholder: 'dd/mm/yyyy',
    id: 'your_birthday',
    name: 'birthday',
  },

  {
    type: 'password',
    legend: 'Password',
    placeholder: 'password',
    id: 'password',
    name: 'pass',
  },
];

function CreateAccount() {
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.userAuth.signUpInfo);

  return (
    <Section>
      <Div>
        <CAcctContainer>
          <Column>
            <RowLink onClick={() => history.back()}>
              <i class="ri-arrow-left-s-line" />
              <StyledHistory>Go back</StyledHistory>
            </RowLink>

            <StyledTitle>
              Let’s create an account for you. It’s completely free!
            </StyledTitle>

            <ColItem>
              <Row>
                {acct_items.slice(0, 2).map((reg, index) => {
                  const { type, legend, placeholder, id, name } = reg;
                  return (
                    <InputContainer
                      key={index}
                      type={type}
                      legend={legend}
                      placeholder={placeholder}
                      id={id}
                      name={name}
                      onChange={(e) =>
                        dispatch(
                          setSignUpInfo({ ...signUpInfo, [e.name]: e.event }),
                        )
                      }
                    />
                  );
                })}
              </Row>

              {acct_items.slice(2).map((reg, index) => {
                const { type, legend, placeholder, id, name } = reg;
                return (
                  <InputContainer
                    key={index}
                    type={type}
                    legend={legend}
                    prefix={reg?.prefix}
                    placeholder={placeholder}
                    id={id}
                    name={name}
                    onChange={(e) =>
                      dispatch(
                        setSignUpInfo({ ...signUpInfo, [e.name]: e.event }),
                      )
                    }
                  />
                );
              })}
              <Button width={`100%`} bg={`var(--violet)`}>
                Create account
              </Button>
            </ColItem>
          </Column>
        </CAcctContainer>
      </Div>
    </Section>
  );
}

export default CreateAccount;
