import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  VerifyEmail } from '../../api/userAPI';
import { useLocalStorage, useToast } from '../../hooks';

function Otp(props) {
  let toastMsg = '';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [toastOptions, toast] = useToast();
  const { setSession, sessionInfo} = useLocalStorage();
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);

  async function verify() {
    setLoading(true);
    let sendReq = await VerifyEmail(
      props?.email,
      otp,
      false,
      computerInfo,
      'web',
    );
    if (sendReq.success) {
      let userInfo = sessionInfo.userInfo;
      setSession({ userInfo, token: sendReq.token , session: true});
      props?.action(); //TODO call action() passeed to the OTP modal onSuccess
    } else {
      toast({ text: sendReq.message, textColor: '#fff' });
    }
    setLoading(false);
  }

  return <div>otp</div>;
}

export default Otp;
