import Image from 'next/image';
import { Section, Div, Title, GetAppButton } from '../../../shared';
import { DownloadContainer, Wrapper, Text, Spacer } from './downloadStyles';

function Download() {
  return (
    <Section>
      <Div>
        <DownloadContainer>
          <Wrapper>
            <Title>Download our app</Title>
            <Text>Invite your besties to join your Clique on Slashit</Text>
          </Wrapper>

          <Wrapper>
            <Image
              src={'/images/apple.svg'}
              width={200}
              height={70}
              alt="google store"
            />
            <Spacer />
            <Image
              src={'/images/google.svg'}
              width={200}
              height={70}
              alt="apple store"
            />
          </Wrapper>
        </DownloadContainer>
      </Div>
    </Section>
  );
}

export default Download;
