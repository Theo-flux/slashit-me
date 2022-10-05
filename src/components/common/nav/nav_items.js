export const navItems = [
  {
    id: '1',
    item: 'Shopper',
    icon: `ri-arrow-down-s-line`,
    children: [
      {
        id: '1',
        item: 'Clique',
        link: '/clique',
      },

      {
        id: '2',
        item: 'Card',
        link: '/card',
      },
    ],
  },

  {
    id: '2',
    item: 'Merchant',
    icon: `ri-arrow-down-s-line`,
    children: [
      {
        id: '1',
        item: 'Get paid',
        link: '/getpaid',
      },

      {
        id: '2',
        item: 'Pricing',
        link: '/pricing',
      },
    ],
  },

  {
    id: '3',
    item: 'Company',
    icon: `ri-arrow-down-s-line`,
    children: [
      {
        id: '1',
        item: 'About us',
        link: '/about',
      },

      {
        id: '2',
        item: 'Blog',
        link: '/blog',
      },
    ],
  },
];

export const mobileNavItems = [
  {
    id: '1',
    item: 'Money',
    children: [
      {
        id: '1',
        icon: '/images/pay.svg',
        title: 'Pay anyone',
        text: 'Pay any business or individual in 4 installments',
        link: '/',
      },

      {
        id: '2',
        icon: '/images/get-paid.svg',
        title: 'Get paid',
        text: 'Get paid by anyone in 4 installments',
        link: '/',
      },
    ],
  },

  {
    id: '2',
    item: 'Shopper',
    children: [
      {
        id: '1',
        icon: '/images/clique.svg',
        title: 'Clique',
        text: 'Get up to ₦150k without BVN or any bank info.',
        link: '/clique',
      },

      {
        id: '2',
        icon: '/images/card.svg',
        title: 'Virtual Card',
        text: 'Shop anywhere in 4 installments',
        link: '/card',
      },
    ],
  },

  {
    id: '3',
    item: 'Merchant',
    children: [
      {
        id: '1',
        icon: '/images/accept-installment.svg',
        title: 'Accept installment payment',
        text: 'Let your customers pay in 4 or 3 installments',
        link: '/',
      },

      {
        id: '2',
        icon: '/images/pricing.svg',
        title: 'Pricing',
        text: 'See what you will be charged',
        link: '/',
      },
    ],
  },
];
