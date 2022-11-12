import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchCards } from '../../api/transactionAPI';
import { FetchUserById } from '../../api/userAPI';
import {
  EncryptData,
  FormatCardNumber,
  FormatExpirationDate,
} from '../../helpers/debitCardValidator';
import { setUser } from '../../store/reducers/auth';
import { setPreferredCard } from '../../store/reducers/transaction';

function AddCard() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [expiration, setExpiration] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [CVV, setCVV] = useState('');
  const [disabled, setdisabled] = useState(true);
  const [buttonTitle, setbuttonTitle] = useState('Add Card');
  const [cardData, setCardData] = useState('');
  const [data, setData] = useState('');
  const [PIN, setPIN] = useState();
  const [OTP, setOTP] = useState();
  const [mode, setMode] = useState('DETAILS');
  const [description, setDescription] = useState('Enter your card details');
  const preferredCard = useSelector((state) => state.transaction.preferredCard);

  const user = useSelector((state) => state.userAuth.user);
  let currencyShortCode = user?.currencyShortCode;

  function cleanUp() {
    setCVV('');
    setCardNumber('');
    setExpiration('');
    setloading(false);
    setPIN('');
    setOTP('');
    setdisabled(true);
    setbuttonTitle('Add Card');
  }

  async function fetchUser() {
    const fetchData = await FetchUserById();
    if (fetchData.success) {
      dispatch(setUser(fetchData.user));
    }
    if (!preferredCard) {
      let cardReq = await FetchCards(true);
      if (cardReq.success && cardReq.result && cardReq.result.length > 0) {
        dispatch(
          setPreferredCard(cardReq.result.filter((item) => item.preferred)[0]),
        );
      }
    }
    return;
  }

  async function formatExpirationDate(string) {
    setExpiration(FormatExpirationDate(string));
    return;
  }

  async function formatCardNumber(number) {
    setCardNumber(FormatCardNumber(number));
    return;
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (cardNumber && expiration && CVV) {
      if (
        cardNumber.length >= 16 &&
        expiration.length == 5 &&
        CVV.length >= 3
      ) {
        setdisabled(false);
        setbuttonTitle('Add Card');
      } else {
        setdisabled(true);
        setbuttonTitle('Add Card');
      }
    }
  }, [expiration, cardNumber, CVV]);

  useEffect(() => {
    //PIN
    if (mode == 'PIN') {
      setDescription('Enter card PIN');
      if (PIN && PIN.length == 4) {
        setdisabled(false);
        setbuttonTitle('Confirm PIN');
      } else {
        setdisabled(true);
      }
    }
    //OTP
    if (mode == 'OTP') {
      if (OTP && OTP.length >= 4) {
        setdisabled(false);
        setbuttonTitle('Confirm OTP');
      } else {
        setdisabled(true);
      }
    }

    if (mode == 'REDIRECT') {
      //TODO - Link to "Redirecting"
    }

    if (mode == 'NEW_WINDOW') {
      //TODO - Open data?.meta?.authorization?.redirect in another window
    }
  }, [PIN, OTP, mode]);

  async function ValidateCard() {
    setloading(true);

    let expiry_array = expiration.split('/');

    let cardData;

    cardData = {
      card_number: cardNumber.replace(/\s+/g, ''),
      cvv: CVV,
      expiry_month: expiry_array[0],
      expiry_year: expiry_array[1],
      currency: currencyShortCode,
      amount: 100,
      email: user.email,
      fullname: `${user.firstname} ${user.lastname}`,
      tx_ref: uuidv4(),
      redirect_url: 'https://shoplens.herokuapp.com/success', //Change on production
    };

    setCardData(cardData);

    const encrypted = EncryptData(
      process.env.FLUTTERWAVE_KEY,
      JSON.stringify(cardData),
    );
    console.log('encrypted', encrypted);
    await Authorisation(encrypted);
    setloading(false);
    return;
  }

  async function Authorisation(encrypted) {
    const data = await CheckAuthorisationAddCard(encrypted, user._id);
    let res = JSON.parse(data);
    if (res.success) {
      if (res.actionRequired) {
        if (res.meta.authorization.mode === 'pin') {
          setData(res);
          setMode('PIN');
          // Toast "Enter your Card PIN to continue.",
        }
        if (res.meta.authorization.mode === 'redirect') {
          setData(res);
          setMode('REDIRECT');
          setTimeout(() => {
            setMode('NEW_WINDOW');
          }, 2500);
        }
      } else {
        //  Toast'Your card has been successfully added!',
        //Clique Accept
        //TODO - Link to "Add to Clique Success"
        cleanUp();
      }
    } else {
      //TODO - Toast res.message
    }
    return;
  }

  async function ValidatePIN() {
    if (!user.country) {
      return;
    }
    setloading(true);
    let PINData = {
      ...cardData,
      authorization: {
        mode: 'pin',
        pin: parseFloat(PIN),
      },
    };

    const encrypted = EncryptData(
      process.env.FLUTTERWAVE_KEY,
      JSON.stringify(PINData),
    );

    const data = await GetAuthorisationAddCard(encrypted, user._id);

    let res = JSON.parse(data);
    if (res.success) {
      if (res.actionRequired) {
        if (res?.meta?.authorization?.mode === 'otp') {
          // Toast res.message
          setMode('OTP');
          setData(res);
          setDescription(res.message);
        }

        if (res?.meta?.authorization?.mode === 'redirect') {
          setData(res);
          setMode('REDIRECT');
          setTimeout(() => {
            setScreen('NEW_WINDOW');
          }, 2500);
        }
      } else {
        //Toast res.message,
        //Clique Accept
        //TODO - Link to "Add to Clique Success"
        cleanUp();
      }
    } else {
      setData(res);
      //Toast res.message
    }
    setloading(false);
    return;
  }

  async function ValidateOTP() {
    setloading(true);
    const msg = await AddCard(data?.initiateChargeId, OTP);
    if (msg.success) {
      // Toast'Your card has been successfully added!',
      //Clique Accept
      //TODO - Link to "Add to Clique Success"
      cleanUp();
    } else {
      //Toast msg.message
    }
    setloading(false);
    return;
  }

  function btnPress() {
    if (!user.country) {
      //Toast "Please refresh page"
      return;
    }

    if (loading) return;
    if (mode == 'PIN') {
      ValidatePIN();
      return;
    }
    if (mode == 'OTP') {
      ValidateOTP();
      return;
    }
    ValidateCard();
    return;
  }

  return <div>AddCard</div>;
}

export default AddCard;