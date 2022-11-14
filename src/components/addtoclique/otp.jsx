import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SaveLoginCredentials, VerifyEmail } from '../../api/userAPI';

function Otp(props) {
  let toastMsg = '';
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [showToast, setShowToast] = useState(false);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  async function verify() {
    setLoading(true);
    let sendReq = await VerifyEmail(
      props.email,
      otp,
      (any = false),
      computerInfo,
      (platform = 'web'),
    );
    if (sendReq.success) {
      let userInfo = localStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);
      SaveLoginCredentials(
        JSON.stringify({ ...userInfo, token: sendReq.token }),
      );
      props?.action(); //TODO call action() passeed to the OTP modal onSuccess
    } else {
      toastMsg = sendReq.message;
    }
    setLoading(false);
  }

  return <div>otp</div>;
}

export default Otp;
