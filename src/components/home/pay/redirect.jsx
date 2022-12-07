import { PayForm } from './payStyles';
import { Loader, Text } from '../../../shared';
import Success, {
  SuccessContainer,
  IconCancel,
  Inner,
  Message,
} from './success';
import styled from 'styled-components';

const StyledText = styled(Text)`
  text-align: center;
  margin-top: 2rem;
`;

function Redirect() {
  return (
    <PayForm>
      <SuccessContainer>
        <IconCancel className="ri-close-fill" />

        <Inner>
          <Loader />
          <StyledText>
            Redirecting you to a secure page where you’ll complete your payment
          </StyledText>
          <Message>Please don’t close this box.</Message>
        </Inner>
      </SuccessContainer>
    </PayForm>
  );
}

export default Redirect;
