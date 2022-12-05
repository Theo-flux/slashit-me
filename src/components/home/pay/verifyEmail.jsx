import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserById, VerifyEmail } from '../../../api/userAPI';
import { FetchCards, PayAnyone } from '../../../api/transactionAPI';
import statusCode from '../../../api/statusCode';
import { setPreferredCard } from '../../../store/reducers/transaction';
import { setIsLoggedIn, setUser } from '../../../store/reducers/auth';
import { useLocalStorage, useToast } from '../../../hooks';

function EnterEmailCode(props) {
  let toastMsg = '';
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [toastOptions, toast] = useToast();
  const { sessionInfo } = useLocalStorage();
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);

  async function verify() {
    setLoading(true);
    let sendReq = await VerifyEmail(
      props.email,
      otp,
      props?.any ? true : false,
      computerInfo,
      (platform = 'web'),
    );
    if (sendReq.success) {
      let userInfo = sessionInfo.userInfo;
      setSession({ userInfo, token: sendReq.token });

      const userReq = await FetchUserById();
      if (userReq.success) {
        dispatch(setUser(userReq.user));
      }
      let cardReq = await FetchCards(true);
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
        dispatch(
          setPreferredCard(cardReq.result.filter((item) => item.preferred)[0]),
        );
      } else {
        props.setMode('');
      }
    } else {
      toast({ text: sendReq.message, textColor: '#fff' });
    }
    setLoading(false);
  }

  return <div>EnterEmailCode</div>;
}

export default EnterEmailCode;
