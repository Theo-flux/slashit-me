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
            host: 'https://www.dvlena.com',
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
    result = await fetch(
      'https://tntlslooozz.live.verygoodproxy.com/card/charge',
      {
        method: 'POST',
        headers: {
          host: 'https://www.dvlena.com',
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
  } catch (e) {
    console.error(e);
  }
  return await result.text();
};

export const FetchPayments = async ({ offset, limit, filter }) => {
  //console.log(filter);
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
          query($limit: Int, $offset: Int, $mode: TransactionMode!,  $filter: DateFilter){
              FetchTransactions(limit: $limit, offset: $offset, mode: $mode, filter: $filter){
              code,
              count,
              message,
              hasNext,
              success, 
              result{
                  _id,
                  transactionId,
                  type,
                  reference,
                  amount,
                  status,
                  paymentDate,
                  currency,
                  accountNumber,
                  bankName,
                  installment,
                  installmentName,
                  settlementId,
                  isCharged,
                  isSettled,
                  isRefunded,
                  createdAt,
                  isTopUp,
                  isVirtualCard,
                  misc,
                  business{
                    user{
                      avater,
                    }
                    businessName
                  }
                  shopper {
                    username,
                    avater
                  }
                  order {
                      _id,
                      orderId,
                      paymentOption,
                      orderEmail,
                      businessName,
                      customerEmail,
                      currency,
                      amount,
                      shipmentStatus
                  }
               }
              }
          }`,
      variables: {
        limit: limit ? limit : 10,
        offset: offset ? offset : 0,
        mode: 'LIVE',
        filter: filter || 'Alltime',
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('fetch transac', res);

      if (res.data.FetchTransactions) {
        msg = res.data.FetchTransactions;
      }
    });

  return msg;
};

export const FetchSettlements = async ({ offset, limit }) => {
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
          query($limit: Int, $offset: Int, $filter: DateFilter){
              FetchSettlements(limit: $limit, offset: $offset, mode: $mode, filter: $filter){
              code,
              count,
              message,
              hasNext,
              success, 
              result{
                  _id,
                  transactionId,
                  type,
                  reference,
                  amount,
                  status,
                  paymentDate,
                  currency,
                  accountNumber,
                  bankName,
                  installment,
                  installmentName,
                  settlementId,
                  isCharged,
                  isSettled,
                  isRefunded,
                  createdAt,
                  isTopUp,
                  isVirtualCard,
                  misc,
                  business{
                    user{
                      avater,
                    }
                    businessName
                  }
                  shopper {
                    username,
                    avater
                  }
                  order {
                      _id,
                      orderId,
                      paymentOption,
                      orderEmail,
                      businessName,
                      customerEmail,
                      currency,
                      amount,
                      shipmentStatus
                  }
               }
              }
          }`,
      variables: {
        limit: limit ? limit : 10,
        offset: offset ? offset : 0,
        filter: filter || 'Alltime',
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('fetch settlements', res);

      if (res.data.FetchSettlements) {
        msg = res.data.FetchSettlements;
      }
    });

  return msg;
};

export const PayAnyone = async (currency, amount, recipient, source) => {
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
        mutation($currency: String! , $amount: Float, $recipient: String!, $source: paymentSource ){
           PayAnyone(currency: $currency, amount: $amount , recipient :$recipient, source: $source){
              code,
              message,
              success,          
              }
          }`,
      variables: {
        currency,
        amount,
        recipient,
        source,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res) {
        console.log(res.data);
        if (res.data.PayAnyone) {
          msg = res.data.PayAnyone;
        }
      }
    });

  return msg;
};

export const CreatePaymentLink = async (currency, amount, sender, note) => {
  let msg;

  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation($currency: String! , $amount: Float, $sender: String!, $note: String){
          NewPaymentLink(currency: $currency, amount: $amount , sender:$sender, note: $note){
              code,
              message,
              success,  
              result        
              }
          }`,
      variables: {
        currency,
        amount,
        sender,
        note,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res) {
        console.log(res.data);
        if (res.data.NewPaymentLink) {
          msg = res.data.NewPaymentLink;
        }
      }
    });

  return msg;
};

export const CreateOrder = async (orderInput, method, link) => {
  let msg;

  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        mutation($orderInput: orderInput, $method: orderMethod!, $link: ID,){
        CreateOrder(orderInput: $orderInput, method: $method , link: $link){
              code,
              message,
              success,  
              paymentMethods,
              order{
                _id,
                orderId,
                status,
                customerEmail,
                businessAvatar,
                businessName,
                businessEmail,
                createdAt,
                currency,
                amount,
                shippingCost,
                myPackageCourier,
                misc,
                note,
                attachment,
                isBillPayLater,
                isLink,
                isPayAnyone,
                isCreatedFromAPI,
                shippingAddress{
                  city,
                  country,
                  state,
                  postalCode,
                  street
                },
                products{
                  _id,
                  title,
                  description,
                  attachment,
                  price,
                  quantity,
                  currency
                }
                orderEmail,     
            }      
           }
          }`,
      variables: {
        orderInput,
        method,
        link,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res) {
        console.log(res.data);
        if (res.data.CreateOrder) {
          msg = res.data.CreateOrder;
        }
      }
    });

  return msg;
};

export const SharePaymentLink = async (email, link) => {
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
        mutation($email: String!, $link:ID!){
          SharePaymentLink(email: $email, link: $link){
              code,
              message,
              success,          
              }
          }`,
      variables: {
        email,
        link,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res) {
        console.log(res.data);
        if (res.data.SharePaymentLink) {
          msg = res.data.SharePaymentLink;
        }
      }
    });

  return msg;
};

