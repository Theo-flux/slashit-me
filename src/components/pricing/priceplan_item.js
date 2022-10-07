export const plan = [
  {
    id: '1',
    planType: 'Free',
    bg_color: `var(--gray)`,
    price: '0',
    button: 'Get started for free',
    benefits: [
      {
        isAvailable: true,
        item: `Pay in 4 only <sup>1</sup>`,
      },
      {
        isAvailable: true,
        item: `3.5% per transaction <sup>2</sup>`,
      },
      {
        isAvailable: true,
        item: `Instant payout to wallet <sup>3</sup>`,
      },

      {
        isAvailable: false,
        item: `No free transfers`,
      },

      {
        isAvailable: false,
        item: `Not Eligible for zero transaction fees`,
      },
    ],

    info: [
      `<sup>1</sup> Your customers can pay in 4 installments over 6 weeks.`,
      `<sup>2</sup> You'll be charged 3.5% whenever your customers pay in installments with their Slashit account.`,
      `<sup>3<s/up>  Slashit settles instantly to your Slashit balance when your customer completes an order in installments. No delayed or next day settlements.`,
    ],
  },

  {
    id: '2',
    planType: 'Thrive',
    bg_color: `var(--violet)`,
    price: '17,000/month',
    button: 'Pay NGN 17,000/month',
    benefits: [
      {
        isAvailable: true,
        item: `Pay in 4 & Pay in 3 <sup>1</sup>`,
      },
      {
        isAvailable: true,
        item: `3.5% per transaction <sup>2</sup>`,
      },
      {
        isAvailable: true,
        item: `Instant payout to bank <sup>3</sup>`,
      },

      {
        isAvailable: true,
        item: `Unlimited free transfers per month`,
      },

      {
        isAvailable: true,
        item: `Eligible for zero transaction fees`,
      },
    ],

    info: [
      `<sup>1</sup> Your customers can pay in 4 installments over 6 weeks or in 3 installments over 3 months.`,
      `<sup>2</sup>  You'll be charged 3.5% whenever your customers pay in installments with their Slashit account.`,
      `<sup>3</sup>  3 Slashit settles instantly to your bank account when your customer completes an order provided that you’ve added a bank account to your Slashit account. No delayed or next day settlements.`,
      `<sup>4</sup> Transfer to any bank account as many times as you want without paying any extra fee for one month.`,
      `<sup>5</sup> The 3.5% fee per transaction is waived when your customer chooses to make their repayments from their Spending balance instead of their debit/credit card. That means zero transaction fee.`,
    ],
  },
];
