import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  CliqueAccept,
  Login,
  SaveLoginCredentials,
  ShopperExist,
  VerifyCAT,
} from '../../api/userAPI';
import { Section, Div, Checker, InputContainer, Button } from '../../shared';
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

function JoinClique(props) {
  const {} = props;
  const [memberForm, setMemberForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [invitee, setInvitee] = useState('');
  const [members, setMembers] = useState();

  function handleMemberFormOnchange(event) {
    const { name, value } = event.target;
    setMemberForm({ ...memberForm, [name]: value });
  }

  function handleMemberFormSubmit() {
    const errors = validateThis(memberForm);
    setError(errors);
    return;
  }

  async function joinBtn() {
    if (memberForm.email && !password) {
      validateShopper();
    } else if (memberForm.email && password) {
      joinClique();
    }
  }

  async function validateShopper() {
    let submit = handleMemberFormSubmit();
    if (submit.email) return;
    setLoading(true);
    let sendReq = await ShopperExist(memberForm.email);
    if (sendReq.success) {
      if (sendReq.code == statusCode.COMPLETE_REGISTRATION) {
        console.log(
          'Please complete your profile on the Slashit app, then come back to add someone to your Clique.',
        );
        //TODO - Toast console message
      } else if (sendReq.code == statusCode.OK) {
        //TODO - Open password input field
      }
    } else {
      //TODO - Link to "Add to Clique 03"
    }
    setLoading(false);

    return;
  }

  async function joinClique() {
    let submit = handleMemberFormSubmit();
    if (submit.email || submit.password) return;
    setLoading(true);
    let userInfo = {
      email: memberForm.email,
      password: memberForm.password,
      platform: 'web',
      deviceId: '',
      ipAddress: '',
    };
    let sendReq = await Login(userInfo);
    if (sendReq.success) {
      SaveLoginCredentials(
        JSON.stringify({ ...userInfo, token: sendReq.token }),
      );
      //Join Clique
      let join = await CliqueAccept(props.token);
      if (join.success) {
        if (join.code == statusCode.OK) {
          //TODO - Link to "Add to Clique "Success""
        } else if (join.code == statusCode.ADD_YOUR_CARD) {
          //TODO - Link to "Add to Clique "CARD1""
        }
      } else {
        console.log(join.message);
        //TODO - Toast console message
      }
    } else {
      console.log(sendReq.message);
      //TODO - Toast console message
    }
    setLoading(false);
    return;
  }

  async function verifyCliqueAccessToken() {
    setLoading(true);
    let sendReq = await VerifyCAT();
    if (sendReq.success) {
      setInvitee(sendReq.user);
      setMembers(sendReq.cliqueActive);
    }
    setLoading(false);
    return;
  }

  useEffect(() => {
    verifyCliqueAccessToken();
    return () => {
      setLoading(false);
      setInvitee();
      setMembers();
    };
  }, []);

  // if (!invitee)
  //   return (
  //     //Return a loading indicator or shimmer effect
  //     <></>
  //   );

  return (
    <Section>
      <Div>
        <CliqueDiv>
          <SmallText>
            Only join this Clique if you have a close relationship with{' '}
            {invitee?.firstname}
          </SmallText>

          <Wrapper>
            <StyledTitle>
              {invitee?.firstname} wants you to join their Clique on Slashit
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

            <Details>
              {details.map((detail, index) => {
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
                    We’ll send reminders about debts on your account
                    to Yvonne Grace and you’ll receive reminders about
                    any debts on their account. 
                    We may also charge their debts to you at anytime when they don't pay on time.
                `}
              />
              <Button
                onClick={joinBtn}
                //onClick={joinClique}
                width={'100%'}
                bg={`var(--violet)`}
                type="filled"
              >
                Join now
              </Button>
            </Details>
          </Wrapper>
        </CliqueDiv>
      </Div>
    </Section>
  );
}

export default JoinClique;
