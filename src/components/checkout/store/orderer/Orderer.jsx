import {
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
  Top,
  Row,
  Text,
} from '../storeStyle';
import { OrderContent, OrderDetails, OrderSummary } from './orderStyles';

function Orderer() {
  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-shopping-bag-2-line" />
            <ItemText>Your order</ItemText>
          </ItemPod>

          <Icon className="ri-arrow-down-s-line" />
        </Top>

        <OrderContent>
          <OrderDetails>
            <Row>
              <Text>Your details</Text>{' '}
              <Icon className="ri-arrow-down-s-line" />
            </Row>
          </OrderDetails>

          <OrderSummary>
            <Row>
              <Text>Order Summary</Text>
              <Icon className="ri-arrow-down-s-line" />
            </Row>
          </OrderSummary>
        </OrderContent>
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Orderer;
