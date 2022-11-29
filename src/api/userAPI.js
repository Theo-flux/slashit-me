const API_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

export const SaveLoginCredentials = (credentials) => {
  localStorage.setItem('userAuth', credentials);
  return;
};

export const RemoveLoginCredentials = () => {
  localStorage.setItem('userAuth', '');
  return;
};

export const FetchUserById = async () => {
  let msg;
  /* Retrieve Token From Local Storage */
  let token;
  let auth = localStorage.getItem('userAuth');
  if (auth) {
    auth = JSON.parse(auth);
    token = auth.token;
  }

  console.log(process.env.GRAPHQL_ENDPOINT, 'is')

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

export const Register = async (props) => {
  let msg;
  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation ($firstname: String!, $lastname: String!, $mobile: String!, $email: String!, $birthDay: Date!, $type: signupEmailTypes!, $password: String!, $role: UserRole!, $country: String!, $businessName: String,$platform: String  ){
        Register(firstname: $firstname, lastname: $lastname, mobile: $mobile, email: $email, birthDay: $birthDay, type: $type, password: $password, role: $role, country: $country, businessName: $businessName, platform: $platform){
            code,
            success,
            message
        }
      }`,
      variables: {
        ...props,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('res', res, role);
      if (res) {
        msg = res.data.Register;
      }
    });
  return msg;
};

export const NewRegister = async (props) => {
  let msg;
  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
      mutation ($firstname: String!, $lastname: String!, $mobile: String!, $email: String!, $birthDay: Date!, $type: signupEmailTypes!, $password: String!, $role: UserRole!, $country: String!, $businessName: String, $ipAddress: String, $deviceId: String, $platform: String ){
        NewRegister(firstname: $firstname, lastname: $lastname, mobile: $mobile, email: $email, birthDay: $birthDay, type: $type, password: $password, role: $role, country: $country, businessName: $businessName, ipAddress: $ipAddress, deviceId: $deviceId, platform: $platform ){
            code,
            success,
            message
        }
      }`,
      variables: {
        ...props,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('res', res, role);
      if (res) {
        msg = res.data.NewRegister;
      }
    });
  return msg;
};

export const ForgotPassword = async (email, ipAddress) => {
  let msg;
  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                  mutation ($email: String! $ipAddress: String){
                      ForgotPassword(email: $email ipAddress: $ipAddress){
                          code,
                          success,
                          message,
                        
                      }
                  }`,
      variables: {
        email,
        ipAddress,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let resData;
      if (res?.data.ForgotPassword) {
        resData = res.data.ForgotPassword;
      }
      msg = resData;
    });
  return msg;
};

export const ResetPassword = async (
  email,
  newPassword,
  confirmPassword,
  code,
) => {
  let msg;
  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                    mutation ($email: String!, $newPassword: String!, $confirmPassword: String!, $securityCode: String!){
                        ResetPassword(email: $email, newPassword: $newPassword, confirmPassword: $confirmPassword, securityCode: $securityCode ){
                            code,
                            success,
                            message,
                            token,
                            user{
                              _id,
                              firstname,
                              lastname,
                              avatar,
                              pronoun,
                              uniqueId,
                              username,
                              email,
                              mobile,
                              address,
                              instagram,
                              hasViewedNotification,
                              currencyShortCode,
                              countryCode,
                              country,
                              timeZone,
                              status,
                              anyoneCanFindMe,
                              deviceInfo{
                                _id,
                                token,
                                geoLocation,
                                lastSeen,
                                deviceId
                              }
                              business{
                                businessName,
                                availableBalance,
                                supportEmail,
                                merchantStatus,
                                isBusinessVerified,
                                ratings{
                                  average
                                }
                              },
                              shopper{
                   
                                availableBalance,
                                spendLimit,
                                availableSavings
                                boost{
                                  available
                                  nextBoost
                                  extra
                                }
                                spendLimitRange{
                                  minimum
                                  maximum
                                }
                              } 
                          }
                        }
                    }`,
      variables: {
        email,
        newPassword,
        confirmPassword,
        securityCode: code,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'at reset passw');
      if (res?.data?.ResetPassword?.success) {
        resData = res.data.ResetPassword;
      }
      msg = res.data.ResetPassword;
    });
  return msg;
};

export const VerifyEmail = async (email, securityCode, any, computerInfo) => {
  let msg;
  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
            mutation ($securityCode: String!, $email: String!, $any: Boolean, $ipAddress: String , $deviceId: String){
                VerifyEmail(securityCode: $securityCode, email: $email, any:$any, ipAddress: $ipAddress, deviceId: $deviceId){
                    code,
                    success,
                    message,
                    token
                }
            }`,
      variables: {
        securityCode,
        email,
        any,
        ipAddress: computerInfo?.ip,
        deviceId: computerInfo?.platform,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let resData;
      if (res?.data?.VerifyEmail) {
        resData = res.data.VerifyEmail;
        msg = resData;
      }
    });
  return msg;
};

export const VerifyPhone = async (phone, country, phoneVerificationCode) => {
  let msg;
  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
                    mutation ($country: String!, $phone: String!, $phoneVerificationCode: String!){
                        VerifyPhone(country: $country,  phoneVerificationCode: $phoneVerificationCode, phone: $phone){
                            code,
                            success,
                            message,
                            user{
                              _id,
                              firstname,
                              lastname,
                              avatar,
                              pronoun,
                              uniqueId,
                              username,
                              email,
                              mobile,
                              address,
                              instagram,
                              hasViewedNotification,
                              currencyShortCode,
                              countryCode,
                              country,
                              timeZone,
                              status,
                              role,
                              anyoneCanFindMe,
                              deviceInfo{
                                _id,
                                token,
                                geoLocation,
                                lastSeen,
                                deviceId
                              },
                              business{
                                businessName,
                                availableBalance,
                                supportEmail,
                                merchantStatus,
                                isBusinessVerified,
                                ratings{
                                  average
                                }
                              },
                              shopper {
                           
                                availableBalance,
                                spendLimit,
                                availableSavings
                                boost{
                                  available
                                  nextBoost
                                  extra
                                }
                                spendLimitRange{
                                  minimum
                                  maximum
                                }
                              } 
                          }
                        }
                    }`,
      variables: {
        phone,
        country,
        phoneVerificationCode,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      let resData;
      if (res.data) {
        resData = res.data.VerifyPhone;
      }
      msg = resData;
    });

  return msg;
};

