import {
  CardContainer,
  CardContent,
  Button,
  PlanType,
  Type,
  Price,
  BenefitContainer,
  BenefitItem,
  Icon,
  InfoItem,
  InfoContainer,
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
          {benefits.map((benefit, index) => {
            const { item, isAvailable } = benefit;
            return (
              <BenefitItem key={index}>
                <Icon
                  className={`${
                    isAvailable ? 'ri-check-line' : 'ri-close-line'
                  }`}
                />
                {item}
              </BenefitItem>
            );
          })}

          <Button bg={`var(--violet)`} width={`100%`}>
            {button}
          </Button>
        </BenefitContainer>

        <InfoContainer>
          {info.map((item, index) => {
            return <InfoItem key={index}>{item}</InfoItem>;
          })}
        </InfoContainer>
      </CardContent>
    </CardContainer>
  );
}

export default PriceCard;
