import {
  AsideContainer,
  AsideWrapper,
  Icon,
  ItemText,
  ItemPod,
  Column,
  Row,
  SmallText,
  Terms,
} from './asideStyles';

const sideItems = [
  {
    id: '1',
    icon: 'ri-shopping-bag-2-line',
    text: 'Your order',
  },
  {
    id: '2',
    icon: 'ri-time-line',
    text: 'Schedule',
  },

  {
    id: '3',
    icon: 'ri-checkbox-circle-line',
    text: 'Confirm order',
  },
];

function Aside() {
  return (
    <AsideContainer>
      <AsideWrapper>
        {sideItems.map((item, index) => {
          const { text, icon } = item;
          return (
            <ItemPod key={index}>
              <Icon className={`${icon}`} />
              <ItemText>{text}</ItemText>
            </ItemPod>
          );
        })}

        <Column>
          <Row>
            <Icon className="ri-lock-2-fill" />
            <SmallText>Buy now, pay later by Slashit</SmallText>
          </Row>

          <Terms>Terms | Privacy</Terms>
        </Column>
      </AsideWrapper>
    </AsideContainer>
  );
}

export default Aside;
