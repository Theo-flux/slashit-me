export const cardItems = [
  {
    id: 'card_number',
    name: 'cardNumber',
    type: 'text',
    src: '/images/card_number.svg',
    placeholder: 'xxxx xxxx xxxx xxxx',
    legend: 'Card number',
    maxlength: 19,
  },

  {
    id: 'card_expiry',
    name: 'cardExpiry',
    type: 'text',
    src: '/images/card_expiry.svg',
    placeholder: 'MM/YY',
    legend: 'Expiry',
    maxlength: 5,
  },

  {
    id: 'card_cvv',
    name: 'cardCvv',
    type: 'text',
    src: '/images/card_cvv.svg',
    placeholder: '123',
    legend: 'CVV',
    maxlength: 3,
  },
];

export const personal_item = [
  {
    type: 'text',
    legend: 'First Name',
    id: 'first_name',
    name: 'firstname',
  },

  {
    type: 'text',
    legend: 'Last Name',
    id: 'last_name',
    name: 'lastname',
  },
];
