import Image from 'next/image';
import { Section, Div, Checker, InputContainer, Button } from '../../shared';
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

const members = [
  {
    id: '1',
    name: 'Daniel T.',
    src: '/images/daniel.svg',
  },

  {
    id: '2',
    name: 'Kayla B.',
    src: '/images/kayla.svg',
  },

  {
    id: '3',
    name: 'Sarah v.',
    src: '/images/sarah.svg',
  },
];

const details = [
  {
    id: 'email',
    name: 'Email',
    legend: 'Enter your Email',
    type: 'email',
  },

  {
    id: 'password',
    name: 'Password',
    legend: 'Enter your Password',
    type: 'password',
  },
];

function JoinClique() {
  return (
    <Section>
      <Div>
        <CliqueDiv>
          <SmallText>
            Only join this Clique if you have a close relationship with Yvonne
            Grace
          </SmallText>

          <Wrapper>
            <StyledTitle>
              Yvonne Grace wants you to join their Clique on Slashit
            </StyledTitle>
            <StyledSubTitle>Friends already in this Clique:</StyledSubTitle>

            <CliqueMembers>
              {members.map((member, index) => {
                const { name, src } = member;
                return (
                  <Member key={index}>
                    <Image src={src} height={55} width={55} alt="member" />
                    <Name>{name}</Name>
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
                  />
                );
              })}

              <Checker
                content={`
                    By continuing, you agree to Slashit’s
                    terms of use and privacy policy.
                    We’ll send reminders about debts on your account
                    to Yvonne Grace and you’ll receive reminders about
                    any debts on their account. We may charge debts on
                    their account to you at anytime and charge debts on
                    your account to them at anytime.
                `}
              />
              <Button width={'100%'} bg={`var(--violet)`} type="filled">Join now</Button>
            </Details>
          </Wrapper>
        </CliqueDiv>
      </Div>
    </Section>
  );
}

export default JoinClique;
