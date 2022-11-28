import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputContainer, PhoneInputContainer, Button } from '../../../shared';
import { setComputerInfo, setSignUpInfo } from '../../../store/reducers/auth';
import {
  FormContainer,
  Wrapper,
  Row,
  Column,
  StyledText,
  StyledTitle,
  A,
} from '../formStyles';

const personal_item = [
  {
    type: 'text',
    legend: 'First Name',
    placeholder: 'First name',
    id: 'first_name',
    name: 'firstname',
  },

  {
    type: 'text',
    legend: 'First Name',
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
    legend: 'Phone Number',
    placeholder: '081 2345 6789',
    id: 'phone_number',
    name: 'mobile',
  },
];

function PersonalForm({ handleActive }) {
  const dispatch = useDispatch();
  const signUpInfo = useSelector((state) => state.userAuth.signUpInfo);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);

  let platform;
  let os;

  if (typeof window !== 'undefined') {
    platform = window.navigator.platform;
    os = window.navigator.appVersion;
    os = os.split(' ');
    os = `${os[2]} ${os[3]}`;
  }

  async function GetComputerIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    dispatch(setComputerInfo({ ...computerInfo, ip: data?.ip || '' }));
  }

  useEffect(() => {
    GetComputerIp();
  }, []);


  useEffect(() => {
    dispatch(setComputerInfo({ ...computerInfo, platform, os }));
  }, [platform, os]);

  return (
    <FormContainer>
      <Wrapper>
        <StyledTitle>Let’s get to know you</StyledTitle>
        <StyledText>
          Please provide some basic information about yourself
        </StyledText>
        <Row>
          {personal_item.slice(0, 2).map((reg, index) => {
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
                  dispatch(setSignUpInfo({ ...signUpInfo, [e.name]: e.event }))
                }
              />
            );
          })}
        </Row>

        <Column>
          {personal_item.slice(2).map((reg, index) => {
            const { type, legend, placeholder, id, name } = reg;
            return (
              <>
                {type !== 'phone' ? (
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
                ) : (
                  <PhoneInputContainer
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
                )}
              </>
            );
          })}
        </Column>
        <Button width={`100%`} onClick={() => handleActive('business')}>
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

export default PersonalForm;
