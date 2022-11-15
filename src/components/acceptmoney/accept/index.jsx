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
import { setComputerInfo } from '../../../store/reducers/auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Accept() {
  const dispatch = useDispatch();
  const router = useRouter();
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const [selectStore, setSelectStore] = useState(false);

  if (typeof window !== 'undefined') {
    let platform = window.navigator.platform;
    let os = window.navigator.appVersion;
    os = os.split(' ');
    os = `${os[2]} ${os[3]}`;
    dispatch(setComputerInfo({ ...computerInfo, platform, os }));
  }

  function handleSelectStore() {
    setSelectStore(!selectStore);
  }

  async function GetComputerIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    dispatch(setComputerInfo({ ...computerInfo, ip: data?.ip || '' }));
  }

  useEffect(() => {
    GetComputerIp();
  }, []);

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

          <LinkButton  href="acceptmoney/login" isDisabled={selectStore}>
            Continue
          </LinkButton>
        </AcceptContainer>
      </Div>
    </Section>
  );
}

export default Accept;
