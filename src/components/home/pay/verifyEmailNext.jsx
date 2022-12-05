import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { FetchUserById, VerifyEmail } from '../../../api/userAPI';
import { FetchCards, PayAnyone } from '../../../api/transactionAPI';
import statusCode from '../../../api/statusCode';
import { setPreferredCard } from '../../../store/reducers/transaction';
import { setIsLoggedIn, setUser } from '../../../store/reducers/auth';
import { useLocalStorage, useToast } from '../../../hooks';

function EnterEmailCodeNext(props) {
  let toastMsg = '';
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastOptions, toast] = useToast();
  const { setSession, sessionInfo } = useLocalStorage();
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const isLoggedIn = useSelector((state) => state.userAuth.isLoggedIn);

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  useEffect(() => {
    if (isLoggedIn) {
      props.setMode('CARD_DETAILS');
    }
  }, [isLoggedIn]);

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
      setSession({ userInfo, token: sendReq.token, session: true });
      const userReq = await FetchUserById();
      if (userReq.success) {
        dispatch(setUser(userReq.user));
      }
    } else {
      toast({ text: sendReq.message, textColor: '#fff' });
    }
    setLoading(false);
  }

  return <div>EnterEmailCodeNext</div>;
}

export default EnterEmailCodeNext;
