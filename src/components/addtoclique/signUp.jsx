import { useRouter } from 'next/router';
import React, { useState } from 'react';
import statusCode from '../../api/statusCode';
import {
  CliqueAccept,
  Register,
  SaveLoginCredentials,
} from '../../api/userAPI';

function SignUp() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [computerInfo, setComputerInfo] = useState({ platform, os, ip: '' });
  const [memberForm, setMemberForm] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    birthday: '',
    password: '',
  });

  async function GetComputerIp() {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    setComputerInfo({ ...computerInfo, ip: data.ip });
  }

  useEffect(() => {
    GetComputerIp();
    return () => {
      setLoading(false);
      setMemberForm({
        firstname: '',
        lastname: '',
        phone: '',
        birthday: '',
        password: '',
      });
    };
  }, []);

  function handleMemberFormOnchange(event) {
    const { name, value } = event.target;
    setMemberForm({ ...memberForm, [name]: value });
  }

  async function joinClique() {
    let userInfo = {
      email: router.query?.email,
      password: memberForm.password,
      platform: 'web',
      deviceId: `${computerInfo.platform} ${computerInfo.os}`,
      ipAddress: computerInfo.ip,
    };
    let sendReq = await Login(userInfo);
    if (sendReq.success) {
      SaveLoginCredentials(
        JSON.stringify({ ...userInfo, token: sendReq.token }),
      );

      //Join Clique
      let join = await CliqueAccept(router.query?.token);
      if (join.success) {
        if (join.code == statusCode.OK) {
          //TODO - Link to "Add to Clique "Success""
        } else if (join.code == statusCode.ADD_YOUR_CARD) {
          //TODO - Link to "Add to Clique "CARD1""
        }
      } else {
        console.log(join.message);
        //Toast message
      }
    } else {
      console.log(sendReq.message);
      //Toast message
    }
    return;
  }

  async function createBtn() {
    setLoading(true);
    let userInfo = {
      email: router.query?.email,
      firstname: memberForm.firstname,
      lastname: memberForm.lastname,
      mobile: memberForm.phone,
      birthDay: memberForm.birthday,
      password: memberForm.password,
      platform: 'web',
      role: 'shopper',
      country: 'NG',
    };
    let sendReq = await Register(userInfo);
    if (sendReq.success) {
      //Open OTP Modal
    } else {
      console.log(sendReq.message);
      //TODO -Toast Message
    }
    setLoading(false);
  }

  return <div>SignUp</div>;
}

export default SignUp;
