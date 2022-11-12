import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { VerifyEmail } from '../../api/userAPI';

function Otp() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  async function verify() {
    setLoading(true);
    let sendReq = await VerifyEmail(router.query?.email, otp);
    if (sendReq.success) {
      router.query?.joinClique();
    } else {
      console.log(sendReq.message);
      //TODO -Toast Message
    }
    setLoading(false);
  }
  
  return <div>otp</div>;
}

export default Otp;
