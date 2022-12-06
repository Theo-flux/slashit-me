import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import statusCode from '../../api/statusCode';
import {
  CliqueAccept,
  Register,
} from '../../api/userAPI';

function SignUp() {
  let toastMsg = '';
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const computerInfo = useSelector((state) => state.userAuth.computerInfo);
  const [memberForm, setMemberForm] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    birthday: '',
    password: '',
  });

  useEffect(() => {
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

  useEffect(() => {
    if (toastMsg) {
      setShowToast(true);
    }
    setTimeout(() => setShowToast(false), 5000);
  }, [toastMsg]);

  function handleMemberFormOnchange(event) {
    const { name, value } = event.target;
    setMemberForm({ ...memberForm, [name]: value });
  }

  async function joinClique() {
    //Join Clique
    let join = await CliqueAccept(router.query?.token);
    if (join.success) {
      if (join.code == statusCode.OK) {
        //TODO - Link to "Add to Clique "Success""
      } else if (join.code == statusCode.ADD_YOUR_CARD) {
        //TODO - Link to "Add to Clique "CARD1""
      }
    } else {
      toastMsg = join?.message;
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
      //Open OTP Modal & Pass this props = joinClique as action
    } else {
      toastMsg = sendReq.message;
    }
    setLoading(false);
  }

  return <div>SignUp</div>;
}

export default SignUp;
