import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Register } from '../../../api/userAPI';
import { InputContainer, Checker, Button } from '../../../shared';
import { FormContainer, Wrapper, Column, StyledTitle, A } from '../formStyles';

const security_item = [
  {
    type: 'password',
    legend: 'Password',
    placeholder: 'Password',
    id: 'password',
    name: 'password',
  },
];

function PasswordForm({ handleActive }) {
  let toastMsg = '';
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.userAuth.signUpInfo);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  async function createAccount() {
    let register = await Register({
      ...signUpInfo,
      role: 'business',
      country: 'NG',
      type: 'web',
    });
    if (register.success) {
      handleActive('otp');
    } else {
      toastMsg = register.message;
    }
    //birthDay: Date!
  }

  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Create your password</StyledTitle>

        <Column>
          {security_item.map((reg, index) => {
            const { type, legend, placeholder, id, name } = reg;
            return (
              <InputContainer
                key={index}
                type={type}
                legend={legend}
                placeholder={placeholder}
                id={id}
                onChange={(e) =>
                  dispatch(setSignUpInfo({ ...signUpInfo, [e.name]: e.event }))
                }
              />
            );
          })}
          <Checker
            content={`By continuing you agree to Slashit terms of use and privacy policy.`}
          />
        </Column>
        <Button width={`100%`} onClick={() => createAccount()}>
          Next
        </Button>

        <Column>
          <Link href={'/'}>
            <A>Already have an account?</A>
          </Link>
        </Column>
      </Wrapper>
    </FormContainer>
  );
}

export default PasswordForm;
