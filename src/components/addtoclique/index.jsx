import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Image from 'next/image';
import {
  CliqueAccept,
  Login,
  SaveLoginCredentials,
  ShopperExist,
  VerifyCAT,
} from '../../api/userAPI';
import {
  Section,
  Div,
  Checker,
  InputContainer,
  Button,
  Toast,
  LoaderContainer,
  Loader,
} from '../../shared';
import { validateThis } from '../../helpers';
import {
  CliqueDiv,
  SmallText,
  Wrapper,
  StyledTitle,
  StyledSubTitle,
  CliqueMembers,
  Member,
  Name,
  Details,
} from './addToCliqueStyles';
import statusCode from '../../api/statusCode';
import { useDispatch, useSelector } from 'react-redux';
import { setComputerInfo } from '../../store/reducers/auth';

// const members = [
//   {
//     id: '1',
//     firstname: 'Daniel',
//     lastname: 'T.',
//     avatar: '/images/daniel.svg',
//   },

//   {
//     id: '2',
//     firstname: 'Kayla',
//     lastname: 'B.',
//     avatar: '/images/kayla.svg',
//   },

//   {
//     id: '3',
//     firstname: 'Sarah',
//     lastname: 'V.',
//     avatar: '/images/sarah.svg',
//   },
// ];

const details = [
  {
    id: 'email',
    name: 'email',
    legend: 'Enter your Email',
    type: 'email',
  },

  {
    id: 'password',
    name: 'password',
    legend: 'Enter your Password',
    type: 'password',
  },
];

