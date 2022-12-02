import { useSelector, useDispatch } from 'react-redux';
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
import { setAnyTab } from '../../../store/reducers/helper';

const sideItems = [
  {
    id: '1',
    icon: 'ri-shopping-bag-2-line',
    text: 'Your order',
    tab: 'Orderer',
  },
  {
    id: '2',
    icon: 'ri-time-line',
    text: 'Schedule',
    tab: 'Scheduler',
  },

  {
    id: '3',
    icon: 'ri-checkbox-circle-line',
    text: 'Confirm order',
    tab: 'Confirmer',
  },
];

function Aside() {
  const activeTab = useSelector((state) => state.helper.anyTab);
  const dispatch = useDispatch();

  return (
    <AsideContainer>
      <AsideWrapper>
        {sideItems.map((item, index) => {
          const { text, icon, tab } = item;
          return (
            <ItemPod
              onClick={() => {
                dispatch(setAnyTab({ page: tab }));
              }}
              activeTab={activeTab?.page}
              tab={tab}
              key={index}
            >
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
