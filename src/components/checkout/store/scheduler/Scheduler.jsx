import getSymbolFromCurrency from 'currency-symbol-map';
import { useEffect, useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { addDays } from '../../../../helpers/dates';
import { AmountSeparator } from '../../../../helpers/numberValidation';
import { Button } from '../../../../shared';
import {
  setAnyAction,
  setAnyTab,
  setExtraTab,
  setScheduleSelected,
} from '../../../../store/reducers/helper';
import {
  Top,
  EnvelopeCover,
  ProcessContent,
  ItemPod,
  ItemText,
  Icon,
  ButtonWrapper,
} from '../storeStyle';
import {
  CardContainer,
  Row,
  Choice,
  ChoiceIcon,
  ChoiceText,
  Wrapper,
  RowWrap,
  Amount,
  Date,
  ProgressText,
} from './schdulerStyles';

const Card = ({ width, data }) => {
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const { value, text, amount, date } = data;
  return (
    <CardContainer width={width}>
      <div
        style={{
          width: '100%',
          maxWidth: '75px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <CircularProgressbarWithChildren
            value={value}
            strokeWidth={5}
            styles={buildStyles({
              strokeLinecap: 'round',
              pathColor: `#1d1d1d`,
              trailColor: 'white',
            })}
          >
            <ProgressText>
              {text}
              <sup>
                {text === '1'
                  ? 'st'
                  : text === '2'
                  ? 'nd'
                  : text === '3'
                  ? 'rd'
                  : 'th'}
              </sup>
            </ProgressText>
          </CircularProgressbarWithChildren>
        </div>
      </div>
      <Amount>
        {getSymbolFromCurrency(orderDetails?.currency)}
        {AmountSeparator(amount)}
      </Amount>
      <Date>{date}</Date>
    </CardContainer>
  );
};

function Scheduler() {
  const dispatch = useDispatch();
  const preferredCard = useSelector((state) => state.transaction.preferredCard);
  const orderDetails = useSelector((state) => state.transaction.orderDetails);
  const scheduleSelected = useSelector(
    (state) => state.helper.scheduleSelected,
  );
  let splitIn3 = (orderDetails?.amount / 3).toFixed(2);
  const activeTab = useSelector((state) => state.helper.anyTab);
  const anyAction = useSelector((state) => state.helper.anyAction);

  const scheduleIn4 = [
    {
      text: '1',
      value: 25,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due today`,
    },
    {
      text: '2',
      value: 50,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(14, 'MMM DD')}`,
    },
    {
      text: '3',
      value: 75,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(28, 'MMM DD')}`,
    },
    {
      text: '4',
      value: 100,
      amount: (orderDetails?.amount / 4).toFixed(2),
      date: `Due ${addDays(42, 'MMM DD')}`,
    },
  ];

  const scheduleIn3 = [
    {
      text: '1',
      value: 33.3,
      amount: splitIn3,
      date: `Due today`,
    },
    {
      text: '2',
      value: 66.6,
      amount: splitIn3,
      date: `Due ${addDays(30, 'MMM DD')}`,
    },
    {
      text: '3',
      value: 99.9,
      amount: (orderDetails?.amount - splitIn3 * 2).toFixed(2),
      date: `Due ${addDays(60, 'MMM DD')}`,
    },
  ];

  function topPress() {
    if (activeTab?.page == 'Scheduler') {
      dispatch(setAnyTab());
    } else {
      dispatch(
        setAnyTab({
          page: 'Scheduler',
        }),
      );
    }
  }

  async function CtrlScheduler() {
    if (preferredCard) {
      dispatch(
        setAnyTab({
          page: 'Confirmer',
          params: {
            scheduleSelected,
            schedule: scheduleSelected == 'PayIn4' ? scheduleIn4 : scheduleIn3,
          },
        }),
      );
    } else {
      dispatch(
        setExtraTab({
          page: 'CardDetails',
        }),
      );
    }
  }

  useEffect(() => {
    if (activeTab?.page == 'Scheduler') {
      if (anyAction) {
        CtrlScheduler();
      }
    }
  }, []);

  console.log(activeTab, 'scheduler');

  return (
    <ProcessContent>
      <EnvelopeCover>
        <Top onClick={() => topPress()}>
          <ItemPod>
            <Icon className="ri-time-line" />
            <ItemText>Schedule</ItemText>
          </ItemPod>

          <Icon
            className={
              activeTab?.page == 'Scheduler'
                ? 'ri-arrow-up-s-line'
                : 'ri-arrow-down-s-line'
            }
          />
        </Top>

        {activeTab?.page == 'Scheduler' && (
          <Wrapper>
            <Row>
              <Choice
                scheduleSelected={scheduleSelected}
                onClick={() => dispatch(setScheduleSelected('PayIn4'))}
              >
                <ChoiceIcon
                  className={
                    scheduleSelected === 'PayIn4'
                      ? `ri-checkbox-circle-fill`
                      : `ri-checkbox-blank-circle-line`
                  }
                />
                <ChoiceText>Pay 4 times</ChoiceText>
              </Choice>

              {orderDetails?.paymentMethods.includes('PayIn3') && (
                <Choice
                  scheduleSelected={scheduleSelected}
                  onClick={() => dispatch(setScheduleSelected('PayIn3'))}
                >
                  <ChoiceIcon
                    className={
                      scheduleSelected === 'PayIn3'
                        ? `ri-checkbox-circle-fill`
                        : `ri-checkbox-blank-circle-line`
                    }
                  />
                  <ChoiceText>Pay 3 times</ChoiceText>
                </Choice>
              )}
            </Row>

            {scheduleSelected === 'PayIn4' && (
              <RowWrap>
                {scheduleIn4?.map((schedule, index) => {
                  return <Card width={'24%'} key={index} data={schedule} />;
                })}
              </RowWrap>
            )}
            {scheduleSelected === 'PayIn3' && (
              <RowWrap>
                {scheduleIn3?.map((schedule, index) => {
                  return <Card width={'30%'} key={index} data={schedule} />;
                })}
              </RowWrap>
            )}
          </Wrapper>
        )}
      </EnvelopeCover>
    </ProcessContent>
  );
}

export default Scheduler;
