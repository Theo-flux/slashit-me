export const plan = [
  {
    id: '1',
    planType: 'Free',
    bg_color: `var(--violet)`,
    price: '0',
    button: 'Get started for free',
    benefits: [
      {
        isAvailable: true,
        item: `Pay in 4 only`,
      },
      {
        isAvailable: true,
        item: `3.5% per transaction`,
      },
      {
        isAvailable: true,
        item: `Instant payout to wallet`,
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
      `Your customers can pay in 4 installments over 6 weeks.`,
      `You'll be charged 3.5% whenever your customers pay in installments with their Slashit account.`,
      `Slashit settles instantly to your Slashit balance when your customer completes an order in installments. No delayed or next day settlements.`,
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
        item: `Pay in 4 & Pay in 3`,
      },
      {
        isAvailable: true,
        item: `3.5% per transaction`,
      },
      {
        isAvailable: true,
        item: `Instant payout to bank`,
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
      `Your customers can pay in 4 installments over 6 weeks or in 3 installments over 3 months.`,
      `You'll be charged 3.5% whenever your customers pay in installments with their Slashit account.`,
      `Slashit settles instantly to your bank account when your customer completes an order provided that you’ve added a bank account to your Slashit account. No delayed or next day settlements.`,
      `Transfer to any bank account as many times as you want without paying any extra fee for one month.`,
      `The 3.5% fee per transaction is waived when your customer chooses to make their repayments from their Spending balance instead of their debit/credit card. That means zero transaction fee.`,
    ],
  },
];