export const Login = async (props) => {
  let msg;
  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
              mutation ($email: String!, $password: String!, $isBusiness:Boolean!, $saveToken: Boolean, $recover: Boolean, $deviceId: String, $ipAddress: String, $latitude: String, $longitude: String, $platform: String){
                  Login(email: $email, password: $password, isBusiness: $isBusiness, saveToken: $saveToken, recover: $recover, deviceId: $deviceId, ipAddress: $ipAddress, latitude: $latitude, longitude: $longitude, platform: $platform){
                      code,
                      success,
                      message,
                      token,
                      isProcessingVerification,
                      user{
                          _id,
                          firstname,
                          lastname,
                          avatar,
                          pronoun,
                          uniqueId,
                          username,
                          email,
                          mobile,
                          address,
                          instagram,
                          hasViewedNotification,
                          currencyShortCode,
                          countryCode,
                          country,
                          timeZone,
                          status,
                          role,
                          whatsApp,
                          instagram,
                          tiktok,
                          bio,
                          latlong,
                          networkMsg,
                          isPhoneVerified,
                          anyoneCanFindMe,
                          referralPhoto,
                          loginTimes,
                          deviceInfo{
                            _id,
                            token,
                            geoLocation,
                            lastSeen,
                            deviceId
                          },
                          shopper{
                        
                            availableBalance,
                            spendLimit,
                            isVirtualCard,
                            sweepstake,
                            sweepstakeAmt,
                            sweepstakeCurr,
                            availableSavings,
                            boost{
                              available
                              nextBoost
                              extra
                            }
                            spendLimitRange{
                              minimum
                              maximum
                            }
                            spendLimitUpdate {
                              lastUpdate
                              nextUpdate          
                            }
                          } 
                      }
                  }
              }`,
      variables: {
        ...props,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('Login', res);
      if (res) {
        msg = res?.data?.Login;
      }
    });
  return msg;
};

export const UpdateProfile = async (props) => {
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
        mutation ($profileData: UserProfileUpdateInput){
          ProfileUpdate(profileData: $profileData){
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
              uniqueId,
              username,
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
              anyoneCanFindMe,
              latlong,
              networkMsg,
              isPhoneVerified,
              referralPhoto
              deviceInfo{
                _id,
                token,
                geoLocation,
                lastSeen,
                deviceId,
              },
              status
              business{
                businessName,
                availableBalance,
                supportEmail,
                merchantStatus,
                ratings{
                  average
                }
              },
              shopper{
           
                availableBalance,
                spendLimit,
                availableSavings
                boost{
                  available
                  nextBoost
                  extra
                }
                spendLimitRange{
                  minimum
                  maximum
                }
              } 
            }
          }
        }`,
      variables: {
        profileData: {
          ...props,
        },
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let resData;

      console.log(res, 'hereeeee');
      if (res.data) {
        resData = res.data.ProfileUpdate;
      }
      console.log(res.data.ProfileUpdate, 'resData ');
      msg = resData;
    });
  return msg;
};

export const FetchClique = async () => {
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
              FetchClique{
                    success,      
                    message,
                    code,
                    user,
                    cliqueReceived{
                      firstname
                      lastname
                      _id
                      avatar
                      username
                      accountReputation
                    },
                    cliqueSent{
                      firstname
                      lastname
                      _id
                      avatar
                      username
                      accountReputation
                    },
                    cliqueActive{
                      firstname
                      lastname
                      _id
                      avatar
                      username
                      accountReputation
                    },
                }
            }`,
      variables: {},
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'fetchclique');
      if (res.data.FetchClique) {
        msg = res.data.FetchClique;
      }
    });
  return msg;
};

export const VerifyCAT = async (CAT) => {
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
              mutation($token: ID){
                VerifyCAT(token: $token){
                      success,      
                      message,
                      code,
                  }
              }`,
      variables: { token: CAT },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'VerifCAT');
      if (res.data.VerifyCAT) {
        msg = res.data.VerifyCAT;
      }
    });
  return msg;
};

export const CliqueAccept = async (cliqueToken) => {
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
              mutation($token:String! ){
               CliqueAccept(token:$token){
                      success,      
                      message,
                      code,
                  }
              }`,
      variables: { token: cliqueToken },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'CliqueAccept');
      if (res.data.CliqueAccept) {
        msg = res.data.CliqueAccept;
      }
    });
  return msg;
};

export const ShopperExist = async (email) => {
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
            query($email: String!){
              ShopperExist(email: $email){
                    success,      
                    message,
                    code
                }
            }`,
      variables: {
        email,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'shopper exist');
      if (res.data) {
        msg = res.data.ShopperExist;
      } else {
      }
      msg;
    });

  return msg;
};

export const MerchantExist = async (email) => {
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
            query($email: String!){
             MerchantExist(email: $email){
                    success,      
                    message,
                    code
                }
            }`,
      variables: {
        email,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'Merchant exist');
      if (res.data) {
        msg = res.data.MerchantExist;
      } else {
      }
      msg;
    });

  return msg;
};
