import ENV from "../../env";


export const FetchUserById = async () => {
  let msg;
  //Retrieve Token
  let token;
  // let getCred = await Keychain.getGenericPassword();
  // if (getCred) {
  //   if (getCred.username) {
  //     getCred = JSON.parse(getCred.username);
  //     token = getCred.token;
  //   }
  // }

  await fetch(`${ENV.REACT_APP_GRAPHQL_ENDPOINT}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
