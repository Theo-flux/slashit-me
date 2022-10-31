import { useState } from 'react';
import Image from 'next/image';
import { Section, Div, LinkButton } from '../../../shared';
import {
  AcceptContainer,
  Title,
  SubTitle,
  Text,
  SelectStoreContainer,
  Row,
  IconCheck,
} from './acceptmoneyStyles';

function Accept() {
  const [selectStore, setSelectStore] = useState(false);

  function handleSelectStore() {
    setSelectStore(!selectStore);
  }

  return (
    <Section>
      <Div>
        <AcceptContainer>
          <Title>How do you want to accept this payment?</Title>

          <SelectStoreContainer
            selectStore={selectStore}
            onClick={() => handleSelectStore()}
          >
            <Row>
              <IconCheck
                selectStore={selectStore}
                className={` ${
                  selectStore
                    ? 'ri-checkbox-circle-fill'
                    : 'ri-checkbox-blank-circle-line'
                }`}
              />
            </Row>
            <Image
              src={'/images/store.svg'}
              width={100}
              height={100}
              alt="store"
            />
            <SubTitle>Accept as business</SubTitle>
            <Text>
              To accept this payment, you’ll need a Slashit business account
            </Text>
          </SelectStoreContainer>

          <LinkButton href="acceptmoney/login" isDisabled={selectStore}>
            Continue
          </LinkButton>
        </AcceptContainer>
      </Div>
    </Section>
  );
}

export default Accept;
