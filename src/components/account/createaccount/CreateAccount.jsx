import { Fragment, useState } from 'react';
import { setSignUpInfo } from '../../../store/reducers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { validateThis } from '../../../helpers';
import { Section, Div, InputContainer, Button } from '../../../shared';
import {
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
    id: 'last_name',
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
    prefix: '+234',
    legend: 'Phone Number',
    placeholder: '081 2345 6789',
    id: 'phone_number',
    name: 'phonenumber',
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
    name: 'password',
  },
];

function CreateAccount() {
  let [signUpDetails, setSignUpDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    birthday: '',
    password: '',
  });
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.userAuth.signUpInfo);
  let [error, setError] = useState();

  function handleOnchange(event) {
    const { name, value } = event.target;

    setSignUpDetails({ ...signUpDetails, [name]: value });
  }

  function handleSubmit() {
    const res = validateThis(signUpDetails);
    console.log(res);
    setError(res);
  }

  console.log(error);

  return (
    <Section>
      <Div>
        <Fragment>
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
                      onChange={(e) => handleOnchange(e)}
                      error={error?.[`${name}`]}
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
                    onChange={(e) => handleOnchange(e)}
                    error={error?.[`${name}`]}
                  />
                );
              })}
              <Button
                onClick={() => handleSubmit()}
                width={`100%`}
                bg={`var(--violet)`}
              >
                Create account
              </Button>
            </ColItem>
          </Column>
        </Fragment>
      </Div>
    </Section>
  );
}

export default CreateAccount;
