export const paymentDetailsValidator = (paymentDetails) => {
  //Response format
  const amountRegex = new RegExp('^[0-9]{1,}$');
  const response = {};

  if (!paymentDetails?.amount) {
    response.amount = 'Pls enter an amount';
  } else if (!amountRegex.test(paymentDetails?.amount)) {
    response.amount = 'Amount must be in figures';
  } else {
    response.amount = '';
  }

  if (!paymentDetails?.mail) {
    response.mail = 'Pls provide an email';
  } else {
    response.mail = '';
  }

  return response;
};

export const recipientValidator = (recipient) => {
  //Response format
  const response = {};

  if (!recipient?.recipientMail) {
    response.recipientMail = 'Pls provide an email';
  } else {
    response.recipientMail = '';
  }

  return response;
};
