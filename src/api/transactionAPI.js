const API_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT;

export const AuthorizeCard = async (encrypted, user) => {
  let result;
  console.log(encrypted, 'at check card auth');
  try {
    if (encrypted) {
      result = await fetch(
        'https://tntlslooozz.live.verygoodproxy.com/card/auth',
        {
          method: 'POST',
          headers: {
            //host: "https://www.dvlena.com",
            'Content-Type': 'application/json',
            'client-verify-hash':
              'IYhPLRSF2aZE+P5depGcKGS0IkiJMbjWe57tWka7kzLJM+9ExSO37DQYJnZrmQBU0iKWY1uWT3dN/+',
            user,
          },
          body: JSON.stringify({
            client: encrypted,
          }),
        },
      );
    }
  } catch (e) {
    console.error(e);
  }
  // console.log('msg', result)
  return await result.text();
};

export const ChargeCard = async (encrypted, initiateChargeId) => {
  let result;
  try {
    if (encrypted) {
      result = await fetch(
        'https://tntlslooozz.live.verygoodproxy.com/card/charge',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'client-verify-hash':
              'IYhPLRSF2aZE+P5depGcKGS0IkiJMbjWe57tWka7kzLJM+9ExSO37DQYJnZrmQBU0iKWY1uWT3dN/+',
            initiateChargeId,
          },
          body: JSON.stringify({
            client: encrypted,
          }),
        },
      );
    }
  } catch (e) {
    console.error(e);
  }
  return await result.text();
};

export const AddCard = async (initiateChargeId, otp) => {
  let msg;
  /* Retrieve Token From Local Storage */
  let token;
  let auth = localStorage.getItem('userAuth');
  if (auth) {
    auth = JSON.parse(auth);
    token = auth.token;
  }

  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
            mutation ($initiateChargeId: ID!, $otp: String!) {
              AddCard(initiateChargeId: $initiateChargeId, otp:$otp){
                code,
                success,
                message
              }
            }`,
      variables: {
        initiateChargeId,
        otp,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('res Add Card', res.data);
      let resData;
      if (res.data.AddCard) {
        resData = res.data.AddCard;
      }
      msg = resData;
    });

  return msg;
};
