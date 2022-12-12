export const cardItems = [
  {
    id: 'card_number',
    name: 'cardNumber',
    type: 'text',
    src: '/images/card_number.svg',
    placeholder: '1234 1234 1234 1234',
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


// MasterCard PIN authentication	5531886652142950	564	3310	09/32	12345
// Mastercard PIN authentication 2	5399838383838381	470	3310	10/31	12345
// MasterCard 3DS authentication	5438898014560229	564	3310	10/31	12345
// Visa Card 3DS authentication	4187427415564246	828	3310	09/32	12345
// Visa Card 3DS authentication 2	4242424242424242	812	3310	01/31	12345
// Visa Card 3DS authentication 3	4751763236699647	-	-	09/35	-
// Verve Card Noauth	5061460410120223210	780	3310	12/31	12345
// Verve Card PIN authentication 2	5061460166976054667	-	3310	10/22	-
// Address Verification (AVS) Card	4556052704172643	899	3310	09/32	12345
// Pre-authorization Test Card	5377283645077450	789	3310	09/31	