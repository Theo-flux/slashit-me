import {
  AsideContainer,
  AsideWrapper,
  Icon,
  ItemText,
  ItemPod,
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
      </AsideWrapper>
    </AsideContainer>
  );
}

export default Aside;