function JoinClique() {
  let toastMsg = '';

  const dispatch = useDispatch();
  const router = useRouter();
  const [memberForm, setMemberForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [inviter, setInviter] = useState('');
  const [members, setMembers] = useState();
  const [showToast, setShowToast] = useState(false);
  const [isMailValidated, setIsMailValidated] = useState(false);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);

  if (typeof window !== 'undefined') {
    let platform = window.navigator.platform;
    let os = window.navigator.appVersion;
    os = os.split(' ');
    os = `${os[2]} ${os[3]}`;
    dispatch(setComputerInfo({ ...computerInfo, platform, os }));
  }

  function handleMemberFormOnchange(event) {
    const { name, value } = event.target;
    setMemberForm({ ...memberForm, [name]: value });
  }

  function handleEmailSubmit() {
    let errors = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!memberForm.email) {
      errors.email = "Email can't be empty!";
    } else if (!memberForm.email.match(mailformat)) {
      errors.email = 'Inavlid email!';
    } else {
      errors = {};
    }

    if (errors.email) {
      setError(errors);
    } else {
      validateShopper();
    }
  }

  function handlePasswordSubmit() {
    let errors = {};

    if (!memberForm.password) {
      errors.password = 'Enter password!';
    } else {
      errors = {};
    }

    if (errors.password) {
      setError(errors);
    } else {
      joinClique();
    }
  }

  // async functions
  async function validateShopper() {
    setLoading(true);
    let sendReq = await ShopperExist(memberForm.email);
    if (sendReq.success) {
      if (sendReq.code == statusCode.COMPLETE_REGISTRATION) {
        toastMsg =
          'Please complete your profile on the Slashit app, then come back to add a friend to your Clique.';
      } else if (sendReq.code == statusCode.OK) {
        setIsMailValidated(true);
      }
    } else {
      //TODO - Link to "Add to Clique 03"
    }
    setLoading(false);
    return;
  }

  async function joinClique() {
    setLoading(true);
    let userInfo = {
      email: memberForm.email,
      password: memberForm.password,
      platform: 'web',
      deviceId: `${computerInfo.platform} ${computerInfo.os}`,
      ipAddress: computerInfo.ip,
    };
    let getInfo = localStorage.getItem('userInfo');

    //If User Information does not already exist in localStorage, then login
    if (!getInfo) {
      let sendReq = await Login(userInfo);
      if (sendReq.success) {
        SaveLoginCredentials(
          JSON.stringify({ ...userInfo, token: sendReq.token }),
        );
        //Join Clique
        let join = await CliqueAccept(router.query?.token);
        if (join.success) {
          if (join.code == statusCode.OK) {
            //TODO - Link to "Add to Clique "Success""
          } else if (join.code == statusCode.ADD_YOUR_CARD) {
            //TODO - Link to "Add to Clique "CARD1""
          }
        } else {
          toastMsg = join.message;
        }
      } else {
        toastMsg = sendReq.message;
      }
    } else {
      //Join Clique
      let join = await CliqueAccept(router.query?.token);
      if (join.success) {
        if (join.code == statusCode.OK) {
          //TODO - Link to "Add to Clique "Success""
        } else if (join.code == statusCode.ADD_YOUR_CARD) {
          //TODO - Link to "Add to Clique "CARD1""
        }
      } else {
        toastMsg = join.message;
      }
    }
    setLoading(false);
    return;
  }

  async function verifyCliqueAccessToken(token) {
    setLoading(true);
    let sendReq = await VerifyCAT(token);
    console.log(sendReq);
    if (sendReq.success) {
      setInviter(sendReq.user);
      setMembers(sendReq.cliqueActive);
    }
    setLoading(false);
    return;
  }

  async function GetComputerIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    dispatch(setComputerInfo({ ...computerInfo, ip: data?.ip || '' }));
  }

  useEffect(() => {
    verifyCliqueAccessToken(router.query?.token);
    GetComputerIp();
    return () => {
      setLoading(false);
      setInviter();
      setMembers();
    };
  }, [router.query]);

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  if (!inviter)
    return (
      <Section>
        <Div>
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        </Div>
      </Section>
    );

  return (
    <Section>
      <Div>
        <Toast
          showToast={showToast}
          showIcon={false}
          right={'30px'}
          text={toastMsg}
          backgroundColor={'red'}
        />
        <CliqueDiv>
          <SmallText>
            Only join this Clique if you have a close relationship with{''}
            {inviter?.lastname} {inviter?.firstname}
          </SmallText>

          <Wrapper>
            <StyledTitle>
              {inviter?.lastname} {inviter?.firstname} wants you to join their
              Clique on Slashit
            </StyledTitle>
            <StyledSubTitle>Friends already in this Clique:</StyledSubTitle>

            <CliqueMembers>
              {members?.map((member, _) => {
                const { firstname, lastname, avatar } = member;
                return (
                  <Member key={member._id}>
                    <Image
                      src={avatar}
                      height={55}
                      width={55}
                      alt={`${firstname} ${lastname}`}
                    />
                    <Name>{`${firstname} ${lastname}`}</Name>
                  </Member>
                );
              })}
            </CliqueMembers>

            {isMailValidated ? (
              <Details>
                {details.slice(1).map((detail, index) => {
                  const { id, name, type, legend } = detail;
                  return (
                    <InputContainer
                      key={index}
                      name={name}
                      type={type}
                      legend={legend}
                      id={id}
                      // onChange={(e) => handleMemberFormOnchange(e)}
                      error={error?.[`${name}`]}
                    />
                  );
                })}

                <Button
                  // onClick={() => handleEmailSubmit()}
                  width={'100%'}
                  bg={`var(--violet)`}
                  type="filled"
                >
                  Join now
                </Button>
              </Details>
            ) : (
              <Details>
                {details.slice(0, 1).map((detail, index) => {
                  const { id, name, type, legend } = detail;
                  return (
                    <InputContainer
                      key={index}
                      name={name}
                      type={type}
                      legend={legend}
                      id={id}
                      onChange={(e) => handleMemberFormOnchange(e)}
                      error={error?.[`${name}`]}
                    />
                  );
                })}

                <Checker
                  content={`
                    By continuing, you agree to Slashit’s
                    terms of use and privacy policy.
                    We may send reminders about debts on your account
                    to ${inviter?.lastname} ${inviter?.firstname} and you may receive reminders about
                    any debts on their account. 
                    We may also charge their debts to you at anytime when they don't pay on time.
                `}
                />
                <Button
                  onClick={() => {
                    !isMailValidated
                      ? handleEmailSubmit()
                      : handlePasswordSubmit();
                  }}
                  width={'100%'}
                  bg={`var(--violet)`}
                  type="filled"
                >
                  Continue
                </Button>
              </Details>
            )}
          </Wrapper>
        </CliqueDiv>
      </Div>
    </Section>
  );
}

export default JoinClique;