export const FetchOrders = async ({ offset, limit, filter }) => {
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
            query($limit: Int, $offset: Int, $filter: DateFilter){
                FetchOrders(limit: $limit, offset: $offset, filter: $filter){
                    code,
                    count,
                    message,
                    hasNext,
                    result{
                        _id,
                        orderId,
                        status,
                        customerEmail,
                        businessAvatar,
                        businessName,
                        createdAt,
                        currency,
                        amount,
                        shippingCost,
                        myPackageCourier,
                        shipmentStatus,
                        misc,
                        isBillPayLater,
                        shippingAddress{
                          name,
                          city,
                          country,
                          state,
                          postalCode,
                          street
                        },
                        orderEmail,
                        transactions{
                            transactionId,
                            reference,
                            paymentDate,
                            amount,            
                        },
                        products{
                          _id,
                          title,
                          description,
                          attachment,
                          price,
                          quantity,
                          currency
                        }
                    }
                }
            }`,
      variables: {
        offset: offset ? offset : 0,
        limit: limit ? limit : 10,
        filter: filter || 'Alltime',
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('res 11', res);
      if (res.data.FetchOrders) {
        msg = res.data.FetchOrders;
      }
    });

  return msg;
};

export const FetchOrderById = async (orderId) => {
  let msg;
  /* Retrieve Token From Local Storage */
  let token;
  let auth = localStorage.getItem('userAuth');
  if (auth) {
    auth = JSON.parse(auth);
    token = auth.token;
  }
  console.log('orderId', orderId);

  await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
            query ($orderId: String!){
              FetchOrderById(orderId: $orderId){
                  code,
                  success,
                  message, 
                  order{
                    _id,
                    orderId,
                    status,
                    customerEmail,
                    businessAvatar,
                    businessName,
                    createdAt,
                    currency,
                    amount,
                    shippingCost,
                    myPackageCourier,
                    misc,
                    isBillPayLater,
                    shippingAddress{
                      city,
                      country,
                      state,
                      postalCode,
                      street
                    },
                    orderEmail,
                    transactions{
                        transactionId,
                        reference,
                        paymentDate,
                        amount,            
                    },
                    products{
                      _id,
                      title,
                      description,
                      attachment,
                      price,
                      quantity,
                      currency
                    }
                }
              }
          }`,
      variables: {
        orderId: orderId,
      },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('fetch order by id', res.data.FetchOrderById.order);
      if (res.data.FetchOrderById) {
        msg = res.data.FetchOrderById;
      }
    });
  return msg;
};

export const FetchOrderCard = async (order) => {
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
            query($order: ID!){
              FetchOrderCard(order: $order){
                    code,
                    success,
                    message,
                    result
                }
            }`,
      variables: { order },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      if (res.data.FetchOrderCard) {
        msg = res.data.FetchOrderCard;
      }
    });

  return msg;
};

export const FetchCards = async (showFew, isVirtualCard) => {
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
            query($showFew: Boolean, $isVirtualCard: Boolean) {
              FetchCard(showFew: $showFew, isVirtualCard: $isVirtualCard) {
                code,
                success,
                message,
                count,
                result{
                  _id,
                  cardLogo,
                  ordercard,
                  last_4digits,
                  preferred,
                  first_6digits,
                  type,
                  isVirtualCard,
                  expiry,
                  cvv,
                  cardPan,
                  name,
                  status,
                  vCardId,
                  createdAt,
                  billing {
                    address,
                    city,
                    state,
                    zipcode,
                    country
                  },
                }
              }
            }`,
      variables: { showFew, isVirtualCard },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log('fetch cards', res.data.FetchCard.result);
      if (res.data.FetchCard) {
        msg = res.data.FetchCard;
      }
    });
  return msg;
};

export const CheckAuthorisationAddCard = async (encrypted, user) => {
  let result;
  console.log(encrypted, 'at check card auth');
  try {
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
    result = await result.text();
    console.log('msg', result);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const GetAuthorisationAddCard = async (encrypted, user) => {
  let result;
  try {
    result = await fetch(
      'https://tntlslooozz.live.verygoodproxy.com/card/charge',
      {
        method: 'POST',
        headers: {
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
    result = await result.text();
    console.log('msg', result);
    return result;
  } catch (e) {
    console.error(e);
  }
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
      console.log('res Add Card', res);
      let resData;
      if (res.data.AddCard) {
        resData = res.data.AddCard;
      }
      msg = resData;
    });

  return msg;
};

export const FetchVirtualAccount = async (amount) => {
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
            query($amount: Float!) {
              FetchVirtualAccountNoShopper(amount:$amount){
                    success,      
                    message,
                    code,
                    result
                }
            }`,
      variables: { amount: amount },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'Fetchvirtualaccount');
      if (res.data.FetchVirtualAccountNoShopper) {
        msg = res.data.FetchVirtualAccountNoShopper;
      }
    });
  return msg;
};

export const UpdateShippingAddress = async (shippingInput, order) => {
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
            mutation($shippingInput: ShippingAddressInput, $order: ID) {
            UpdateShippingAddress(shippingInput: $shippingInput , order: $order){
                    success,      
                    message,
                    code,
                    result
                }
            }`,
      variables: { shippingInput, order },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'UpdateShippingAddress');
      if (res.data.UpdateShippingAddress) {
        msg = res.data.UpdateShippingAddress;
      }
    });
  return msg;
};

export const PayNow = async (props) => {
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
            mutation($order: ID!, $paymentOption: PaymentOption!, $source: paymentSource!, $card: ID) {
            PayNow(order: $order, paymentOption: $paymentOption, source: $source,  card: $card){
                    success,      
                    message,
                    code,
                }
            }`,
      variables: { ...props },
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, 'PayNow');
      if (res.data.PayNow) {
        msg = res.data.PayNow;
      }
    });
  return msg;
};
