const API_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

export const FetchUserById = async () => {
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
      query {
        FetchUserById{
          code,
          success,
          message,
          user{
            _id,
            role,
            firstname,
            lastname,
            avatar,
            pronoun,
            username,
            uniqueId,
            email,
            mobile,
            address,
            instagram,
            hasViewedNotification,
            currencyShortCode,
            countryCode,
            country,
            timeZone,
            whatsApp,
            instagram,
            tiktok,
            bio,
            latlong,
            networkMsg,
            isPhoneVerified,
            referralPhoto,
            loginTimes,
            anyoneCanFindMe,
            accountVerification {
              isProcessing,
            },
            deviceInfo{
              _id,
              token,
              geoLocation,
              lastSeen,
              deviceId,
            },
            status,
            business{
              isBusinessVerified,
              businessName,
              availableBalance,
              supportEmail,
              merchantStatus,
              ratings{
                average
              }
              checkoutMethods
            },
          }
        }
      }`,
      variables: {},
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      msg = res.data.FetchUserById;
    });
  return msg;
};


