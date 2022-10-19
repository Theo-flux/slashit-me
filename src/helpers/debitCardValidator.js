const debitCardValidator = (cardNum) => {
  const regex = new RegExp('^[0-9]{13,19}$');
  if (!regex.test(parseInt(cardNum))) {
    return false;
  }

  return luhnCheck(cardNum);
};

// using Hans Peter Luhn's algorithm
const luhnCheck = (val) => {
  let checksum = 0; // running checksum total
  let j = 1; // takes value of 1 or 2

  // Process each digit one by one starting from the last
  for (let i = val.length - 1; i >= 0; i--) {
    let calc = 0;
    // Extract the next digit and multiply by 1 or 2 on alternative digits.
    calc = Number(val.charAt(i)) * j;

    // If the result is in two digits add 1 to the checksum total
    if (calc > 9) {
      checksum = checksum + 1;
      calc = calc - 10;
    }

    // Add the units element to the checksum total
    checksum = checksum + calc;

    // Switch the value of j
    if (j == 1) {
      j = 2;
    } else {
      j = 1;
    }
  }

  //Check if it is divisible by 10 or not.
  return checksum % 10 == 0;
};

export const checkCreditCard = (cardnumber) => {
  //Error messages
  const ccErrors = [
    'Unknown card type',
    'No card number provided',
    'Credit card number is in invalid format',
    'Credit card number is invalid',
    'Credit card number has an inappropriate number of digits',
    'Credit card number has an inappropriate number of digits',
  ];

  //Response format
  const response = (success, message = null, type = null) => ({
    message,
    success,
    type,
  });

  // Defining cards to support.
  const cards = [];
  cards[0] = {
    name: 'Visa',
    length: '13,16',
    prefixes: '4',
    checkdigit: true,
  };
  cards[1] = {
    name: 'MasterCard',
    length: '16',
    prefixes: '51,52,53,54,55',
    checkdigit: true,
  };

  // Ensuring the user provided a credit card number
  if (cardnumber.length == 0) {
    return response(false, ccErrors[1]);
  }

  // remove any spaces from the credit card number
  cardnumber = cardnumber.replace(/\s/g, '');

  // Validate the format of the credit card
  // luhn's algorithm
  if (!debitCardValidator(cardnumber)) {
    return response(false, ccErrors[2]);
  }

  // card-specific checks.
  let lengthValid = false;
  let prefixValid = false;
  let cardCompany = '';

  // Check if card belongs to any organization
  for (let i = 0; i < cards.length; i++) {
    const prefix = cards[i].prefixes.split(',');

    for (let j = 0; j < prefix.length; j++) {
      const exp = new RegExp('^' + prefix[j]);
      if (exp.test(cardnumber)) {
        prefixValid = true;
      }
    }

    if (prefixValid) {
      const lengths = cards[i].length.split(',');

      for (let j = 0; j < lengths.length; j++) {
        if (cardnumber.length == lengths[j]) {
          lengthValid = true;
        }
      }
    }

    if (lengthValid && prefixValid) {
      cardCompany = cards[i].name;
      return response(true, null, cardCompany);
    }
  }

  if (!prefixValid) {
    return response(false, ccErrors[3]);
  }

  if (!lengthValid) {
    return response(false, ccErrors[4]);
  }

  return response(true, null, cardCompany);
};
