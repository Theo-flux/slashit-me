import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnyTab } from '../../../store/reducers/helper';
import { device } from '../../../utils';
import { useWindowSize } from '../../../utils/window';
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
  const [width, height] = useWindowSize();
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.helper.anyTab);
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);
  const inputEmail = useSelector((state) => state.userAuth.userEmail);

  useEffect(() => {
    if (!activeTab) {
      dispatch(
        setAnyTab({
          page: 'Orderer',
        }),
      );
    }
  }, [width, height]);

  function CtrlAside(tab) {
    //Navigate to the Tab Clicked
    if (tab !== 'Confirmer') {
      dispatch(
        setAnyTab({
          page: tab,
        }),
      );
      return;
    } else {
      if (isLoggedIn) {
        dispatch(
          setAnyTab({
            page: tab,
          }),
        );
        return;
      } else {
        //Do nothing
        return;
      }
    }
  }

  return (
    <AsideContainer>
      <AsideWrapper>
        {sideItems.map((item, index) => {
          const { text, icon, tab } = item;
          return (
            <ItemPod
              onClick={() => CtrlAside(tab)}
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
