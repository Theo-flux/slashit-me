import { Button } from '../../shared';
import {
  CardContainer,
  CardContent,
  PlanType,
  Type,
  Price,
  BenefitContainer,
  BenefitItem,
} from './priceCardStyles';

function PriceCard({ data }) {
  const { planType, bg_color, price, button, benefits, info } = data;

  return (
    <CardContainer bg={bg_color}>
      <CardContent>
        <PlanType>
          <Type>{planType}</Type>
          <Price>
            <sup>NGN</sup>
            {price}
          </Price>
        </PlanType>

        <BenefitContainer>
          <BenefitItem>Pay in 4 only 1</BenefitItem>
          <BenefitItem>
            3.5% per transaction 2Instant payout to wallet 3
          </BenefitItem>
          <BenefitItem>No free transfers</BenefitItem>
          <BenefitItem>Not Eligible for zero transaction fees</BenefitItem>

          <Button width={`100%`}>{button}</Button>
        </BenefitContainer>
      </CardContent>
    </CardContainer>
  );
}

export default PriceCard;
