import Image from 'next/image';
import {
  SuccessContainer,
  Wrapper,
  Row,
  Col,
  StyledTitle,
  TextInfo,
} from './successStyle';

function Success() {
  return (
    <SuccessContainer>
      <Wrapper>
        <Image
          src="/images/success-check.svg"
          height={75}
          width={75}
          alt="success-check"
        />

        <StyledTitle>Your order has been confirmed!</StyledTitle>

        <Col>
          <TextInfo>
            Get the Slashit app now to keep track of your repayments, manage
            your Clique and increase your Credit limit anytime
          </TextInfo>

          <Row>
            <Image
              src="/images/google_play.svg"
              height={120}
              width={120}
              alt="google_play"
            />

            <Image
              src="/images/apple_store.svg"
              height={120}
              width={120}
              alt="apple_store"
            />
          </Row>
        </Col>
      </Wrapper>
    </SuccessContainer>
  );
}

export default Success;
