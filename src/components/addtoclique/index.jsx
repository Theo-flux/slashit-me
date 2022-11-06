import Image from 'next/image';
import { Section, Div, Text } from '../../shared';
import {
  CliqueDiv,
  SmallText,
  Wrapper,
  StyledTitle,
  StyledSubTitle,
  CliqueMembers,
  Member,
  Name,
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
          </Wrapper>
        </CliqueDiv>
      </Div>
    </Section>
  );
}

export default JoinClique;
