import Image from 'next/image';
import { Section, Div } from '../../../shared';
import {
  DownloadContainer,
  Wrapper,
  Title,
  Text,
  Spacer,
} from './downloadStyles';

function Download() {
  return (
    <Section>
      <Div>
        <DownloadContainer>
          <Wrapper>
            <Title>Download our app</Title>
            <Text>Invite your friends to join your Clique on Slashit</Text>
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
