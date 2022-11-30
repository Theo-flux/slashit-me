import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDays } from '../../../../helpers/dates';
import { Button } from '../../../../shared';
import { setAnyAction, setAnyTab } from '../../../../store/reducers/helper';
import {
  Top,
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
  ButtonWrapper,
} from '../storeStyle';

function Scheduler() {
  const dispatch = useDispatch();
  const preferredCard = useSelector((state) => state.transaction.preferredCard);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const [scheduleSelected, setScheduleSelected] = useState('PayIn4'); //"PayIn4", "PayIn3"
  let splitIn3 = (orderDetails?.amount / 3).toFixed(2);
  const activeTab = useSelector((state) => state.helper.anyTab);

  const scheduleIn4 = [
    {
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due today`,
    },
    {
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(14, 'MMM DD')}`,
    },
    {
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(28, 'MMM DD')}`,
    },
    {
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(42, 'MMM DD')}`,
    },
  ];

  const scheduleIn3 = [
    {
      amount: splitIn3,
      date: `Due today`,
    },
    {
      amount: splitIn3,
      date: `Due ${addDays(30, 'MMM DD')}`,
    },
    {
      amount: (orderDetails?.amount - splitIn3 * 2).toFixed(2),
      date: `Due ${addDays(60, 'MMM DD')}`,
    },
  ];

  async function CtrlSchedule() {
    dispatch(
      setAnyTab({
        page: 'Confirmer',
        params: {
          scheduleSelected,
          schedule: scheduleSelected == 'PayIn4' ? scheduleIn4 : scheduleIn3,
        },
      }),
    );
  }

  useEffect(() => {
    if (activeTab == 'Scheduler') {
      dispatch(
        setAnyAction({
          action: CtrlSchedule,
        }),
      );
    }
  });

  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top>
          <ItemPod>
            <Icon className="ri-time-line" />
            <ItemText>Schedule</ItemText>
          </ItemPod>

          <Icon className="ri-arrow-down-s-line" />
          {/* 
          //TODO - Payment dates UI
          //Pay 4 times - Map through scheduleIn4
          //Pay 3 times - Map through scheduleIn3 
          //TDOD - If orderDetails.paymentMethods.includes('PayIn3') then show Pay 3 times schedule, else hide it.
          */}

          {/* 
            Continue Button - onClick, If preferredCard show ConfirmOrder1 else show Enter card details
           */}
        </Top>
        {/* <ButtonWrapper>
          <Button
            disabled={!scheduleSelected}
            onClick={() =>
              dispatch(
                setAnyTab({
                  page: 'Confirmer',
                  params: {
                    scheduleSelected,
                    schedule:
                      scheduleSelected == 'PayIn4' ? scheduleIn4 : scheduleIn3,
                  },
                }),
              )
            }
            width={`100%`}
          >
            Confirm
          </Button>
        </ButtonWrapper> */}
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Scheduler;

//      dispatch(setAnyTab({ page: 'Scheduler', params: '' }));
